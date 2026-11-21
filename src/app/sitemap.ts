import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/data/site';
export const dynamic = 'force-static';
const routes: Array<[string, number, MetadataRoute.Sitemap[number]['changeFrequency']]> = [
  ['/', 1, 'weekly'],
  ['/food-menu/', 0.9, 'monthly'],
  ['/order-online/', 0.9, 'monthly'],
  ['/beer-menu/', 0.7, 'weekly'],
  ['/contact/', 0.8, 'monthly'],
  ['/about-us/', 0.6, 'yearly'],
  ['/faq/', 0.5, 'monthly'],
  ['/jobs/', 0.4, 'monthly'],
];
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map(([path, priority, changeFrequency]) => ({ url: `${SITE_URL}${path}`, lastModified: now, priority, changeFrequency }));
}
