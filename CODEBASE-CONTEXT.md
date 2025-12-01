# Valiance Media Next.js Starter - Main Context

## Project Overview
Next.js 15 contractor website template with AI-powered client intake processor. Template + skill system to generate complete websites from intake forms.

**Tech Stack:** Next.js 15, React Server Components, TypeScript, Tailwind CSS, App Router

## Repository Structure
```
.claude/
  skills/
    client-intake-processor.md    # Main intake processing workflow (8 steps)
    elite-content-generator.md    # SEO content writing guidelines
  instructions/
    client-intake-process.md      # Entry point for intake processing
src/
  app/(pages)/                    # All customer-facing pages
  app/admin/                      # Admin dashboard (blog, redirects)
  components/
    layout/                       # Header, Footer
    sections/                     # Reusable page sections
  lib/                           # Utilities, config loaders
  seo/pages/                     # SEO metadata JSON files
public/
  blog-content/categories/       # Blog posts as JSON files
  logos/                         # Client logos
  projects/                      # Project photos
  favicon/                       # Generated favicons
site.config.json                 # Main configuration file
```

## Key Concepts

### Template Fill Pattern
- **Pre-built structure**: All .tsx files are fixed, don't modify
- **Data population**: Only populate site.config.json, copy assets, generate content files
- **No code changes**: Client intake should NEVER edit .tsx components

### Configuration System
- **site.config.json**: Business info, services, cities, branding, integrations
- **SEO files**: Separate `.seo-config.json` for each service/city page
- **Blog posts**: Individual JSON files in `public/blog-content/categories/`

### Dynamic Content Loading
- Components use `getSiteConfig()` helpers to load from site.config.json
- Pages use `generateStaticMetadata()` to load SEO from `.seo-config.json`
- Blog system reads JSON files from filesystem

## Client Intake Processor (8 Steps)

### Prerequisites
Required files in `client-intake/`:
- `form.md` - Completed intake form
- `logo/horizontal.png` - Main logo
- `logo/horizontal-white.png` - Inverted logo
- `logo/square.png` - Square logo for favicons
- `projects/*.jpg` (optional) - Project photos

### Process Steps
1. **Read intake form** - Extract business data, services, cities, contact info
2. **Research competitors** - 5-8 WebSearch + WebFetch calls to understand industry
3. **Write website copy** - Hero, about, process, FAQ sections
4. **Generate SEO content** - Service pages, city pages, 6-8 blog posts as JSON files
5. **Generate SEO metadata** - Create `.seo-config.json` for all pages
6. **Build site.config.json** - Populate with ALL data, REPLACE template values
7. **Copy assets** - Logos to public/logos/, projects to public/projects/, generate favicons
8. **Test build** - Verify compilation and rendering

### Common Issues from Tests 1-10
- **Skipping steps**: Blog generation most commonly skipped
- **Appending vs replacing**: Must REPLACE config, not append
- **Image paths**: Should leave empty or use placeholders, NOT project paths unless photos exist
- **Project photos**: Must explicitly copy with bash commands, not just reference
- **SEO metadata**: Completely separate from site.config.json, creates .seo-config.json files
- **Blog posts**: Are JSON files in public/blog-content/, NOT in site.config.json

## File Formats

### site.config.json Structure
```json
{
  "business": { "name", "seoH1", "tagline", "primaryLocation", "heroDescription", "heroBackgroundImage", "reviewBadges", "trustBadges" },
  "contact": { "phone", "email", "address", "googleMapsEmbed", "googleBusinessUrl", "googleReviewUrl" },
  "services": {
    "items": [{ "title", "slug", "imageSrc", "imageAlt", "description" }],
    "details": { "[slug]": { "hero", "sections": [{ "heading", "content" }] } }
  },
  "serviceAreas": {
    "cities": [{ "name", "slug" }],
    "details": { "[slug]": { "hero", "sections" } }
  },
  "aboutUs": { "sectionBadge", "sectionHeading", "content", "stats" },
  "process": { "sectionBadge", "sectionHeading", "steps" },
  "faq": { "sectionBadge", "sectionHeading", "items": [{ "question", "answer" }] },
  "blog": { "sectionBadge", "sectionHeading", "sectionDescription" },
  "cta": { "heading", "subheading", "buttonText", "backgroundImage" },
  "branding": { "colors", "logo" },
  "footer": { "companyDescription", "businessLinks", "legalLinks", "hours" },
  "social": { "facebook", "instagram", "google", "yelp" },
  "projects": { "heroBackgroundImage", "gallery": [{ "id", "title", "imageSrc", "alt", "category", "featured" }] },
  "integrations": { "ghl": { "quoteFormEmbedInline", "quoteFormEmbedPopup", "chatWidgetEmbed" }, "featurable": { "widgetId" } }
}
```

### SEO Config Files
Location: `src/seo/pages/services/[slug].seo-config.json`
```json
{
  "title": "Service in City, State | Business Name",
  "description": "145-155 character meta description",
  "openGraph": {
    "title": "Same as title",
    "description": "Same as description",
    "type": "website"
  }
}
```

### Blog Post Files
Location: `public/blog-content/categories/[category-slug]/[post-slug].json`
```json
{
  "title": "SEO-optimized title",
  "excerpt": "2-3 sentence summary",
  "author": { "name": "Business Name", "bio": "Brief description" },
  "publishedAt": "2024-03-15T10:00:00Z",
  "tags": ["keyword1", "keyword2"],
  "image": "Unsplash URL or empty",
  "imageAlt": "Image description",
  "featured": false,
  "content": "<article class='prose prose-lg max-w-none'>HTML content</article>",
  "seo": { "title", "description", "keywords" }
}
```

Category config: `public/blog-content/categories/[category-slug]/.config.json`
```json
{
  "name": "Category Name",
  "description": "Category description"
}
```

## Recent Major Fixes (Test 10 → Test 11)

### Skill Improvements
1. **Blog generation** - Added explicit JSON file structure, was missing entirely
2. **SEO metadata** - Added new Step 5 with complete .seo-config.json structure
3. **Project photos** - Added numbered steps with exact bash commands
4. **Image URLs** - Added explicit rules to leave empty
5. **Steps restructure** - Increased from 7 to 8 steps, added SEO metadata generation

### Template Fixes
1. **FAQ section** - Removed hardcoded Unsplash image, single column layout
2. **Heading styles** - Added `prose-headings:font-heading prose-headings:font-bold prose-headings:text-gray-900`
3. **Service areas** - Fixed to pull dynamically from config (landing page + city pages)
4. **City page headings** - Changed from blue to black (text-gray-900)

## Fixes from Test 11

### Skill Improvements
1. **About Us character limits** - Added explicit limits: 3 paragraphs, 500-650 total chars. Prevents long backstories/founder narratives.
2. **SEO content formatting** - Added CRITICAL formatting section at top of elite-content-generator. Added "WRONG example" showing wall of text. Reinforced in client-intake-processor Step 4. Content MUST have `<h3>` subheadings and `<ul>`/`<ol>` lists - no more than 2-3 consecutive `<p>` tags allowed.
3. **Blog post images** - Added explicit requirement for Unsplash URLs on every blog post. Added format template and instructions.
4. **Blog content format** - Removed `<article>` wrapper instruction (BlogLayout already applies prose styling). Content should start directly with `<h2>` tags. Clarified that content is rendered as HTML, not escaped.
5. **Trust badge iconTypes** - Added CRITICAL warning with explicit list of ONLY valid iconTypes (location, time, clock, star, shield, certificate, checkmark). Added mapping table for common client attributes to valid icons. Invalid types render BLANK.
6. **Image URL instructions** - Removed contradictory "leave empty" instruction. Now explicitly requires Unsplash URLs for all image fields with search suggestions.
7. **Service/city content HTML** - Added CRITICAL section with WRONG vs CORRECT examples showing plain text vs HTML. Content fields MUST be HTML formatted, not plain text.
8. **Homepage & Global SEO** - Added CRITICAL section for updating homepage SEO config (`src/app/(pages)/(home)/seo-config.json`) and global SEO config (`src/seo/seo.config.ts` siteName). These were being skipped entirely.

### Template Fixes (Test 11 continued)
9. **Tailwind Typography Plugin** - Installed `@tailwindcss/typography` and added to `tailwind.config.js`. The `prose` class had NO EFFECT because the plugin wasn't installed - bullet points and list styling were being stripped.
10. **ServiceContent.tsx** - Updated to use proper Tailwind Typography prose modifiers (`prose-gray`, `prose-headings:`, `prose-h3:`, `prose-li:`, `prose-strong:`).
11. **CityPageContent.tsx** - Applied same prose styling pattern as ServiceContent.
12. **globals.css fallback** - Added `.prose ul`, `.prose ol`, `.prose li`, `.prose h3` styles with `!important` as fallback for list bullet points and heading styling.
13. **Blog page heading/description** - Was hardcoded as "POOL CARE BLOG". Now reads from `site.config.json` `blog` section. Added `blog: { sectionBadge, sectionHeading, sectionDescription }` config structure.

## Admin Features
- `/admin` - Dashboard with navigation
- `/admin/blog` - Create/edit blog posts and categories via UI
- `/admin/redirects` - Manage URL redirects

## Color System
Tailwind CSS variables in site.config.json:
- `primary` - Main brand color (buttons, links)
- `backgroundBlue` - Dark sections (hero, footer, reviews)
- `premium` - Accent color
- `navBackground` - Navigation bar
- `badgeBg` / `badgeText` - Section badges

## Integration Points
- **GoHighLevel (GHL)**: Quote forms (inline/popup), chat widget
- **Featurable**: Reviews widget
- Google Business Profile / Reviews
- Social media links

## Git Workflow
- Main branch: `main`
- Commit format: Conventional commits with Claude co-author
- Before committing: Verify no .tsx changes unless fixing bugs
- Test in separate repo, commit fixes to main template

## Testing Process
1. Create test repo copy
2. Add client-intake/ folder with form and assets
3. Run intake processor with test prompt
4. Verify all 8 steps completed
5. Check build, rendered pages, dynamic content
6. Document issues, commit fixes to main template
7. Repeat with next test

## Common Commands
```bash
npm run dev          # Start dev server
npm run build        # Build production
git status           # Check changes
node -e "require('./site.config.json')"  # Validate JSON
```

## File-Specific Notes

### site.config.json
- ALWAYS REPLACE, never append to arrays
- Use empty strings for images if no URLs
- googleBusinessUrl ≠ googleReviewUrl (review URL has /review)
- Trust badges: max 3, use supported iconTypes only
- Service slugs: lowercase-hyphenated

### Components to NEVER modify via intake
- All .tsx files in src/
- Layout components
- Section components
- Page components
- Only modify for bug fixes or feature additions

### Assets
- Logos: Copy to public/logos/ exactly as: horizontal-logo.png, horizontal-logo-inverted.png, square-logo.png
- Favicons: Generate from square.png using Python/Pillow script
- Projects: Copy *.jpg to public/projects/, update config gallery array

## Known Limitations
- Blog requires manual category selection
- No automated image optimization
- Claude tends to skip steps without explicit instructions
- Need very specific bash commands, not general descriptions

## Image System

### Overview
Three-tier image system for website templates:
1. **Industry-specific static images** - Pre-curated per industry template (hero, about, backgrounds)
2. **Context-aware stock photos** - Pre-baked service images with search fallback
3. **Client-provided images** - Project photos, logos (copied from client-intake/)

### Folder Structure
```
templates/
  images/
    [industry]/           # e.g., hvac, pool-service, roofing
      hero.jpg
      about.jpg
      reviews-bg.jpg
      cta-bg.jpg
      services/
        [service-slug].jpg
      blog/
        [category]-1.jpg
  config/
    [industry].images.json  # Image mappings and metadata
```

### Freepik Integration
- API Key: Set as `FREEPIK_API_KEY` environment variable
- Cost: $0.002/search, $0.044/download
- Skills: `.claude/skills/freepik-image-curator.md`

### Scripts
```bash
# Search and download thumbnails for review
FREEPIK_API_KEY=key node scripts/freepik/search.js "HVAC technician" --landscape

# Download full-resolution selected images
FREEPIK_API_KEY=key node scripts/freepik/download.js 414646746 --output templates/images/hvac/hero.jpg
```

### Workflow
1. Search Freepik with relevant terms
2. Thumbnails saved to `.image-review/[search-term]/`
3. Claude visually reviews and recommends top picks
4. Human approves selections
5. Full-res images downloaded to `templates/images/[industry]/`
6. Config updated with freepikId and path

### Supported Industries (10)
- hvac
- pool-service
- roofing
- plumbing
- landscaping
- electrical
- painting
- pest-control
- cleaning
- fencing

## Next Steps After Test 11
- Review test results
- Document any new issues
- Update skills if patterns emerge
- Consider breaking into smaller agents if failure rate high
- Potentially add validation step
- Build out industry image libraries
