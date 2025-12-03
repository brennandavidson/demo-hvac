---
name: intake-phase-5-verify
description: Phase 5 of client intake - Test build and verify all pages work
---

# Phase 5: Verify & Test

Run the build and verify all pages work correctly.

## Prerequisites

- Phases 1-4 complete
- site.config.json fully populated
- All images processed

## Step 9: Test Build

### Run Production Build

```bash
npm run build
```

Check for errors. Common issues:
- JSON syntax errors in site.config.json
- Missing required fields
- Invalid props (wrong field names)
- Missing image files

### Start Dev Server (if not running)

```bash
npm run dev
```

### Test Key Routes

```bash
curl -s http://localhost:3000/ | head -100
curl -s http://localhost:3000/services/[first-service-slug] | head -100
curl -s http://localhost:3000/service-areas/[first-city-slug] | head -100
curl -s http://localhost:3000/blog | head -100
```

### Verification Checklist

Verify each item:

**Homepage:**
- [ ] Loads with correct business name
- [ ] Hero section displays correctly
- [ ] All services appear in navigation dropdown
- [ ] Trust badges render (not blank)
- [ ] Footer shows correct business info and hours

**Service Pages:**
- [ ] Each service page loads
- [ ] Hero image displays
- [ ] Content sections have proper HTML formatting (not plain text)
- [ ] No "undefined" or placeholder text visible

**Service Area Pages:**
- [ ] Each city page loads
- [ ] Hero image is unique per city (not all the same)
- [ ] Content sections have proper HTML formatting

**Blog:**
- [ ] Blog index page loads
- [ ] All blog posts appear
- [ ] Each post has a unique image (not reused)
- [ ] Images are local paths (not Unsplash URLs)

**Projects (if applicable):**
- [ ] If client photos exist: gallery displays with images
- [ ] If no client photos: projects section/page is hidden
- [ ] No empty src errors in console

**Contact/Integrations:**
- [ ] Contact page loads
- [ ] GHL quote form embed works (if provided)
- [ ] Chat widget loads (if provided)

### Check Browser Console

Open browser dev tools and check for:
- No "empty src" errors
- No 404 errors for images
- No JavaScript errors

## Summary

After verification, summarize to user:
- Number of services created
- Number of city pages created
- Number of blog posts created
- Any issues found or warnings

## Cleanup

Remove temporary build state:
```bash
rm -rf .build-state/
```

## Process Complete

The website build is complete. All phases finished successfully.
