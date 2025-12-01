'use client';

import React, { useState } from 'react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { BlogCard } from '@/components/admin/blog/BlogCard';
import { BlogPost, BlogCategory } from '@/lib/blog/blog-types';
import { getBadgeColors } from '@/lib/colors';

interface BlogConfig {
  sectionBadge: string;
  sectionHeading: string;
  sectionDescription: string;
}

interface BlogPageClientProps {
  allPosts: BlogPost[];
  categories: BlogCategory[];
  blogConfig?: BlogConfig;
}

const POSTS_PER_PAGE = 9;

export default function BlogPageClient({ allPosts, categories, blogConfig }: BlogPageClientProps) {
  const badgeColors = getBadgeColors();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = selectedCategory
    ? allPosts.filter(post => post.category === selectedCategory)
    : allPosts;

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  // Scroll to top of content
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to page 1 when category changes
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    scrollToTop();
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    scrollToTop();
  };

  return (
    <PageWrapper className="!pt-36 sm:!pt-40 pb-16 sm:pb-20">
      {/* Page Header */}
      <div className="text-center mb-12">
        <div className="inline-block mb-4">
          <span
            className="inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider"
            style={{ backgroundColor: badgeColors.background, color: badgeColors.text }}
          >
            {blogConfig?.sectionBadge || 'RESOURCES & INSIGHTS'}
          </span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-background-blue mb-4">
          {blogConfig?.sectionHeading || 'OUR BLOG'}
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {blogConfig?.sectionDescription || 'Expert advice, tips, and guides to help you make informed decisions.'}
        </p>
      </div>

      {/* Category Filters */}
      {categories.length > 0 && (
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => handleCategoryChange(null)}
            className={`px-6 py-3 rounded-md font-heading font-bold uppercase text-sm transition-colors ${
              selectedCategory === null
                ? 'bg-primary text-white'
                : 'bg-background-blue text-white hover:bg-background-blue-dark'
            }`}
          >
            All Posts
          </button>
          {categories.map((category) => (
            <button
              key={category.slug}
              onClick={() => handleCategoryChange(category.slug)}
              className={`px-6 py-3 rounded-md font-heading font-bold uppercase text-sm transition-colors ${
                selectedCategory === category.slug
                  ? 'bg-primary text-white'
                  : 'bg-background-blue text-white hover:bg-background-blue-dark'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      )}

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <>
          <section>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {paginatedPosts.map((post) => (
                <BlogCard key={post.slug} post={post} categories={categories} />
              ))}
            </div>
          </section>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md font-heading font-bold uppercase text-sm transition-colors ${
                  currentPage === 1
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-background-blue text-white hover:bg-background-blue-dark'
                }`}
              >
                Previous
              </button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 rounded-md font-heading font-bold text-sm transition-colors ${
                      currentPage === page
                        ? 'bg-primary text-white'
                        : 'bg-background-blue text-white hover:bg-background-blue-dark'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-md font-heading font-bold uppercase text-sm transition-colors ${
                  currentPage === totalPages
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-background-blue text-white hover:bg-background-blue-dark'
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">
            No blog posts available in this category yet.
          </p>
        </div>
      )}
    </PageWrapper>
  );
}
