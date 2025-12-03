// THIS IS REQUIRED FOR SEO CONFIG - DO NOT REMOVE
// Every page must have this metadata export to load its seo-config.json
import { generateStaticMetadata } from '@/lib/seo/generate-static-metadata';
export const metadata = generateStaticMetadata('projects');

// Import sections
import { redirect } from 'next/navigation';
import GalleryHero from '@/components/sections/gallery/GalleryHero';
import GalleryGrid from '@/components/sections/gallery/GalleryGrid';
import Reviews from '@/components/sections/testimonials/Reviews';
import OurProcess from '@/components/sections/process/OurProcess';
import ServiceAreas from '@/components/sections/service-areas/ServiceAreas';
import FinalCTA from '@/components/sections/cta/FinalCTA';
import { HeaderSetter } from '@/components/layout/HeaderSetter';
import { getSiteConfig } from '@/lib/get-site-config';

export default function GalleryPage() {
  const config = getSiteConfig();
  const projects = config.projects?.gallery || [];
  const heroBackgroundImage = config.projects?.heroBackgroundImage;

  // Redirect to homepage if no projects exist
  if (!projects || projects.length === 0) {
    redirect('/');
  }

  return (
    <>
      {/* Set header context - has hero image on this page */}
      <HeaderSetter hasHeroImage={true} />

      {/* Gallery Hero */}
      <GalleryHero backgroundImage={heroBackgroundImage} />

      {/* Gallery Grid */}
      <GalleryGrid images={projects} />

      {/* Reviews/Testimonials */}
      <Reviews />

      {/* Process Section */}
      <OurProcess />

      {/* Service Areas */}
      <ServiceAreas />

      {/* CTA Section */}
      <FinalCTA />
    </>
  );
}
