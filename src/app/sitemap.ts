import { MetadataRoute } from 'next';

const rawBaseUrl = process.env.BASE_URL?.trim();
const baseUrl = (rawBaseUrl || 'https://wooniepangi.site').replace(/\/+$/, '');

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: baseUrl, lastModified },
    { url: `${baseUrl}/intro`, lastModified },
    { url: `${baseUrl}/files`, lastModified },
    { url: `${baseUrl}/games`, lastModified },
    { url: `${baseUrl}/ask`, lastModified },
    { url: `${baseUrl}/privacy`, lastModified },
    { url: `${baseUrl}/terms`, lastModified },
  ];
}
