import { MetadataRoute } from 'next';

const baseUrl = process.env.BASE_URL ?? 'https://wooniepangi.site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
