#!/usr/bin/env python3
"""Build isolated content fixtures to verify date selection, discovery, and pagination.
Usage: python3 scripts/test-hugo.py /path/to/hugo
"""
from pathlib import Path
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo
import os
import shutil
import subprocess
import sys
import tempfile

repo = Path(__file__).resolve().parents[1]
hugo = sys.argv[1] if len(sys.argv) > 1 else 'hugo'
today = datetime.now(ZoneInfo('America/Chicago')).date()
with tempfile.TemporaryDirectory(prefix='waco-hugo-test-') as directory:
    root = Path(directory)
    for name in ('layouts', 'content', 'data'):
        shutil.copytree(repo / name, root / name)
    shutil.copy(repo / 'hugo.toml', root / 'hugo.toml')
    events = [
        (today - timedelta(days=1), 'Past priority fixture', True, False),
        (today, 'Today completed fixture', True, True),
        (today, 'Today public priority fixture', True, False),
        (today + timedelta(days=1), 'Future routine fixture', False, False),
        (today + timedelta(days=2), 'Future priority fixture', True, False),
    ]
    text = '---\ntitle: Meetings\nlayout: events\nevents:\n'
    for date, title, highlight, completed in events:
        text += f'  - date: {date}\n    title: "{title}"\n    time: "6:00 PM"\n    location: "Test location"\n    category: "City Council"\n    highlight: {str(highlight).lower()}\n    completed: {str(completed).lower()}\n'
    (root / 'content/events.md').write_text(text + '---\n')
    hidden_title = 'UNLISTED_DISCOVERY_FIXTURE'
    (root / 'content/posts/hidden-fixture.md').write_text(f'---\ntitle: {hidden_title}\ndate: {today}\nunlisted: true\nslug: hidden-fixture\ncategories: [analysis]\ntags: [water]\n---\nDirect access should still work.\n')
    for number in range(21):
        (root / f'content/posts/pagination-fixture-{number}.md').write_text(f'---\ntitle: PAGINATION_FIXTURE_{number}\ndate: 2026-01-01\nslug: pagination-fixture-{number}\ncategories: [analysis]\n---\nFixture body.\n')
    env = dict(os.environ, TZ='America/Chicago')
    subprocess.run([hugo, '--source', str(root), '--destination', str(root / 'public'), '--cacheDir', str(root / 'cache')], check=True, env=env, stdout=subprocess.DEVNULL)
    public = root / 'public'
    home = (public / 'index.html').read_text()
    meetings = (public / 'events/index.html').read_text()
    band = home.split('class="meeting-band"', 1)[1].split('</section>', 1)[0]
    assert 'Today public priority fixture' in band
    assert 'Today completed fixture' not in band
    calendar = meetings.split('id="calendar"', 1)[1].split('id="calendar-events"', 1)[0]
    assert 'Past priority fixture' not in calendar
    assert 'Today public priority fixture' in calendar
    assert 'Future routine fixture' in calendar
    assert 'Today completed fixture' in calendar  # Preserve existing completed-field semantics.
    for route in ('index.html', 'index.xml', 'posts/index.html', 'posts/index.xml', 'categories/analysis/index.html', 'categories/analysis/index.xml', 'tags/water/index.html'):
        assert hidden_title not in (public / route).read_text(), route
    assert hidden_title in (public / 'posts/hidden-fixture/index.html').read_text()
    pages = (public / 'posts/index.html').read_text() + (public / 'posts/page/2/index.html').read_text()
    for number in range(21):
        assert f'PAGINATION_FIXTURE_{number}<' in pages
print('Hugo fixture checks passed: today/past/completed selection, unlisted discovery and RSS, direct access, and pagination.')
