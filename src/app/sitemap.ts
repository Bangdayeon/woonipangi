import { quizzes } from '@/data/quizzes';
import { MetadataRoute } from 'next';

const rawBaseUrl = process.env.BASE_URL?.trim();
const baseUrl = (rawBaseUrl || 'https://wooniepangi.site').replace(/\/+$/, '');

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const quizUrls = quizzes.flatMap(quiz => [
    { url: `${baseUrl}/games/${quiz.id}`, lastModified },
    ...quiz.results.map(result => ({
      url: `${baseUrl}/games/${quiz.id}/result/${result.id}`,
      lastModified,
    })),
  ]);

  return [
    { url: baseUrl, lastModified },
    { url: `${baseUrl}/intro`, lastModified },
    { url: `${baseUrl}/files`, lastModified },
    { url: `${baseUrl}/games`, lastModified },
    { url: `${baseUrl}/games/pangs-conch`, lastModified },
    { url: `${baseUrl}/games/bab`, lastModified },
    ...quizUrls,
    { url: `${baseUrl}/ask`, lastModified },
    { url: `${baseUrl}/privacy`, lastModified },
    { url: `${baseUrl}/terms`, lastModified },
  ];
}
