import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dolmios.com'
  
  const routes = [
    '',
    '/matchbooks',
  ].map((route) => ({
    changeFrequency: 'monthly' as const,
    lastModified: new Date(),
    priority: route === '' ? 1 : 0.8,
    url: `${baseUrl}${route}`,
  }))

  return routes
} 