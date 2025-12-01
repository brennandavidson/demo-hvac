// THIS IS REQUIRED FOR SEO CONFIG - DO NOT REMOVE
// Every page must have this metadata export to load its seo-config.json
import { generateStaticMetadata } from '@/lib/seo/generate-static-metadata';
export const metadata = generateStaticMetadata('blog');

import React from 'react';
import { loadBlogPosts, loadCategories } from '@/lib/blog/blog-utils';
import { HeaderSetter } from '@/components/layout/HeaderSetter';
import { getSiteConfigBlog } from '@/lib/get-site-config';
import BlogPageClient from './BlogPageClient';

// Blog page with pagination
export default async function BlogPage() {
  const [allPosts, categories] = await Promise.all([
    loadBlogPosts(),
    loadCategories(),
  ]);
  const blogConfig = getSiteConfigBlog();

  return (
    <>
      <HeaderSetter hasHeroImage={false} />
      <BlogPageClient allPosts={allPosts} categories={categories} blogConfig={blogConfig} />
    </>
  );
}