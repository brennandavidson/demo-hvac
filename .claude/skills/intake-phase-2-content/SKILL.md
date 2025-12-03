---
name: intake-phase-2-content
description: Phase 2 of client intake - Write website copy, blog posts, and SEO content
---

# Phase 2: Content Generation

Write all website copy, blog posts, and SEO metadata files.

## Prerequisites

- Phase 1 complete (`.build-state/research.md` exists)
- Read `client-intake/form.md` for client details

## Step 3: Write Website Copy

Write copy for all homepage sections:
- Hero section (headline, subheadline, CTA text)
- About Us section (see limits below)
- Services overview
- Process/How It Works
- FAQ (5-8 common questions)
- Trust badges (see CRITICAL warning below)

### About Us Character Limits

The About Us section must be concise. Write exactly 3 paragraphs with these limits:
- Paragraph 1: 150-200 characters (intro, what the company does)
- Paragraph 2: 200-250 characters (reputation, team quality)
- Paragraph 3: 150-200 characters (commitment, satisfaction)
- **Total: 500-650 characters maximum**

Example lengths:
- P1: "With over 15 years of expertise, our company specializes in providing exceptional installation, renovation, and maintenance services to homeowners and businesses in the local area." (180 chars)
- P2: "Known for our meticulous attention to detail and commitment to quality craftsmanship, we've built a reputation as a trusted name in the community. Our team of experienced professionals brings knowledge, skill, and dedication to every project." (242 chars)
- P3: "We take pride in delivering superior results that exceed expectations, while maintaining the highest standards of customer satisfaction and service excellence." (159 chars)

Do NOT write long backstories or detailed founder histories. Keep it brief and professional.

### Trust Badges - CRITICAL

⚠️ **Trust badges: exactly 3 badges. The ONLY valid iconType values are:**
- `location`
- `time`
- `clock`
- `star`
- `shield`
- `certificate`
- `checkmark`

**DO NOT invent new iconTypes** (like "veteran", "license", "quality", "award", etc.) - they will render as BLANK icons.

Map client attributes to the closest valid icon:
- Veteran/Military owned → `shield`
- Licensed/Certified → `certificate`
- Years experience → `time`
- Local/Location-based → `location`
- Quality/Rating → `star`
- Guaranteed/Protected → `checkmark`

Use competitor research to inform messaging. Write in professional, educational voice.

## Step 4: Generate SEO Content

### CRITICAL: Content Formatting

Every section's `content` field MUST include:
- `<h3>` subheadings (1-2 per section)
- `<ul>` or `<ol>` lists (at least 1 per section)
- Short paragraphs (2-4 sentences)

**NO WALLS OF TEXT.** Never write more than 2-3 consecutive `<p>` tags without a list or subheading.

### Service Page Content

For each service, write 3-4 sections with 200-400 words each (600-1000 words total per service page).

### City Page Content

For each service area city, write 3-4 sections with 200-400 words each (600-1000 words total per city page).

### Blog Post Generation

Create 6-8 blog posts across 1-2 categories. Blog posts are stored as JSON files in `public/blog-content/categories/[category-slug]/`.

1. Choose 1-2 category slugs (lowercase-hyphenated): maintenance-tips, repair-guides, hvac-tips, pool-care, etc.

2. For each category, create directory and config:
```bash
mkdir -p public/blog-content/categories/[category-slug]
```

Create `.config.json` in each category folder:
```json
{
  "name": "Maintenance Tips",
  "description": "Expert tips for maintaining your HVAC system"
}
```

3. Generate 3-4 blog posts per category. Each post is a separate JSON file named `[post-slug].json`:

```json
{
  "title": "[SEO-optimized title]",
  "excerpt": "[2-3 sentence summary]",
  "author": {
    "name": "[Business Name]",
    "bio": "[Brief company description]"
  },
  "publishedAt": "2024-03-15T10:00:00Z",
  "tags": ["[keyword1]", "[keyword2]", "[keyword3]"],
  "image": "/images/blog/[post-slug].jpg",
  "imageAlt": "[Descriptive alt text - write this now]",
  "featured": false,
  "content": "<h2>First Section Heading</h2><p>Opening paragraph...</p><h3>Subheading</h3><ul><li>Point 1</li><li>Point 2</li></ul><p>More content...</p>",
  "seo": {
    "title": "[60-char SEO title]",
    "description": "[155-char meta description]",
    "keywords": ["[keyword1]", "[keyword2]", "[keyword3]"]
  }
}
```

**Blog Image paths:** Set to `/images/blog/[post-slug].jpg`. Phase 4 will download actual images.

**Content formatting:**
- Do NOT wrap content in `<article>` tags
- Start with `<h2>` for main sections
- Use `<h3>` for subsections
- Include `<ul>` or `<ol>` lists
- Use `<p>` for paragraphs

## Step 5: Generate SEO Metadata Files

### Homepage SEO

Update `src/app/(pages)/(home)/seo-config.json`:
```json
{
  "slug": "home",
  "seo": {
    "title": "[Business Name] | [Service Type] in [City], [State]",
    "description": "[145-155 char description of business and primary services]",
    "keywords": ["[service type]", "[city]", "[primary service 1]", "[primary service 2]"],
    "noIndex": false
  },
  "sitemap": {
    "exclude": false,
    "priority": 1.0,
    "changeFrequency": "weekly"
  },
  "metadata": {
    "category": "homepage",
    "author": "[Business Name]",
    "lastModified": "[Current date YYYY-MM-DD]"
  }
}
```

### Global SEO Config

Update `src/seo/seo.config.ts`:
- Change `siteName: 'Valiance Media'` to `siteName: '[Business Name]'`
- Update `siteUrl` if domain is known

### Service Page SEO Files

For each service, create `src/seo/pages/services/[service-slug].seo-config.json`:

```json
{
  "title": "[Service] in [City], [State] | [Business Name]",
  "description": "[145-155 char description of service targeting local keywords]",
  "openGraph": {
    "title": "[Service] in [City], [State] | [Business Name]",
    "description": "[Same as description above]",
    "type": "website"
  }
}
```

### Service Area SEO Files

For each city, create `src/seo/pages/service-areas/[city-slug].seo-config.json`:

```json
{
  "title": "[Service Type] in [City], [State] | [Business Name]",
  "description": "[145-155 char description highlighting local service availability]",
  "openGraph": {
    "title": "[Service Type] in [City], [State] | [Business Name]",
    "description": "[Same as description above]",
    "type": "website"
  }
}
```

Create one SEO file for EVERY service and EVERY city from the intake form.

## Phase Complete

After generating all content and SEO files, proceed to **intake-phase-3-config**.
