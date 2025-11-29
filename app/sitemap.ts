import { MetadataRoute } from 'next';
import { prisma } from '@/lib/db';

const BASE_URL = 'https://mayiai.pl';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    '',
    '/o-nas',
    '/oferta',
    '/szkolenia',
    '/blog',
    '/kontakt',
    '/szkolenia/dzieci',
    '/szkolenia/nauczyciele',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  let blogRoutes: MetadataRoute.Sitemap = [];

  try {
    // Attempt to fetch blog posts if DB is available
    const posts = await prisma.blogPost.findMany({
      where: { isPublished: true },
      select: { slug: true, updatedAt: true },
    });

    blogRoutes = posts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Failed to fetch blog posts for sitemap:', error);
    // Continue with static routes only if DB fails
  }

  return [...staticRoutes, ...blogRoutes];
}
