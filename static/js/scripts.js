/* Shared behavior, with no framework or build pipeline. */
(() => {
  const triggers = new WeakMap();
  window.openSiteDialog = (dialog, trigger) => {
    if (!dialog) return;
    triggers.set(dialog, trigger || document.activeElement);
    dialog.showModal();
  };
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.addEventListener('close', () => triggers.get(dialog)?.focus());
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
  });
  window.copySiteText = async text => {
    try {
      if (!navigator.clipboard) throw new Error('Clipboard API unavailable');
      await navigator.clipboard.writeText(text);
    } catch {
      const input = document.createElement('textarea');
      input.value = text;
      input.style.cssText = 'position:fixed;left:-9999px;top:0';
      (document.querySelector('dialog[open]') || document.body).append(input);
      input.select();
      const copied = document.execCommand('copy');
      input.remove();
      if (!copied) throw new Error('Copy unavailable. Please select and copy the text.');
    }
  };
  document.addEventListener('click', async event => {
    const trigger = event.target.closest('[data-dialog]');
    if (trigger) { event.preventDefault(); window.openSiteDialog(document.getElementById(trigger.dataset.dialog), trigger); }
    const close = event.target.closest('[data-close]');
    if (close) close.closest('dialog').close();
    const menuLink = event.target.closest('#menuDialog a');
    if (menuLink) menuLink.closest('dialog').close();
    if (event.target.closest('[data-print]')) window.print();
    const share = event.target.closest('[data-share]');
    const copy = event.target.closest('[data-copy-link]');
    if (share || copy) {
      const button = share || copy;
      const url = document.querySelector('link[rel="canonical"]').href;
      try {
        if (share && navigator.share) await navigator.share({title:document.title,url});
        else { await window.copySiteText(url); button.textContent = 'Link copied'; }
      } catch (error) { if (error.name !== 'AbortError') button.textContent = 'Copy unavailable'; }
    }
  });
  // Let native constraint validation handle submission; expose its messages inline as well.
  document.querySelectorAll('.site-form').forEach(form => {
    form.addEventListener('invalid', event => {
      const field = event.target;
      if (field.type === 'checkbox') return;
      field.setAttribute('aria-invalid', 'true');
      const id = `${field.id}-error`;
      let message = document.getElementById(id);
      if (!message) { message = document.createElement('p'); message.id = id; message.className = 'field-error'; field.after(message); }
      message.textContent = field.validationMessage;
      field.setAttribute('aria-describedby', id);
    }, true);
    form.addEventListener('input', event => {
      const field = event.target;
      if (!field.validity.valid) return;
      field.removeAttribute('aria-invalid');
      const message = document.getElementById(`${field.id}-error`);
      if (message) { message.remove(); field.removeAttribute('aria-describedby'); }
    });
  });
  // Mobile contents are initially collapsed; desktop contents remain open.
  if (matchMedia('(max-width: 767px)').matches) document.querySelectorAll('.toc').forEach(toc => toc.open = false);
  const lead = document.querySelector('[data-thank-lead]');
  if (lead && location.pathname === '/thank-you/') {
    const form = new URLSearchParams(location.search).get('form');
    const messages = {
      'yard-signs': ['Yard signs', 'Your yard sign and/or flyer request has been received!', 'Someone will contact you within 24-48 hours to confirm your order and coordinate delivery or pickup.'],
      'email-signup': ['Email signup', "You've been added to our email list!", "You'll receive updates on new research, upcoming meetings, and action items. You can unsubscribe at any time."],
      'contact': ['Contact', "We've received your message!", "We'll get back to you within 24-48 hours."]
    };
    if (messages[form]) {
      const [label, title, detail] = messages[form];
      document.querySelector('[data-thank-kicker]').textContent = `Received · ${label}`;
      lead.textContent = title;
      document.querySelector('[data-thank-detail]').textContent = detail;
    }
  }
})();
