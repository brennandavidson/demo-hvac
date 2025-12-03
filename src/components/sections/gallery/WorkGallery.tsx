import Link from 'next/link';
import Image from 'next/image';
import { getSiteConfigProjects } from '@/lib/get-site-config';

export default function WorkGallery() {
  const projectsConfig = getSiteConfigProjects();
  // Homepage preview: Show first 8 projects (full gallery available on /projects page)
  const projects = projectsConfig?.gallery?.slice(0, 8) || [];

  // Don't render section if there are no projects
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section className="bg-background-blue py-16 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <h2 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">SEE OUR WORK</h2>
            <Link
              href="/projects"
              className="font-heading inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-bold uppercase text-background-blue transition-colors hover:bg-gray-100"
            >
              <span>See All Photos</span>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative aspect-square overflow-hidden rounded-lg bg-gray-900 shadow-lg transition-transform hover:scale-105"
            >
              <Image
                src={project.imageSrc}
                alt={project.alt || project.title}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
