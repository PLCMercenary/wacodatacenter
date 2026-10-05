#!/usr/bin/env python3
"""Check generated routes, links, IDs, and the existing Netlify form contracts.
Usage: python3 scripts/check-site.py public [baseline-directory]
"""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import sys

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links, self.ids, self.forms, self.current = [], [], [], None
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a:
            self.ids.append(a['id'])
        if tag in ('a', 'link', 'img', 'script'):
            value = a.get('href', a.get('src', ''))
            if value:
                self.links.append(value)
        if tag == 'form':
            self.current = {'attrs': a, 'fields': {}, 'options': []}
            self.forms.append(self.current)
        if self.current and tag in ('input', 'select', 'textarea') and a.get('name'):
            self.current['fields'][a['name']] = {'required': 'required' in a, 'type': a.get('type', 'text' if tag == 'input' else tag)}
        if self.current and tag == 'option':
            self.current['options'].append(a.get('value'))
    def handle_endtag(self, tag):
        if tag == 'form':
            self.current = None

def parse(path):
    page = Page()
    page.feed(path.read_text())
    return page

root = Path(sys.argv[1]).resolve()
errors = []
for path in root.rglob('*.html'):
    page = parse(path)
    name = str(path.relative_to(root))
    if len(page.ids) != len(set(page.ids)):
        errors.append(f'{name}: duplicate IDs')
    for value in page.links:
        url = urlsplit(value)
        if url.netloc or not url.path.startswith('/'):
            continue
        target = root / unquote(url.path).lstrip('/')
        if not target.exists():
            errors.append(f'{name}: missing {value}')
    for form in page.forms:
        attrs = form['attrs']
        if attrs.get('name') in ('email-signup', 'contact', 'yard-signs'):
            if attrs.get('data-netlify') != 'true' or attrs.get('method', '').upper() != 'POST':
                errors.append(f'{name}: missing Netlify form registration')
            if attrs.get('data-netlify-honeypot') != 'bot-field' or 'bot-field' not in form['fields']:
                errors.append(f'{name}: missing honeypot')
            for field in ('name', 'email'):
                if not form['fields'].get(field, {}).get('required'):
                    errors.append(f'{name}: missing required {field}')
            consent = ('contact-consent', 'privacy-consent') if attrs['name'] == 'yard-signs' else ('consent',)
            for field in consent:
                if not form['fields'].get(field, {}).get('required'):
                    errors.append(f'{name}: missing required {field}')
if len(sys.argv) > 2:
    baseline = Path(sys.argv[2]).resolve()
    for path in baseline.rglob('*'):
        if path.is_file() and not (root / path.relative_to(baseline)).exists():
            errors.append(f'Lost route/file: {path.relative_to(baseline)}')
    for route, name in (('index.html', 'email-signup'), ('contact/index.html', 'contact'), ('yard-signs/index.html', 'yard-signs')):
        before = next(f for f in parse(baseline / route).forms if f['attrs']['name'] == name)
        after = next(f for f in parse(root / route).forms if f['attrs']['name'] == name)
        if before['fields'] != after['fields'] or before['options'] != after['options']:
            errors.append(f'{name}: changed field names, required flags, types, or option values')
        if urlsplit(before['attrs']['action']).path != urlsplit(after['attrs']['action']).path:
            errors.append(f'{name}: changed success route')
if errors:
    print('\n'.join(sorted(set(errors))))
    sys.exit(1)
print('Site checks passed: local links, unique IDs, form contracts' + (', and preserved routes/downloads.' if len(sys.argv) > 2 else '.'))
