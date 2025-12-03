# Client Intake Processor

Generate a complete website from client intake form.

## Your Role

You are filling out a pre-built template. The structure is fixed. You only:
1. Populate site.config.json with client data
2. Write blog posts and SEO content
3. Copy client assets (logos, project photos)
4. Apply brand colors

Do not modify any .tsx files or change the website structure.

## Execution Requirements

Complete every step in order. Do not skip steps. Do not ask permission to continue.

## Prerequisites

Required files:
- client-intake/form.md (completed)
- client-intake/logo/ (horizontal.png, horizontal-white.png, square.png)

Optional files:
- client-intake/projects/ (process all images if present)
- client-intake/images/about-us.jpg (or .png) - team photo to override stock image

## Process Steps

1. Read intake form
2. Research competitors (5-8 WebSearch + WebFetch calls)
3. Write all website copy (hero, about us, process, FAQ, etc.)
4. Generate SEO content using elite-content-generator skill (service pages, city pages, blog posts)
5. Generate SEO metadata files (.seo-config.json for all pages)
6. Build site.config.json with all data
7. Copy assets (logos, generate favicons)
8. **Run image-processor skill** (blog images, service area images, project images)
9. Test build

⚠️ **CRITICAL: Step 8 is MANDATORY.** You MUST run the `image-processor` skill to handle all images via Freepik API. Do NOT use Unsplash URLs. Do NOT skip this step.

---

## Step 1: Read Intake Form

Read client-intake/form.md and extract:
- Business name, tagline, contact
- **Industry Template** (hvac, pool-service, roofing, plumbing, electrical, landscaping, painting, pest-control, cleaning, fencing)
- Business type description
- Services (3-6)
- Service areas (3-8 cities)
- Years in business, certifications
- Social media links
- GHL quote form embed code
- GHL chat widget embed code
- Featurable widget ID
- Google Business Profile URL
- Google Review URL

**CRITICAL:** The Industry Template field determines which pre-curated images to use. Store this value - you'll need it in Step 7.

If required fields are missing, stop and ask user to complete the form.

Check for logo files (horizontal.png, horizontal-white.png, square.png) in client-intake/logo/. Warn if missing but continue.

---

## Step 2: Research Competitors

Find 3-5 competitor websites in the same industry and area. Use 5-8 total calls:

**2-3 WebSearch calls:**
- "best [business type] companies in [city]"
- "[business type] [city]"
- "top rated [business type] [state]"

Find real contractor websites, not directories (Yelp/HomeAdvisor).

**3-5 WebFetch calls:**
For each competitor site, WebFetch with prompt: "Analyze this [business type] website. What services do they highlight? What pain points do they address? What makes their messaging effective? What local factors do they mention? Extract key talking points and value propositions."

Document from research:
- Common services and how they're described
- Pain points and solutions
- Local/regional factors (climate, regulations)
- Value propositions and pricing approaches
- Technical terminology used

Use this research to inform all content generation.

---
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

Example lengths from reference:
- P1: "With over 15 years of expertise, our company specializes in providing exceptional installation, renovation, and maintenance services to homeowners and businesses in the local area." (180 chars)
- P2: "Known for our meticulous attention to detail and commitment to quality craftsmanship, we've built a reputation as a trusted name in the community. Our team of experienced professionals brings knowledge, skill, and dedication to every project." (242 chars)
- P3: "We take pride in delivering superior results that exceed expectations, while maintaining the highest standards of customer satisfaction and service excellence." (159 chars)

Do NOT write long backstories, detailed founder histories, or military/personal background narratives. Keep it brief and professional.

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

---

## Step 4: Generate SEO Content

Use the elite-content-generator skill for content quality. Write service page and city page content for site.config.json (Step 6), and blog posts as JSON files (below).

### CRITICAL: Content Formatting

Every section's `content` field MUST include:
- `<h3>` subheadings (1-2 per section)
- `<ul>` or `<ol>` lists (at least 1 per section)
- Short paragraphs (2-4 sentences)

**NO WALLS OF TEXT.** Never write more than 2-3 consecutive `<p>` tags without a list or subheading.

See elite-content-generator skill for correct/wrong examples.

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
  "image": "https://images.unsplash.com/photo-XXXXX?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  "imageAlt": "[Image description]",
  "featured": false,
  "content": "<h2>First Section Heading</h2><p>Opening paragraph...</p><h3>Subheading</h3><ul><li>Point 1</li><li>Point 2</li></ul><p>More content...</p>",
  "seo": {
    "title": "[60-char SEO title]",
    "description": "[155-char meta description]",
    "keywords": ["[keyword1]", "[keyword2]", "[keyword3]"]
  }
}
```

### Blog Post Requirements

**Images:** Leave `image` field as placeholder. The `image-processor` skill (Step 8) will handle all blog images via Freepik API.

```json
{
  "image": "/images/blog/[post-slug].jpg",
  "imageAlt": "[Descriptive alt text - write this now]"
}
```

**Content formatting:**
- Do NOT wrap content in `<article>` tags (BlogLayout handles styling)
- Start with `<h2>` for main sections
- Use `<h3>` for subsections
- Include `<ul>` or `<ol>` lists
- Use `<p>` for paragraphs
- Content is rendered as HTML, not escaped text

Use the elite-content-generator skill for blog content quality guidelines.

---

## Step 5: Generate SEO Metadata Files

Create/update SEO metadata files for ALL pages.

### CRITICAL: Homepage and Global SEO

**1. Update Homepage SEO** - `src/app/(pages)/(home)/seo-config.json`:
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

**2. Update Global SEO Config** - `src/seo/seo.config.ts`:
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

Example: `src/seo/pages/services/hvac-repair.seo-config.json`
```json
{
  "title": "HVAC Repair in Mesa, AZ | Ash Cooling & Heating",
  "description": "Fast, reliable HVAC repair in Mesa and the East Valley. Licensed technicians, same-day service, 12+ years experience. Call for emergency AC repair today.",
  "openGraph": {
    "title": "HVAC Repair in Mesa, AZ | Ash Cooling & Heating",
    "description": "Fast, reliable HVAC repair in Mesa and the East Valley. Licensed technicians, same-day service, 12+ years experience. Call for emergency AC repair today.",
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

---
## Step 6: Build site.config.json

Update site.config.json with all intake data and generated content.

### Image URL Rules

**Use placeholder paths during Step 6.** Actual images are copied in Step 7.

Set these placeholder values (will be updated in Step 7 after copying template images):

```json
{
  "heroBackgroundImage": "/images/template/hero-home.jpg",
  "reviewsSectionBackgroundImage": "/images/template/reviews-bg.jpg",
  "cta.backgroundImage": "/images/template/cta-bg.jpg",
  "projects.heroBackgroundImage": "/images/template/hero-projects.jpg",
  "service items imageSrc": "/images/template/services/[service-slug].jpg"
}
```

**Fallback for missing template images:** If the selected industry template doesn't have images yet, use Unsplash:
```
https://images.unsplash.com/photo-XXXXX?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80
```
Search: "[industry] professional", "[service type] work"

### SEO H1 Pattern
Generate seoH1 using: `{Service Type} in {City}, {State}`
- HVAC → "HVAC Services in Mesa, AZ"
- Pool Service → "Pool Services in Phoenix, AZ"

### Business Section
```json
{
  "business": {
    "name": "[from intake]",
    "seoH1": "[generated using pattern above]",
    "tagline": "[from intake or generate]",
    "primaryLocation": "[city, state]",
    "heroDescription": "[generated]",
    "heroBackgroundImage": "/images/template/hero-home.jpg",
    "reviewsSectionBackgroundImage": "/images/template/reviews-bg.jpg",
    "reviewBadges": {
      "google": { "enabled": true, "rating": 5, "reviewCount": "X+", "url": "[from intake]" },
      "facebook": { "enabled": true, "rating": 5, "reviewCount": "X+", "url": "[from intake]" }
    },
    "trustBadges": [
      { "iconType": "location", "title": "100% LOCAL" },
      { "iconType": "time", "title": "X+ YEARS EXPERIENCE" },
      { "iconType": "star", "title": "HIGH QUALITY" }
    ]
  }
}
```

⚠️ See "Trust Badges - CRITICAL" section in Step 3 for valid iconTypes. Invalid values render BLANK.

### Contact Section
```json
{
  "contact": {
    "phone": "[from intake]",
    "email": "[from intake]",
    "address": {
      "street": "[from intake]",
      "city": "[from intake]",
      "state": "[from intake]",
      "zip": "[from intake]"
    },
    "googleMapsEmbed": "[from intake]",
    "googleBusinessUrl": "[Google Business Profile URL from intake]",
    "googleReviewUrl": "[Google Review URL from intake - has /review at end]"
  }
}
```

Note: googleBusinessUrl and googleReviewUrl are different URLs.

### Services Section
Create slug from service name (lowercase, hyphens): "HVAC Repair" → "hvac-repair"

```json
{
  "services": {
    "sectionBadge": "WHAT WE ARE BEST AT",
    "sectionHeading": "OUR SERVICES",
    "items": [
      {
        "title": "[Service Name]",
        "slug": "[generated-slug]",
        "imageSrc": "[Unsplash URL]",
        "imageAlt": "[Service] services",
        "description": "[1-2 sentences]"
      }
    ],
    "details": {
      "[slug]": {
        "hero": {
          "title": "[Badge text]",
          "subtitle": "[Service] IN [City]",
          "description": "[2-3 sentences]",
          "backgroundImage": "[Unsplash URL]"
        },
        "sections": [
          { "heading": "[Generated]", "content": "[HTML from Step 4]" }
        ]
      }
    }
  }
}
```

### Service Areas Section

**Images:** Use placeholder paths. The `image-processor` skill (Step 8) will handle city images via Freepik API.

```json
{
  "serviceAreas": {
    "sectionBadge": "Where We Serve",
    "sectionHeading": "PROUDLY SERVING THESE AREAS",
    "ctaText": "Don't see your city listed? Give us a call! We may still be able to serve your area.",
    "cities": [
      { "name": "[City Name]", "slug": "[city-slug]" }
    ],
    "details": {
      "[city-slug]": {
        "hero": {
          "title": "[CITY] [PRIMARY SERVICE TYPE]",
          "subtitle": "[PRIMARY SERVICE TYPE] IN [CITY]",
          "backgroundImage": "/images/cities/[city-slug].jpg"
        },
        "sections": [
          { "heading": "[Generated]", "content": "[HTML from Step 4]" }
        ]
      }
    }
  }
}
```

### CRITICAL: Content Field HTML Formatting

ALL `content` fields in service details and service area details MUST be valid HTML, not plain text.

Each section content MUST include:
- 200-400 words minimum per section
- All text wrapped in `<p>` tags
- `<h3>` tags for sub-topics within the section (NOT h2)
- `<ul>` or `<ol>` lists to break up text every 2-3 paragraphs
- Alternating structure: paragraph → paragraph → list → paragraph

❌ **WRONG (plain text - will look broken):**
```json
{
  "heading": "What is AC Repair?",
  "content": "AC repair encompasses diagnosing and fixing problems with your air conditioning system to restore proper cooling function. This includes addressing issues like refrigerant leaks, compressor failures, and thermostat malfunctions."
}
```

✅ **CORRECT (HTML formatted):**
```json
{
  "heading": "What is AC Repair?",
  "content": "<p>AC repair encompasses diagnosing and fixing problems with your air conditioning system to restore proper cooling function. This includes addressing issues like refrigerant leaks, compressor failures, electrical problems, frozen coils, and thermostat malfunctions.</p><h3>Common AC Problems</h3><ul><li>Refrigerant leaks causing poor cooling performance</li><li>Frozen evaporator coils from restricted airflow</li><li>Faulty thermostats or temperature sensors</li><li>Clogged condensate drain lines</li></ul><p>In Arizona's extreme heat, a functioning AC isn't just about comfort - it's essential for your family's health and safety. Our licensed technicians diagnose problems accurately and repair them right the first time.</p>"
}
```

This applies to BOTH:
- `services.details.[slug].sections[].content`
- `serviceAreas.details.[slug].sections[].content`

The elite-content-generator skill specifies 600-1000 words total per service/city page (3-4 sections × 200-400 words each). Follow those guidelines.

### Branding Section
```json
{
  "branding": {
    "colors": {
      "primary": "[from intake: Primary Brand Color]",
      "primaryLight": "[lighten primary 15%]",
      "primaryDark": "[darken primary 15%]",
      "primaryHover": "[darken primary 15%]",
      "backgroundBlue": "[from intake: Dark Section Background OR Navigation Background]",
      "backgroundBlueLight": "[lighten 10%]",
      "backgroundBlueDark": "[darken 10%]",
      "premium": "[use primary or complementary]",
      "premiumLight": "[lighten 20%]",
      "premiumDark": "[darken 20%]",
      "navBackground": "[from intake: Navigation Background OR primary]",
      "navBorder": "[use primary]",
      "badgeBg": "[from intake: Section Badge Color OR navBackground]",
      "badgeText": "#ffffff",
      "badgeBgInverted": "#ffffff",
      "badgeTextInverted": "[badgeBg value]"
    },
    "logo": {
      "horizontal": "/logos/horizontal-logo.png",
      "horizontalInverted": "/logos/horizontal-logo-inverted.png"
    }
  }
}
```

### Footer Section
```json
{
  "footer": {
    "companyDescription": "[Generated]",
    "businessLinks": [
      { "label": "Home", "href": "/" },
      { "label": "Projects", "href": "/projects" },
      { "label": "Blog", "href": "/blog" },
      { "label": "Contact", "href": "/contact" },
      { "label": "Our Reviews", "href": "/reviews" },
      { "label": "Review Us", "href": "[Use contact.googleReviewUrl]" }
    ],
    "legalLinks": [
      { "label": "Privacy", "href": "/privacy" },
      { "label": "Terms", "href": "/terms-of-service" }
    ],
    "hours": {
      "monday": "[from intake]",
      "tuesday": "[from intake]",
      "wednesday": "[from intake]",
      "thursday": "[from intake]",
      "friday": "[from intake]",
      "saturday": "[from intake]",
      "sunday": "[from intake]"
    },
    "copyrightText": "All rights reserved."
  }
}
```

### CTA Section
```json
{
  "cta": {
    "heading": "READY TO TAKE THE NEXT STEP?",
    "subheading": "GET A FREE QUOTE TODAY!",
    "buttonText": "Get Free Quote",
    "backgroundImage": "[Unsplash URL]"
  }
}
```

ButtonText must always be "Get Free Quote" (opens quote modal).

### Blog Section
```json
{
  "blog": {
    "sectionBadge": "RESOURCES & INSIGHTS",
    "sectionHeading": "[BUSINESS TYPE] BLOG",
    "sectionDescription": "Expert advice, tips, and guides to help you [benefit related to business type]."
  }
}
```

Examples:
- HVAC: "HVAC TIPS & INSIGHTS", "Expert advice, tips, and guides to help you keep your home comfortable year-round."
- Pool Service: "POOL CARE BLOG", "Expert advice, maintenance tips, and guides to keep your pool in perfect condition."

### Social Section
```json
{
  "social": {
    "facebook": "[from intake]",
    "instagram": "[from intake]",
    "twitter": "[from intake]",
    "youtube": "[from intake]",
    "google": "[Google Business Profile URL - remove /review if present]",
    "yelp": "[from intake]"
  }
}
```

The social.google field must be the business profile URL without /review.

### Integrations Section
```json
{
  "integrations": {
    "ghl": {
      "quoteFormEmbedInline": "[from intake]",
      "quoteFormEmbedPopup": "[optional]",
      "chatWidgetEmbed": "[from intake]"
    },
    "featurable": {
      "widgetId": "[from intake]"
    }
  }
}
```

### About, Process, FAQ
Fill in based on generated content from Step 3 and intake form data.

### Validate JSON
After updating config, validate:
```bash
node -e "require('./site.config.json')"
```

Fix any syntax errors before proceeding.

---
## Step 7: Copy Assets

Copy logos, generate favicons, and process project photos.

### Copy Logos
```bash
cp client-intake/logo/horizontal.png public/logos/horizontal-logo.png
cp client-intake/logo/horizontal-white.png public/logos/horizontal-logo-inverted.png  
cp client-intake/logo/square.png public/logos/square-logo.png
```

### Generate Favicons
Use Python + Pillow to generate all favicon sizes from square.png:

```bash
python << 'PYTHON_EOF'
import os, sys
try:
    from PIL import Image
except ImportError:
    print("⚠ Pillow not installed. Install with: pip install Pillow")
    sys.exit(0)

square_logo_path = "client-intake/logo/square.png"
if not os.path.exists(square_logo_path):
    print("⚠ No square logo found")
    sys.exit(0)

os.makedirs("public/favicon", exist_ok=True)
img = Image.open(square_logo_path).convert('RGBA')

favicon_sizes = {
    "favicon-16x16.png": (16, 16),
    "favicon-32x32.png": (32, 32),
    "apple-touch-icon.png": (180, 180),
    "android-chrome-192x192.png": (192, 192),
    "android-chrome-512x512.png": (512, 512)
}

for filename, size in favicon_sizes.items():
    img.resize(size, Image.Resampling.LANCZOS).save(f"public/favicon/{filename}", "PNG")

ico_sizes = [(16, 16), (32, 32), (48, 48)]
ico_images = [img.resize(size, Image.Resampling.LANCZOS) for size in ico_sizes]
ico_images[0].save("public/favicon/favicon.ico", format="ICO", sizes=ico_sizes)
print("✓ Favicons generated")
PYTHON_EOF
```

If Pillow is not installed, inform user to install it or use online favicon generator.

### Process Template Images (CRITICAL)

Copy pre-curated images from the industry template. Use the **Industry Template** value from Step 1.

1. Check if template images exist for the selected industry:
```bash
ls templates/images/[industry]/
# Example: ls templates/images/hvac/
```

2. If template images exist, copy ALL of them to public:
```bash
mkdir -p public/images/template
mkdir -p public/images/template/services

# Copy main images
cp templates/images/[industry]/hero-home.jpg public/images/template/
cp templates/images/[industry]/hero-projects.jpg public/images/template/
cp templates/images/[industry]/reviews-bg.jpg public/images/template/
cp templates/images/[industry]/cta-bg.jpg public/images/template/
cp templates/images/[industry]/about-us.jpg public/images/template/

# Copy service images
cp templates/images/[industry]/services/*.jpg public/images/template/services/
```

3. Update site.config.json to use template image paths:
```json
{
  "business": {
    "heroBackgroundImage": "/images/template/hero-home.jpg",
    "reviewsSectionBackgroundImage": "/images/template/reviews-bg.jpg"
  },
  "cta": {
    "backgroundImage": "/images/template/cta-bg.jpg"
  },
  "projects": {
    "heroBackgroundImage": "/images/template/hero-projects.jpg"
  }
}
```

4. For service images, check `templates/config/[industry].images.json` for available service slugs. Map client services to template images:
   - If client service matches template slug → use template image
   - If no match → use Freepik (`freepik-image-curator` skill) or Unsplash fallback

Example service image mapping:
```json
{
  "services": {
    "items": [
      {
        "title": "AC Repair",
        "slug": "ac-repair",
        "imageSrc": "/images/template/services/ac-repair.jpg"
      }
    ]
  }
}
```

**If NO template images exist for the industry:** Fall back to Unsplash URLs (search for "[industry] professional", "[service] work", etc.)

### Process Client Images (About Us Photo)

Check if client provided a team/about-us photo:
```bash
ls client-intake/images/about-us.* 2>/dev/null
```

**If about-us.jpg or about-us.png EXISTS:**

1. Copy to public folder:
```bash
mkdir -p public/images/client
cp client-intake/images/about-us.* public/images/client/
```

2. In site.config.json, set `aboutUs.image.src` to the client image:
```json
{
  "aboutUs": {
    "image": {
      "src": "/images/client/about-us.jpg",
      "alt": "[Business Name] team"
    }
  }
}
```

**If NO about-us image exists:**

Use the industry template stock image (already copied in "Process Template Images" step):
```bash
# about-us.jpg was copied with other template images to public/images/template/
cp templates/images/[industry]/about-us.jpg public/images/template/
```

Then set in site.config.json:
```json
{
  "aboutUs": {
    "image": {
      "src": "/images/template/about-us.jpg",
      "alt": "Professional [industry] team"
    }
  }
}
```

### Process Project Photos

**Handled by `image-processor` skill (Step 8).**

Just set up placeholder structure in site.config.json:
```json
{
  "projects": {
    "heroBackgroundImage": "/images/template/hero-projects.jpg",
    "gallery": []
  }
}
```

The image-processor skill will:
- Copy client photos from `client-intake/projects/` if they exist
- Or download images via Freepik if no client photos
- Populate the gallery array with correct fields (`id`, `title`, `imageSrc`, `alt`)

---
## Step 8: Run Image Processor

⚠️ **DO NOT SKIP THIS STEP.**

Run the `image-processor` skill now. This handles:
- Blog post images (Freepik search per post topic)
- Service area city images (city-specific or industry fallback)
- Project gallery images (client photos or Freepik)

The image-processor skill will update:
- All blog post JSON files with actual image paths
- site.config.json serviceAreas details with city images
- site.config.json projects.gallery with project images

After running image-processor, continue to Step 9.

---
## Step 9: Test Build

Run build and verify key pages:

```bash
npm run build
```

Check for errors. Common issues: JSON syntax, missing required fields, invalid props.

If dev server is running, test key routes:
```bash
curl -s http://localhost:3000/ | head -100
curl -s http://localhost:3000/services/[first-service-slug] | head -100
curl -s http://localhost:3000/service-areas/[first-city-slug] | head -100
curl -s http://localhost:3000/blog | head -100
```

Verify:
- Homepage loads with correct business name
- All services appear in navigation
- Service and city pages load with generated content
- Blog shows new posts
- Contact form/chat widget embeds work
- Footer shows correct business info

Summarize to user what was created (X services, X city pages, X blog posts).

## Notes

- Always use the `elite-content-generator` skill for content quality
- Research is REQUIRED - don't skip Phase 2.1
- Keep business claims educational, not specific to this client
- Test thoroughly before marking complete
