# Updating the Community Calendar

How to add, change, or remove events on [wacodatacenter.com/events](https://wacodatacenter.com/events/).

Everything lives in one file: **`content/events.md`**. There is no database and no admin login. You edit the file, push it, and the site rebuilds itself in about 30 seconds.

If you are handing this to an AI agent instead of doing it yourself, skip to [Handing this to an agent](#handing-this-to-an-agent) at the bottom.

## The one rule that matters

**The calendar only shows events dated today or later.** Past events stay in the file as a record but vanish from the page.

That means if nobody adds new dates, the page eventually goes blank. It has happened. Add a new batch before the current one runs out, and put a reminder on your own calendar to check every couple of months.

## Adding an event

Open `content/events.md`. Past the top few lines you will see a long list of blocks that look like this:

```yaml
  - date: 2026-09-13
    time: "6:00 PM"
    title: "Community Update Meeting"
    location: "Ross VFD"
    category: "Community Meeting"
    highlight: true
    notes: "Open to the public. Monthly community update on the L2D2 data center project."
```

Copy one, change the values, paste it in with a blank line above and below. Order in the file does not matter, the site sorts by date. Group it near the same month anyway so humans can find it.

Formatting rules that will break the build if you get them wrong:

- Two spaces before `- date:`, four spaces before every other line.
- Date is `YYYY-MM-DD` with no quotes.
- Everything else is wrapped in double quotes.
- Tabs are not allowed anywhere. Spaces only.

### The fields

`date`, `time`, `title`, `location`, `category` and `highlight` are required. The rest are optional, and you leave a line out entirely rather than setting it to empty.

**`time`** is free text, so write it however it reads best: `"6:00 PM"`, `"9:00 AM – 1:00 PM"`, `"3:00 PM / 6:00 PM"`, `"TBD"`.

**`category`** must be spelled exactly as one of these, because the layout changes behavior based on the string:

```
City Council       Water Board      County
Action Committee   Community Meeting
Public Outreach    Community Event  Business Conference   ERCOT
```

`Public Outreach` is special. It makes the entry eligible for the "Next Outreach Opportunities" cards. Use it for markets, festivals, and anywhere we can set up a booth. A typo here means the event renders as a plain gray row.

**`highlight: true`** does more than you would guess. It puts the event in the "Other Important Meetings" row, and the *soonest* highlighted event becomes the big red **NEXT IMPORTANT MEETING** banner on both the events page and the homepage.

That banner is the most prominent call to action on the site, so highlight sparingly. Community meetings and Lacy Lakeview council: yes. Routine board meetings and internal planning: no. We learned this the hard way when the weekly internal Action Committee meeting kept winning the banner and the homepage told residents to attend a planning session labeled "Internal planning."

**`agenda_url`** puts an "Agenda" button on the row. Link the agenda center page, not a PDF, since PDF links rot.

**`info_url`** puts an "Info" link on the row. Use for outreach events.

**`notes`** shows as small gray text under the event. Good for "public comment opportunity" or "weather permitting."

**`completed: true`** hides an event from the homepage banner only. Use it when a highlighted meeting has happened but you want the record kept.

**`outcome`** appears in “Outcomes on the record” when the event also has `completed: true`. Past events remain in the source file.

## Verify dates before you enter them

Do not generate recurring dates from a pattern and assume they are right. Two ways that bites:

**Holiday weeks.** Councils cancel or move meetings around Thanksgiving and Christmas. The fourth Tuesday of November and December are almost always wrong. Check the posted agenda before trusting them.

**Season schedules.** The Waco Downtown Farmers Market looks like "every Saturday," but the published season schedule skips Nov 28 and Dec 26, and hours change to a noon close in July and August. The real dates are on [their Marketspread page](https://marketspread.com/market/12458/waco-downtown-farmers-market/). Use the published list, not the pattern.

Where a venue does not publish dates, say so in `notes` instead of guessing. The Will of Waco is the current example: HomeGrown Sundays runs "every Sunday, weather permitting," they confirm a winter break exists, but they never publish when it starts. Their Fall Festival page still shows last year's date. For anything at The Will, call 254-435-0005 or check their Facebook, and only enter what you can confirm.

## The recurring meeting schedule

Current cadence for the bodies we track. Verify against the posted agenda before entering, especially in November and December.

| Body | Cadence | Time | Location |
|---|---|---|---|
| Community Update Meeting | 1st Sunday | 6:00 PM | Ross VFD |
| Data Center Action Committee | Every Saturday | 9:30 AM | Ross VFD |
| Lacy Lakeview City Council | 2nd + 4th Tuesday | 6:00 PM | Lacy Lakeview City Hall |
| Bellmead City Council | 2nd Tuesday | 6:30 PM | Bellmead City Hall |
| Waco City Council | 1st + 3rd Tuesday | 3:00 PM / 6:00 PM | Waco City Hall |
| Hewitt City Council | 1st + 3rd Monday | 7:00 PM | Hewitt City Hall |
| City of West Council | 1st + 4th Tuesday | 6:00 PM | West City Hall |
| Robinson City Council | 1st Tuesday | 6:00 PM | Robinson City Hall |
| McLennan County Commissioners | 2nd + 4th Tuesday | 9:00 AM | McLennan County Courthouse |
| Elm Mott Water Supply Corp | 1st Monday | 6:00 PM | 314 W. Elm Mott Drive |
| Chalk Bluff Water Supply Corp | 1st Tuesday | 6:00 PM | 6511 Gholson Rd (and Zoom) |
| Ross Water Supply Board | 2nd Monday | 7:00 PM | Ross City Hall |
| Southern Trinity Groundwater | 4th Wednesday | 12:30 PM | McLennan County Archives |

Agenda links for these are already in the file. Copy an existing entry for that body rather than retyping the URL.

## Checking your work

If you have Hugo installed:

```bash
hugo server -D
```

Then open http://localhost:1313/events/ and look at it. The page updates as you save.

To just confirm you have not broken anything:

```bash
hugo
```

Silence means it built. Any error message will name the line number in `content/events.md`.

If you do not have Hugo, push to a branch instead of `main` and Netlify will build a preview you can look at before it goes live.

Worth eyeballing every time:

- The red NEXT IMPORTANT MEETING banner names the meeting you expect, on the homepage and on `/events/`.
- Your new month has a section under "All Upcoming Events."
- Outreach events appear under “Next outreach” and have a Public Outreach tag.

## Publishing

```bash
git add content/events.md
git commit -m "Add October council meeting dates"
git push
```

Pushing to `main` publishes it. Netlify rebuilds in about 30 seconds. There is no separate deploy step and no way to stage it, so if you are unsure, use a branch.

## When it breaks

**Events page says "No events scheduled at this time."** Everything in the file is in the past. Add future dates.

**Build fails after your edit.** Almost always indentation. Check for a tab character, a missing quote, or `- date:` that is not indented exactly two spaces.

**Wrong meeting in the red banner.** Something closer in the future has `highlight: true`. Either unhighlight it or add `completed: true` if it already happened.

**Event is on the page but styled wrong.** The `category` string does not exactly match the list above. Check capitalization and spelling.

**Change is live but you still see the old page.** Hard refresh. Cache is set to one hour for CSS and JS.

## Handing this to an agent

Paste something like this, filling in the specifics:

> In the wacodatacenter repo, add events to `content/events.md` for [dates].
>
> Read `EVENTS.md` first for the format and the field rules. Copy the shape of an existing entry rather than inventing fields.
>
> Do not generate recurring dates from a pattern without verifying them. Check posted agendas for holiday weeks, and use published season schedules for markets rather than assuming weekly recurrence. If you cannot verify a date from a real source, leave it out and tell me, rather than guessing.
>
> Only set `highlight: true` on public-facing meetings, never on routine board meetings or internal planning.
>
> Run `hugo` to confirm it builds, confirm the NEXT IMPORTANT MEETING banner resolves to the meeting it should, then show me the diff before committing.

The two failure modes worth guarding against: an agent will happily generate a tidy set of fourth-Tuesday dates that the council actually cancelled for Thanksgiving, and it will assume a farmers market runs every single Saturday when the published schedule says otherwise. Both look completely plausible in the diff. Ask for sources on any date it could not verify.

## Public Record calendar tools

Category and Priority buttons filter the calendar without changing event data. With JavaScript disabled, all upcoming rows remain visible. Each month can be printed. Calendar exports offer Google, Outlook, and ICS; meetings with multiple sessions let the visitor choose a session. Times are interpreted in America/Chicago, including daylight saving. Missing end times are explicitly estimated at one hour, and TBD times become clearly labeled all-day reminders.

The daily rebuild workflow is documented in README.md. It needs the repository's NETLIFY_BUILD_HOOK Actions secret before it can refresh production automatically. A scheduled rebuild expires past entries but does not verify or add meeting dates.
