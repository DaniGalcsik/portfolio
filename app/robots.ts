// App Router robots.ts — allow all crawlers and reference the sitemap
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/konami',
      },
    ],
    sitemap: 'https://danikovacs.dev/sitemap.xml',
  };
}
