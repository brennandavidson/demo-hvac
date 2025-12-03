# Valiance Media - Local Service Business Website Template

## What This Is

Next.js template for generating websites for local service businesses (HVAC, plumbing, roofing, pool service, etc.). Pre-built components, just populate with client data.

## Project Structure

```
site.config.json          # All client data, content, settings
client-intake/            # Input: form.md, logos, project photos
public/                   # Output: images, blog content
templates/images/         # Pre-curated industry stock images
scripts/freepik/          # Image search/download tools
```

## Key Files

- `site.config.json` - Central config, drives all pages
- `src/types/site-config.ts` - TypeScript interface (reference for valid fields)
- `client-intake/form.md` - Client intake form (input)

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Static export

## Client Intake Process

Run these 5 phases in order. Each is a separate skill:

1. **intake-phase-1-research** - Read intake form, research competitors
2. **intake-phase-2-content** - Write website copy, blog posts, SEO content
3. **intake-phase-3-config** - Build site.config.json, copy assets
4. **intake-phase-4-images** - Process images via Freepik API (CRITICAL)
5. **intake-phase-5-verify** - Test build, verify pages

## Critical Rules

- Do NOT modify .tsx files - only populate config and content
- Do NOT skip Phase 4 - Freepik API is required for blog/city images
- Do NOT reuse images - every image must be unique
- Projects gallery uses client photos ONLY (no stock images)
- Trust badge iconTypes: location, time, clock, star, shield, certificate, checkmark (ONLY these)

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
```

## Freepik API

API key is stored in `.env` file as `FREEPIK_API_KEY`. See `.env.example` for setup.

```bash
# Search
node scripts/freepik/search.js "keywords" output-dir --limit 15

# Download
node scripts/freepik/download.js [resource-id]

# Compress
node scripts/freepik/compress.js path/to/image.jpg
```
