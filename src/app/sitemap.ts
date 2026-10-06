import type { MetadataRoute } from 'next';
import siteData from '@/data/siteData.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lonestar-sr22-insurance-houston.vercel.app';

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
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
      lastModified: new Date(),
      changeFrequency: p.pageType === 'blog' ? 'monthly' : 'weekly',
      priority: p.pageType === 'service' ? 0.9 : p.pageType === 'location' ? 0.8 : 0.7,
    }));

  return [...staticRoutes, ...dynamicRoutes];
}
