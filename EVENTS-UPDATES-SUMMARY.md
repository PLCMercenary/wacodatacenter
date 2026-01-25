# Events Calendar Updates - Summary

## Changes Made

### 1. Navigation Cleanup ✅
**Removed from main menu:**
- Blog (accessible from homepage)
- Fast Facts (accessible from homepage)
- Timeline (accessible from homepage)

**New streamlined menu:**
1. Home
2. Media
3. Resources
4. Events
5. Take Action
6. Contact

### 2. Action Committee Meetings ✅
**Changed all Action Committee meetings to `highlight: false`**
- These are internal planning meetings
- Not relevant for general public
- Committee members already know the schedule
- Removed from "Important Meetings" section

**Affected dates:**
- Jan 31, 2026
- Feb 14, 2026
- Feb 28, 2026
- Mar 14, 2026
- Mar 28, 2026
- Apr 11, 2026
- Apr 25, 2026

### 3. Limited Important Meetings Display ✅
**Changed template to show maximum 4 highlighted meetings:**
- 1 featured "Next Important Meeting" (top banner)
- 3 in "Other Important Meetings" grid
- All others still visible in chronological list below

**Current highlighted meetings (public-facing):**
1. **Jan 20** - McLennan County Commissioners Court (NEXT)
2. **Feb 1** - Community Update Meeting
3. **Feb 8** - Community Update Meeting
4. **Feb 10** - Lacy Lakeview City Council

## What the Public Sees Now

### Homepage
Orange banner shows: **McLennan County Commissioners Court Meeting** (Jan 20)

### Events Page
**Next Important Meeting section:**
- McLennan County Commissioners Court (Jan 20)

**Other Important Meetings (max 3):**
- Community Update Meeting (Feb 1)
- Community Update Meeting (Feb 8)
- Lacy Lakeview City Council (Feb 10)

**All Upcoming Events:**
Complete chronological list including all meetings (Action Committee meetings listed but not highlighted)

## Deploy Commands

```bash
cd /Users/sterrell/proj/wacodatacenter
git add .
git commit -m "Streamline navigation and focus important meetings on public events"
git push
```

## Files Modified
1. `hugo.toml` - Navigation menu
2. `content/events.md` - Event highlights
3. `layouts/_default/events.html` - Display limits
