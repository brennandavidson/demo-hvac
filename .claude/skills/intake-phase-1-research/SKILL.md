---
name: intake-phase-1-research
description: Phase 1 of client intake - Read intake form and research competitors
---

# Phase 1: Research

Read the client intake form and research competitors. Save findings for Phase 2.

## Prerequisites

Required files:
- `client-intake/form.md` (completed intake form)
- `client-intake/logo/` (horizontal.png, horizontal-white.png, square.png)

## Step 1: Read Intake Form

Read `client-intake/form.md` and extract:
- Business name, tagline, contact info
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

**CRITICAL:** The Industry Template field determines which pre-curated images to use. Note this value.

If required fields are missing, stop and ask user to complete the form.

Check for logo files in `client-intake/logo/`. Warn if missing but continue.

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

## Save Research Findings

Create `.build-state/research.md` with your findings:

```bash
mkdir -p .build-state
```

Write a summary including:
- Industry template value
- Business name and location
- Services list
- Service areas list
- Key competitor insights
- Messaging themes to use

## Phase Complete

After saving research findings, proceed to **intake-phase-2-content**.
