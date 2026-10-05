/* Calendar exports use the meeting's timezone, never the visitor's timezone. */
const WacoCalendar = (() => {
  const zone = 'America/Chicago';
  const minutes = (hour, minute, meridiem) => {
    hour = Number(hour); minute = Number(minute);
    if (hour < 1 || hour > 12 || minute > 59) return null;
    return (hour % 12 + (meridiem.toUpperCase() === 'PM' ? 12 : 0)) * 60 + minute;
  };
  function sessions(time) {
    const parts = String(time || 'TBD').split('/');
    return parts.map(part => {
      const matches = [...part.matchAll(/\b(\d{1,2}):(\d{2})\s*(AM|PM)\b/gi)];
      if (!matches.length || matches.length > 2) return {label:part.trim(), start:null, end:null};
      const start = minutes(...matches[0].slice(1));
      let end = matches[1] ? minutes(...matches[1].slice(1)) : start === null ? null : start + 60;
      if (start === null || end === null) return {label:part.trim(), start:null, end:null};
      if (end <= start) end += 1440;
      return {label:part.trim(), start, end, estimated:!matches[1]};
    });
  }
  function localToUTC(date, minute) {
    const [year, month, day] = date.slice(0,10).split('-').map(Number);
    const desired = Date.UTC(year, month-1, day, 0, minute);
    let guess = desired;
    const formatter = new Intl.DateTimeFormat('en-US', {timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'});
    for (let i=0;i<3;i++) {
      const parts = Object.fromEntries(formatter.formatToParts(new Date(guess)).map(p=>[p.type,p.value]));
      const represented = Date.UTC(+parts.year,+parts.month-1,+parts.day,+parts.hour,+parts.minute,+parts.second);
      guess += desired-represented;
    }
    return new Date(guess);
  }
  const stamp = date => date.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');
  const nextDay = date => new Date(Date.parse(date.slice(0,10)+'T00:00:00Z')+86400000).toISOString().slice(0,10);
  function span(event, session) {
    const date = String(event.date).slice(0,10);
    if (session.start === null) return {start:date,end:nextDay(date),allDay:true};
    return {start:localToUTC(date,session.start).toISOString(),end:localToUTC(date,session.end).toISOString(),allDay:false};
  }
  const escapeICS = text => String(text || '').replace(/\\/g,'\\\\').replace(/\r?\n/g,'\\n').replace(/;/g,'\\;').replace(/,/g,'\\,');
  function fold(line) {
    // RFC 5545 lines are folded by UTF-8 byte length, without splitting a character.
    let result='', segment='', length=0;
    for (const char of line) {
      const size = new TextEncoder().encode(char).length;
      if (length+size>75) {result+=segment+'\r\n';segment=' ';length=1;}
      segment+=char;length+=size;
    }
    return result+segment;
  }
  function ics(event, session) {
    const range=span(event,session);
    const start=range.allDay ? `DTSTART;VALUE=DATE:${range.start.replace(/-/g,'')}` : `DTSTART:${stamp(new Date(range.start))}`;
    const end=range.allDay ? `DTEND;VALUE=DATE:${range.end.replace(/-/g,'')}` : `DTEND:${stamp(new Date(range.end))}`;
    // Stable UID across repeated downloads of the same event/session.
    const uid=Array.from(`${event.date}|${event.title}|${event.location}|${session.label}`).reduce((n,c)=>Math.imul(n^c.charCodeAt(0),16777619),2166136261)>>>0;
    const detail=[event.notes, `Meeting time: ${event.time} (${zone}).`, session.estimated ? 'End time estimated at one hour; confirm with the organizer.' : '', range.allDay ? 'Time not confirmed. Saved as an all-day reminder; check the agenda.' : '', event.agenda_url, event.info_url].filter(Boolean).join('\n');
    return ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Waco Data Center Community Action//Meetings//EN','CALSCALE:GREGORIAN','BEGIN:VEVENT',`UID:${uid}@wacodatacenter.com`,`DTSTAMP:${stamp(new Date())}`,start,end,`SUMMARY:${escapeICS(event.title)}`,`LOCATION:${escapeICS(event.location)}`,`DESCRIPTION:${escapeICS(detail)}`,'END:VEVENT','END:VCALENDAR'].map(fold).join('\r\n')+'\r\n';
  }
  function url(service,event,session) {
    const range=span(event,session);
    const description=[event.notes,`Meeting time: ${event.time} (${zone}).`,session.estimated?'End time estimated at one hour.':'',range.allDay?'Time not confirmed; saved as an all-day reminder.':'',event.agenda_url,event.info_url].filter(Boolean).join('\n');
    if (service==='google') {
      const url=new URL('https://calendar.google.com/calendar/render');
      const compact=value=>value.replace(/[-:]/g,'').replace(/\.\d{3}/,'');
      url.search=new URLSearchParams({action:'TEMPLATE',text:event.title,dates:`${compact(range.start)}/${compact(range.end)}`,ctz:zone,location:event.location||'',details:description});
      return url.toString();
    }
    const url=new URL(service==='outlook-work'?'https://outlook.office.com/calendar/0/deeplink/compose':'https://outlook.live.com/calendar/0/deeplink/compose');
    url.search=new URLSearchParams({subject:event.title,startdt:range.start,enddt:range.end,allday:String(range.allDay),location:event.location||'',body:description});
    return url.toString();
  }
  return {sessions,localToUTC,span,ics,url};
})();
if (typeof module !== 'undefined') module.exports = WacoCalendar;

if (typeof document !== 'undefined') (() => {
  const events = JSON.parse(document.getElementById('calendar-events').textContent);
  let selectedEvent;
  const sessionSelect=document.getElementById('calendar-session');
  document.addEventListener('click', async event => {
    const filter=event.target.closest('[data-event-filter]');
    if (filter) {
      const category=filter.dataset.eventFilter;
      document.querySelectorAll('[data-event-filter]').forEach(button=>{button.classList.toggle('is-active',button===filter);button.setAttribute('aria-pressed',String(button===filter));});
      let count=0;
      document.querySelectorAll('.event-row').forEach(row=>{
        row.hidden=category==='Priority'?row.dataset.priority!=='true':category!=='All'&&row.dataset.category!==category;
        if (!row.hidden) count++;
      });
      document.querySelectorAll('[data-month]').forEach(month=>month.hidden=![...month.querySelectorAll('.event-row')].some(row=>!row.hidden));
      document.querySelector('.calendar-status').textContent=count?`Showing ${count} ${category==='All'?'upcoming':category} events.`:'Nothing scheduled in this category.';
    }
    const calendar=event.target.closest('[data-calendar-open]');
    if (calendar) {
      selectedEvent=JSON.parse(calendar.closest('[data-event]').dataset.event);
      document.getElementById('calendarTitle').textContent=selectedEvent.title;
      document.getElementById('calendarMeta').textContent=`${selectedEvent.date} · ${selectedEvent.location}`;
      sessionSelect.replaceChildren(...WacoCalendar.sessions(selectedEvent.time).map((session,i)=>new Option(session.label,String(i))));
      updateCalendarHelp();
      window.openSiteDialog(document.getElementById('calendarDialog'),calendar);
    }
    const service=event.target.closest('[data-calendar-service]');
    if (service && selectedEvent) {
      const session=WacoCalendar.sessions(selectedEvent.time)[Number(sessionSelect.value)];
      if (service.dataset.calendarService==='ics') {
        const blob=new Blob([WacoCalendar.ics(selectedEvent,session)],{type:'text/calendar;charset=utf-8'});
        const url=URL.createObjectURL(blob);
        const link=document.createElement('a');link.href=url;link.download=selectedEvent.title.replace(/[^a-z0-9]/gi,'_').toLowerCase()+'.ics';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
      } else window.open(WacoCalendar.url(service.dataset.calendarService,selectedEvent,session),'_blank','noopener,noreferrer');
    }
    const comment=event.target.closest('[data-comment]');
    if (comment) {
      const meeting=JSON.parse(comment.closest('[data-event]').dataset.event);
      document.getElementById('commentPromptTitle').textContent=meeting.title;
      document.getElementById('commentPromptText').value=`Help a local resident prepare a factual, respectful public comment for ${meeting.title}.\n\nMeeting: ${meeting.date} at ${meeting.time} (America/Chicago)\nLocation: ${meeting.location}\nBody: ${meeting.category}\nAgenda: ${meeting.agenda_url || 'No agenda posted yet. Verify with the organizer.'}\nNotes: ${meeting.notes || 'None provided.'}\n\nWe oppose the siting of the L2D2 / Infrakey hyperscale data center near Elm Mott, Ross and Lacy Lakeview, not data centers in general. The site's research is at https://wacodatacenter.com/posts/ and source materials and templates are at https://wacodatacenter.com/resources/.\n\nPrepare a comment within the body's published time limit, starting with the speaker's name and relationship to the area. Raise two or three concerns relevant to this body's jurisdiction and finish with a specific requested action. Use plain language. Link every project claim to a source. Do not invent facts, agenda items, legal conclusions, or quotations. If you cannot access the agenda or sources, ask the resident to supply them. Mark anything needing verification. Avoid em dashes, ellipses, and emojis.`;
      document.querySelector('[data-prompt-status]').textContent='';
      window.openSiteDialog(document.getElementById('commentPromptModal'),comment);
    }
    if (event.target.closest('[data-copy-prompt]')) {
      try{await window.copySiteText(document.getElementById('commentPromptText').value);document.querySelector('[data-prompt-status]').textContent='Prompt copied.';}
      catch(error){document.querySelector('[data-prompt-status]').textContent=error.message;}
    }
    const promptService=event.target.closest('[data-prompt-service]');
    if(promptService){const base=promptService.dataset.promptService==='chatgpt'?'https://chatgpt.com/':'https://claude.ai/new';const url=new URL(base);url.searchParams.set('q',document.getElementById('commentPromptText').value);window.open(url.toString(),'_blank','noopener,noreferrer');}
    const print=event.target.closest('[data-print-month]');
    if(print) printMonth(print.dataset.printMonth);
  });
  function updateCalendarHelp(){
    const session=WacoCalendar.sessions(selectedEvent.time)[Number(sessionSelect.value)];
    document.getElementById('calendarHelp').textContent=session.start===null?'Time is not confirmed. This saves an all-day reminder. Check with the organizer.':session.estimated?'Time zone: America/Chicago. End time is estimated at one hour. Confirm with the organizer.':'Time zone: America/Chicago. The published time range is used.';
  }
  sessionSelect.addEventListener('change',updateCalendarHelp);
  function printMonth(key){
    const win=window.open('','_blank');
    if(!win)return;
    const doc=win.document;
    const style=doc.createElement('style');style.textContent='body{font:14px Georgia,serif;padding:20px;color:#141414}h1{font:900 28px Arial;text-transform:uppercase}table{width:100%;border-collapse:collapse;table-layout:fixed}td,th{border:1px solid #141414;padding:6px;vertical-align:top}td{height:100px}th{background:#141414;color:white}p{font-size:11px;border-top:1px solid #ccc;padding-top:4px}strong{font-family:monospace}.priority{border-left:3px solid #c8361c;padding-left:4px}@page{size:landscape;margin:.4in}';doc.head.append(style);
    const heading=doc.createElement('h1');heading.textContent=new Date(key+'-01T12:00:00Z').toLocaleDateString('en-US',{month:'long',year:'numeric',timeZone:'UTC'})+' · Community action calendar';doc.title=heading.textContent;doc.body.append(heading);
    const table=doc.createElement('table');const tr=doc.createElement('tr');['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].forEach(day=>{const th=doc.createElement('th');th.textContent=day;tr.append(th);});table.append(tr);
    const [year,month]=key.split('-').map(Number);const first=new Date(Date.UTC(year,month-1,1)).getUTCDay();const days=new Date(Date.UTC(year,month,0)).getUTCDate();const total=Math.ceil((first+days)/7)*7;
    for(let i=0;i<total;i++){
      if(i%7===0)table.append(doc.createElement('tr'));
      const cell=doc.createElement('td');table.lastChild.append(cell);const day=i-first+1;
      if(day<1||day>days)continue;
      const number=doc.createElement('strong');number.textContent=String(day);cell.append(number);
      const date=`${key}-${String(day).padStart(2,'0')}`;
      events.filter(e=>String(e.date).slice(0,10)===date).forEach(e=>{const p=doc.createElement('p');p.textContent=`${e.time} · ${e.title} · ${e.location}`;if(e.highlight)p.className='priority';cell.append(p);});
    }
    doc.body.append(table);const note=doc.createElement('p');note.textContent='wacodatacenter.com · Check the posted agenda for schedule changes. Meeting times are local to America/Chicago.';doc.body.append(note);win.focus();win.print();
  }
})();
