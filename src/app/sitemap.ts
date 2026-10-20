import type { MetadataRoute } from 'next';
import siteData from '@/data/siteData.json';
import { SITE_URL } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/blogs`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact-us`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  const dynamicRoutes: MetadataRoute.Sitemap = (
    siteData.allPages as Array<{ slug?: string; pageType?: string }>
  )
    .filter((p) => p.slug && p.slug.trim() !== '')
    .map((p) => ({
      url: `${SITE_URL}/${p.slug}`,
      lastModified: currentDate,
      changeFrequency: p.pageType === 'blog' ? 'monthly' : 'weekly',
      priority: p.pageType === 'service' ? 0.9 : p.pageType === 'location' ? 0.8 : 0.7,
    }));

  return [...staticRoutes, ...dynamicRoutes];
}
