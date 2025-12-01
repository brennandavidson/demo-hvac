'use client';

import QuoteButton from '@/components/ui/QuoteButton';
import { getBadgeColors, getBrandSectionBg } from '@/lib/colors';

interface ContentSection {
  heading: string;
  content: string;
}

interface CityPageContentProps {
  cityName: string;
  heroTitle: string;
  heroSubtitle: string;
  sections: ContentSection[];
  backgroundImage?: string;
}

const proseStyles = `
  .city-prose h2,
  .city-prose h3,
  .city-prose h4,
  .city-prose h5,
  .city-prose h6 {
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-weight: 700;
    color: #111827;
    font-style: normal;
    letter-spacing: -0.025em;
  }
  .city-prose h3 {
    font-size: 1.5rem;
    line-height: 1.3;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  .city-prose h4 {
    font-size: 1.25rem;
    line-height: 1.4;
    margin-top: 1.75rem;
    margin-bottom: 0.75rem;
  }
  .city-prose h5 {
    font-size: 1.125rem;
    line-height: 1.4;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
  }
  .city-prose ul {
    list-style-type: disc;
    padding-left: 1.5rem;
    margin: 1.5rem 0;
  }
  .city-prose ol {
    list-style-type: decimal;
    padding-left: 1.5rem;
    margin: 1.5rem 0;
  }
  .city-prose li {
    display: list-item;
    margin-bottom: 0.5rem;
  }
  .city-prose strong {
    font-weight: 700;
  }
`;

export default function CityPageContent({
  cityName,
  heroTitle,
  heroSubtitle,
  sections,
  backgroundImage = 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
}: CityPageContentProps) {
  const badgeColors = getBadgeColors();
  const brandBg = getBrandSectionBg();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: proseStyles }} />
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden" style={{ backgroundColor: brandBg }}>
        <div
          className="absolute inset-0 z-0 opacity-40"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <div className="relative z-10 mx-auto max-w-4xl text-center px-4 sm:px-6 lg:px-8 py-32">
          <div className="inline-block mb-6">
            <span
              className="inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{ backgroundColor: badgeColors.background, color: badgeColors.text }}
            >
              {heroTitle}
            </span>
          </div>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl mb-8 uppercase">
            {heroSubtitle}
          </h1>
          <QuoteButton variant="hero" />
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {sections.map((section, index) => (
            <div key={index} className={index < sections.length - 1 ? "mb-12" : ""}>
              <h2 className="font-heading text-3xl font-bold text-gray-900 mb-6">
                {section.heading}
              </h2>
              <div
                className="city-prose prose prose-lg max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
