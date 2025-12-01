interface ContentSection {
  heading: string;
  content: string;
}

interface ServiceContentProps {
  sections: ContentSection[];
}

const proseStyles = `
  .service-prose h2,
  .service-prose h3,
  .service-prose h4,
  .service-prose h5,
  .service-prose h6 {
    font-family: var(--font-montserrat), 'Montserrat', sans-serif;
    font-weight: 700;
    color: #111827;
    font-style: normal;
    letter-spacing: -0.025em;
  }
  .service-prose h3 {
    font-size: 1.5rem;
    line-height: 1.3;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  .service-prose h4 {
    font-size: 1.25rem;
    line-height: 1.4;
    margin-top: 1.75rem;
    margin-bottom: 0.75rem;
  }
  .service-prose h5 {
    font-size: 1.125rem;
    line-height: 1.4;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
  }
  .service-prose ul {
    list-style-type: disc;
    padding-left: 1.5rem;
    margin: 1.5rem 0;
  }
  .service-prose ol {
    list-style-type: decimal;
    padding-left: 1.5rem;
    margin: 1.5rem 0;
  }
  .service-prose li {
    display: list-item;
    margin-bottom: 0.5rem;
  }
  .service-prose strong {
    font-weight: 700;
  }
`;

export default function ServiceContent({ sections }: ServiceContentProps) {
  return (
    <section className="bg-white py-16 sm:py-24">
      <style dangerouslySetInnerHTML={{ __html: proseStyles }} />
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {sections.map((section, index) => (
            <div key={index}>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
                {section.heading}
              </h2>
              <div
                className="service-prose prose prose-lg max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
