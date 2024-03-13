import { MetadataRoute } from 'next'
 
export default function Robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: `${process.env.HOST_NAME}/sitemap.xml`,
  }
}
