# Quick Fix - Jan 24, 2026

## Issues Fixed

### 1. Brazos River Authority Agenda Link ✅
Added agenda URL for Jan 26 meeting:
`https://brazos.org/Portals/0/BOD/Agendas/2026-01-26-BOD-Agenda.pdf`

### 2. Homepage/Events Page Mismatch ✅
**Problem:** Jan 13 Lacy Lakeview meeting was still marked as highlighted even though it's completed and in the past

**Fix:** Removed `highlight: true` from Jan 13 meeting

**Result:** Both homepage and events page now show **McLennan County Commissioners Court Meeting (Jan 20)** as next important meeting

## Current Important Meetings Order
1. **Jan 20** - McLennan County Commissioners Court ← NEXT
2. **Feb 1** - Community Update Meeting  
3. **Feb 8** - Community Update Meeting
4. **Feb 10** - Lacy Lakeview City Council

## Deploy
```bash
git add .
git commit -m "Fix: Add BRA agenda link and remove highlight from past Jan 13 meeting"
git push
```
