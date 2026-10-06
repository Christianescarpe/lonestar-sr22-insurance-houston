import type { MetadataRoute } from 'next';
import siteData from '@/data/siteData.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '') ||
    'https://sr22insurancehoustontx.site'
  ).replace(/\/+$/, '');

  const currentDate = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  const dynamicRoutes: MetadataRoute.Sitemap = (
    siteData.allPages as Array<{ slug?: string; pageType?: string }>
  )
    .filter((p) => p.slug && p.slug.trim() !== '')
    .map((p) => ({
      url: `${baseUrl}/${p.slug}`,
      lastModified: currentDate,
      changeFrequency: p.pageType === 'blog' ? 'monthly' : 'weekly',
      priority: p.pageType === 'service' ? 0.9 : p.pageType === 'location' ? 0.8 : 0.7,
    }));

  return [...staticRoutes, ...dynamicRoutes];
}
