# Freepik Image Curator

Select high-quality stock images from Freepik for website templates.

## When to Use

Use this skill when you need to:
- Find and select stock images for industry templates
- Search for context-specific images (services, blog posts, cities)
- Curate image libraries for pre-baked template content

## Prerequisites

- Freepik API key set as environment variable: `FREEPIK_API_KEY`
- Scripts available in `scripts/freepik/`

## Workflow Overview

### Phase 1: Search & Download Thumbnails

```bash
FREEPIK_API_KEY=your_key node scripts/freepik/search.js "search term" --orientation
```

Options:
- `--landscape` (default) - Hero images, banners, backgrounds
- `--portrait` - Vertical images, mobile-first content
- `--square` - Service cards, profile images, thumbnails
- `--limit 30` - Number of results (default: 20)

Output: Thumbnails saved to `.image-review/[search-term]/`

### Phase 2: Visual Review

Read the downloaded thumbnails to evaluate:

1. **Relevance** - Does it match the intended use case?
2. **Quality** - Is it well-lit, sharp, professional?
3. **Composition** - Is there space for text overlay? Good focal point?
4. **Authenticity** - Does it look natural, not overly staged?
5. **Diversity** - Consider representing different demographics
6. **Branding** - Avoid visible competitor logos/branding

### Phase 3: Selection & Download

For selected images, download full resolution:

```bash
FREEPIK_API_KEY=your_key node scripts/freepik/download.js [resource-id]
```

Images download to `downloads/[resource-id].jpg`. Copy to destination:

```bash
cp downloads/[resource-id].jpg templates/images/hvac/services/ac-repair.jpg
```

### Phase 4: Compression (REQUIRED)

Full-resolution downloads are 5-20MB. **Always compress before use:**

```bash
node scripts/freepik/compress.js [path-to-image]
```

This resizes to 1920px width and 80% JPEG quality. Typical results:
- 20MB → 500KB (hero images)
- 10MB → 200KB (service images)

The script backs up originals as `.original.jpg` - delete these after verification.

## Image Categories by Use Case

### Hero Images (Landscape, 16:9 or wider)
- **Purpose**: Main banner, first impression
- **Qualities**: Dramatic, professional, space for text overlay on left or right
- **Avoid**: Busy backgrounds, centered subjects that conflict with text

### Service Images (Landscape or Square)
- **Purpose**: Service cards, service page headers
- **Qualities**: Action shots showing the work being done, tools, equipment
- **Avoid**: Static portraits, generic stock poses

### About Us / Team (Landscape)
- **Purpose**: About section, team showcase
- **Qualities**: Friendly, approachable, professional attire, natural setting
- **Avoid**: Overly corporate, stiff poses

### Background Images (Landscape, can be darker/moodier)
- **Purpose**: CTA sections, reviews sections, parallax backgrounds
- **Qualities**: Can be darker, more atmospheric, works with overlay
- **Avoid**: Too much detail that competes with foreground content

### Blog Images (Landscape, 16:9)
- **Purpose**: Blog post featured images
- **Qualities**: Relevant to topic, eye-catching, good for social sharing
- **Avoid**: Text-heavy images, watermarks

### City/Location Images (Landscape)
- **Purpose**: Service area pages
- **Qualities**: Recognizable landmarks, skylines, local flavor
- **Avoid**: Generic cityscapes that could be anywhere

## Search Strategy

### For Industry Templates
Use specific, descriptive terms:
- GOOD: "HVAC technician inspecting outdoor AC unit residential"
- BAD: "HVAC" or "air conditioning"

### For Services
Combine industry + service + action:
- "plumber repairing sink kitchen"
- "electrician installing outlet residential"
- "roofer installing shingles house"

### For Blog Posts
Match the content topic:
- "air filter replacement HVAC maintenance"
- "thermostat smart home temperature"

## Output Format

When recommending images, provide:

```markdown
## Image Selection: [Category/Purpose]

### Top Pick
- **ID**: [freepik-resource-id]
- **File**: [thumbnail-filename]
- **Why**: [2-3 sentences explaining selection]

### Alternatives
1. **ID [id]**: [brief reason]
2. **ID [id]**: [brief reason]

### Rejected
- **ID [id]**: [why not suitable]
```

## Integration with Industry Templates

Selected images are stored in:
```
templates/
  images/
    [industry]/
      hero.jpg
      about.jpg
      reviews-bg.jpg
      cta-bg.jpg
      services/
        [service-slug].jpg
      blog/
        [category]-1.jpg
        [category]-2.jpg
```

Image mappings are defined in:
```
templates/
  config/
    [industry].images.json
```

## API Cost Reference

- Search: $0.002/request (2,500 searches per $5)
- Download: $0.044/image (113 images per $5)

Budget accordingly when building libraries.
