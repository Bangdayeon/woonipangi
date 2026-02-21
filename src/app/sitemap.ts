import { MetadataRoute } from 'next';

const baseUrl = process.env.BASE_URL ?? 'https://woonipangi.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: baseUrl, lastModified },
    { url: `${baseUrl}/intro`, lastModified },
    { url: `${baseUrl}/files`, lastModified },
    { url: `${baseUrl}/ask`, lastModified },
    { url: `${baseUrl}/privacy`, lastModified },
    { url: `${baseUrl}/terms`, lastModified },
  ];
}
