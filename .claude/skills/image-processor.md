# Image Processor

Process all website images using Freepik API. This skill handles blog images, service area images, and project gallery images.

## Prerequisites

- Freepik API key: `FPSX36ed1e287eaac4fc8570e6b883c2997e`
- Industry template selected (from intake form)
- site.config.json already populated with content

## CRITICAL RULES

1. **NO IMAGE REUSE** - Every image must be unique. Track all used Freepik resource IDs.
2. **Always compress** - Run compress.js on every downloaded image
3. **Local paths only** - Save to public/, use paths like `/images/blog/post-slug.jpg`

---

## Step 1: Blog Images

For EACH blog post in `public/blog-content/categories/`:

1. Read the blog post JSON to get the topic/title

2. Search Freepik with SPECIFIC keywords for that post:
```bash
FREEPIK_API_KEY=FPSX36ed1e287eaac4fc8570e6b883c2997e node scripts/freepik/search.js "[specific topic keywords]" .image-review/blog/[post-slug] --limit 15
```

Example searches (be specific, not generic):
- "air filter replacement hvac" NOT "hvac"
- "smart thermostat modern home" NOT "thermostat"
- "ac unit summer heat" NOT "air conditioning"

3. Review thumbnails, select ONE that:
   - Matches the post topic
   - Has NOT been used elsewhere
   - Looks like a real photo (no obvious AI artifacts)

4. Download and compress:
```bash
FREEPIK_API_KEY=FPSX36ed1e287eaac4fc8570e6b883c2997e node scripts/freepik/download.js [resource-id]
mkdir -p public/images/blog
cp downloads/[resource-id].jpg public/images/blog/[post-slug].jpg
node scripts/freepik/compress.js public/images/blog/[post-slug].jpg
```

5. Update the blog post JSON:
```json
{
  "image": "/images/blog/[post-slug].jpg",
  "imageAlt": "[Descriptive alt text for the image]"
}
```

6. **Track the resource ID** - Do not use it again.

Repeat for ALL blog posts. Each must have a unique image.

---

## Step 2: Service Area Images

For EACH city in `site.config.json serviceAreas.cities`:

1. Search Freepik for city-specific imagery:
```bash
FREEPIK_API_KEY=FPSX36ed1e287eaac4fc8570e6b883c2997e node scripts/freepik/search.js "[City Name] [State] skyline downtown" .image-review/cities/[city-slug] --limit 10
```

2. **If city-specific image found** (skyline, landmarks, recognizable location):
```bash
FREEPIK_API_KEY=FPSX36ed1e287eaac4fc8570e6b883c2997e node scripts/freepik/download.js [resource-id]
mkdir -p public/images/cities
cp downloads/[resource-id].jpg public/images/cities/[city-slug].jpg
node scripts/freepik/compress.js public/images/cities/[city-slug].jpg
```

3. **If NO city-specific image found**, search for industry + residential:
```bash
FREEPIK_API_KEY=FPSX36ed1e287eaac4fc8570e6b883c2997e node scripts/freepik/search.js "[industry] service home residential" .image-review/cities/[city-slug]-fallback --limit 15
```
   - Select a DIFFERENT image for each city
   - Do NOT reuse the same fallback for multiple cities

4. Update site.config.json for each city:
```json
{
  "serviceAreas": {
    "details": {
      "[city-slug]": {
        "hero": {
          "backgroundImage": "/images/cities/[city-slug].jpg"
        }
      }
    }
  }
}
```

Repeat for ALL cities. Each must have a unique hero image.

---

## Step 3: Project Gallery Images

Check if client provided project photos:
```bash
ls client-intake/projects/
```

### If client photos exist:

1. Copy to public:
```bash
mkdir -p public/projects
cp client-intake/projects/*.jpg public/projects/
cp client-intake/projects/*.jpeg public/projects/ 2>/dev/null || true
cp client-intake/projects/*.png public/projects/ 2>/dev/null || true
```

2. Update site.config.json with correct field names:
```json
{
  "projects": {
    "gallery": [
      { "id": "project-1", "title": "Project Title", "imageSrc": "/projects/project-1.jpg", "alt": "Description" }
    ]
  }
}
```

⚠️ **CRITICAL:** Field is `imageSrc` NOT `src`. Each item needs: `id`, `title`, `imageSrc`, `alt`.

### If NO client photos:

**Do NOT use Freepik for projects.** Projects should only show real client work.

Set empty gallery and the projects section/page will be hidden:
```json
{
  "projects": {
    "gallery": []
  }
}
```

---

## Cleanup

After all images are processed:
```bash
rm -rf .image-review/
rm -rf downloads/
```

---

## Summary Checklist

Before finishing, verify:
- [ ] Every blog post has a unique image in `/images/blog/`
- [ ] Every service area city has a unique hero image in `/images/cities/`
- [ ] Projects gallery has client photos with correct `imageSrc` field (or empty if no client photos)
- [ ] All images compressed (should be <500KB each)
- [ ] No Unsplash URLs remain in site.config.json or blog posts
