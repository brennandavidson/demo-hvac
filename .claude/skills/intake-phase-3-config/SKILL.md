---
name: intake-phase-3-config
description: Phase 3 of client intake - Build site.config.json and copy assets
---

# Phase 3: Configuration & Assets

Build site.config.json with all data and copy client assets.

## Prerequisites

- Phase 1 & 2 complete
- `client-intake/form.md` for client data
- Content generated in Phase 2

## Step 6: Build site.config.json

Update site.config.json with all intake data and generated content.

### Image URL Rules

**Use placeholder paths.** Actual images are copied below and in Phase 4.

```json
{
  "heroBackgroundImage": "/images/template/hero-home.jpg",
  "reviewsSectionBackgroundImage": "/images/template/reviews-bg.jpg",
  "cta.backgroundImage": "/images/template/cta-bg.jpg",
  "projects.heroBackgroundImage": "/images/template/hero-projects.jpg"
}
```

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
    "heroDescription": "[generated in Phase 2]",
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

⚠️ Valid iconTypes ONLY: location, time, clock, star, shield, certificate, checkmark

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
        "imageSrc": "/images/template/services/[service-slug].jpg",
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
          "backgroundImage": "/images/template/services/[service-slug].jpg"
        },
        "sections": [
          { "heading": "[Generated]", "content": "[HTML from Phase 2]" }
        ]
      }
    }
  }
}
```

### Service Areas Section

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
          { "heading": "[Generated]", "content": "[HTML from Phase 2]" }
        ]
      }
    }
  }
}
```

### CRITICAL: Content Field HTML Formatting

ALL `content` fields MUST be valid HTML, not plain text.

❌ **WRONG:**
```json
{
  "heading": "What is AC Repair?",
  "content": "AC repair encompasses diagnosing and fixing problems..."
}
```

✅ **CORRECT:**
```json
{
  "heading": "What is AC Repair?",
  "content": "<p>AC repair encompasses diagnosing and fixing problems with your air conditioning system.</p><h3>Common AC Problems</h3><ul><li>Refrigerant leaks</li><li>Frozen evaporator coils</li></ul><p>Our licensed technicians diagnose problems accurately.</p>"
}
```

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
    "backgroundImage": "/images/template/cta-bg.jpg"
  }
}
```

### Blog Section

```json
{
  "blog": {
    "sectionBadge": "RESOURCES & INSIGHTS",
    "sectionHeading": "[BUSINESS TYPE] BLOG",
    "sectionDescription": "Expert advice, tips, and guides to help you [benefit]."
  }
}
```

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

### Projects Section (placeholder)

```json
{
  "projects": {
    "heroBackgroundImage": "/images/template/hero-projects.jpg",
    "gallery": []
  }
}
```

Phase 4 will populate gallery if client photos exist.

### About, Process, FAQ

Fill in based on generated content from Phase 2.

### Validate JSON

```bash
node -e "require('./site.config.json')"
```

Fix any syntax errors before proceeding.

## Step 7: Copy Assets

### Copy Logos

```bash
cp client-intake/logo/horizontal.png public/logos/horizontal-logo.png
cp client-intake/logo/horizontal-white.png public/logos/horizontal-logo-inverted.png
cp client-intake/logo/square.png public/logos/square-logo.png
```

### Generate Favicons

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

### Copy Template Images

Use the **Industry Template** value from intake form.

1. Check if template images exist:
```bash
ls templates/images/[industry]/
```

2. If they exist, copy ALL to public:
```bash
mkdir -p public/images/template
mkdir -p public/images/template/services

cp templates/images/[industry]/hero-home.jpg public/images/template/
cp templates/images/[industry]/hero-projects.jpg public/images/template/
cp templates/images/[industry]/reviews-bg.jpg public/images/template/
cp templates/images/[industry]/cta-bg.jpg public/images/template/
cp templates/images/[industry]/about-us.jpg public/images/template/
cp templates/images/[industry]/services/*.jpg public/images/template/services/
```

3. For service images, map client services to template images where slugs match.

### Process Client About Us Photo

Check if client provided a team photo:
```bash
ls client-intake/images/about-us.* 2>/dev/null
```

**If exists:**
```bash
mkdir -p public/images/client
cp client-intake/images/about-us.* public/images/client/
```

Update site.config.json:
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

**If NOT exists:** Use template image `/images/template/about-us.jpg`

## Phase Complete

After building config and copying assets, proceed to **intake-phase-4-images**.
