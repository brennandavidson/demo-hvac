---
name: elite-content-generator
description: Create high-ranking SEO content for home service businesses - service pages, city pages, blog posts with proper HTML formatting
---

# Elite Content Generator

Create high-ranking, natural content for home service businesses.

Content types: service pages, service area pages, blog posts, FAQ.

Goals: Rank well, sound authentic, provide value, build trust.

## CRITICAL: Content Formatting

**NEVER write walls of text.** Every section MUST include:
- `<h3>` subheadings to break up content
- `<ul>` or `<ol>` lists every 2-3 paragraphs
- Short paragraphs (2-4 sentences max)

If a section has more than 3 consecutive `<p>` tags without a list or heading, it is WRONG.

## Process

### 1. Research (Required)

Industry research:
- WebSearch for: "[service] common problems", "[service] maintenance tips", "[service] cost factors"
- Look for Reddit threads, forums, real customer complaints

Local market research (for city pages):
- Search: "[city] [service] challenges", local regulations, climate-specific needs

Competitor analysis:
- Find top-ranking pages for similar services in the area
- Note what they cover and what they miss

### 2. Content Structure

Service pages (3-4 sections):
- What is [Service]? (clear explanation, real-world context, common variations)
- Why [Service] Matters / When You Need It (problems solved, consequences of neglect, warning signs)
- How [Service] Works / What to Expect (process overview, timeline, what homeowners need to know)
- Cost Factors / Making the Decision (optional: pricing factors, DIY vs professional, long-term value)

### 3. Writing Guidelines

Voice & tone:
- Industry expert educating homeowners
- Focus on "you" (the reader)
- Avoid business-specific claims (pricing, timelines, availability, experience)
- Mix sentence lengths, use contractions
- Conversational but authoritative

Punctuation:
- Never use em dashes (—) - use hyphens (-) or split sentences
- Use periods to end sentences

Avoid AI phrases:
- "Unlock the secrets", "In today's fast-paced world", "Whether you're...", "From X to Y, we've got you covered", "Rest assured that", "It's important to note that"

Use instead:
- Industry-standard numbers and timeframes
- Real scenarios and examples
- Direct, factual statements
- Industry-specific terminology (but explained)
- Local market references
- Honest limitations or challenges

Content depth:
- Each section: 200-400 words
- Include specific details: costs, timeframes, measurements
- Reference real problems and solutions
- Add local/seasonal considerations when relevant

### 4. SEO

Keywords:
- Primary: [Service] in [City]
- Secondary: [Problem] + [solution], [service] + [cost/pricing]
- Long-tail: [specific local problem] in [city]

Structure:
- Use headings naturally (not keyword-stuffed)
- Include city name 2-3 times naturally in service area pages
- Add semantic keywords

### 5. Quality Check

Verify:
- Researched current industry trends/problems
- Includes specific numbers, costs, or timeframes
- Contains local/regional considerations (if applicable)
- Avoids generic AI phrases and clichés
- Provides actionable information
- Sounds natural when read aloud
- Flows logically between sections
- Includes realistic scenarios or examples

## Content Type Guidelines

Service pages:
- 3-4 sections, 200-400 words each
- Focus on educating about the service generally
- Include industry standards and what to expect

Service area (city) pages:
- Include local elements: city-specific challenges, local regulations, neighborhood considerations
- Reference actual neighborhoods or landmarks (without being too specific)
- Discuss typical service availability in the area
- Note regional pricing factors
- Reference local climate, seasonal patterns, local lifestyle needs

Blog posts:
- 800-1500 words, more narrative and engaging
- How-to guides, problem-solving, seasonal advice, industry trends, cost breakdowns
- Target long-tail keywords and questions
- Answer "how to," "why," "when," "what is" queries
- Include local context when relevant, add internal links to service pages
- Can be slightly more conversational
- Use "I've seen" or "In my experience" sparingly
- Share industry knowledge and insider tips
- **Images**: Use `freepik-image-curator` skill to find and assign a featured image for each post. Check `templates/config/[industry].images.json` for suggested search terms by category.

## HTML Formatting (MANDATORY)

All content must be valid HTML with proper formatting for readability.

### Required Structure Per Section

Each section's `content` field MUST follow this pattern:
1. Opening paragraph (2-3 sentences)
2. `<h3>` subheading
3. `<ul>` or `<ol>` list (4-6 items)
4. Paragraph explaining the list
5. Another `<h3>` if section is long
6. More content as needed

### Correct Example:
```html
<p>Air conditioning repair addresses issues that prevent your AC system from cooling effectively. These problems range from simple thermostat malfunctions to complex compressor failures.</p>

<h3>Common AC Problems</h3>
<ul>
  <li>Refrigerant leaks causing poor cooling</li>
  <li>Frozen evaporator coils</li>
  <li>Faulty thermostats or sensors</li>
  <li>Clogged drain lines leading to water damage</li>
</ul>

<p>Each issue requires specific repair techniques. A trained technician can quickly identify the problem and recommend the best solution.</p>

<h3>When to Call a Professional</h3>
<p>Some signs indicate you need immediate help:</p>
<ul>
  <li>AC blowing warm air despite being set to cool</li>
  <li>Unusual noises like grinding or squealing</li>
  <li>Water pooling around your indoor unit</li>
  <li>Electric bills suddenly spiking</li>
</ul>

<p>Addressing these issues quickly prevents more expensive repairs down the road.</p>
```

### WRONG Example (wall of text):
```html
<p>Air conditioning repair is essential for maintaining comfort in your home. When your AC breaks down, it can be frustrating and uncomfortable, especially during hot summer months. Professional technicians have the training and tools needed to diagnose problems quickly.</p>

<p>There are many reasons why an AC might stop working properly. Refrigerant leaks are common and cause the system to blow warm air. Frozen coils happen when airflow is restricted. Electrical issues can prevent the system from turning on at all. Thermostat problems might cause incorrect temperature readings.</p>

<p>When you call for repair service, the technician will first inspect your system to find the root cause. They'll check refrigerant levels, inspect electrical connections, and test all components. Once they identify the problem, they'll explain your options and provide a quote for repairs.</p>
```

This is WRONG because it has 3 consecutive paragraphs with no lists or subheadings.

### Rules
- Never use `<h2>` (the `heading` field becomes H2 automatically)
- Use `<h3>` for sub-topics within sections (1-2 per section)
- Maximum 2-3 consecutive `<p>` tags before a list or heading
- Lists should have 4-6 items
- Paragraphs: 2-4 sentences max

### Word Counts
- Service pages: 600-1000 words (3-4 sections, 200-400 words each)
- Service area pages: 600-1000 words (3 sections, 200-400 words each)
- Blog posts: 1000-1500 words (more sections, deeper coverage)
