import { MetadataRoute } from 'next';

const baseUrl = process.env.BASE_URL ?? 'https://woonipangi.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
