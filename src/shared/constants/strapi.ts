// Strapi Configuration
export const STRAPI_CONFIG = {
  url: process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337',
  apiToken: process.env.STRAPI_API_TOKEN || '',
  // Content types
  contentTypes: {
    programs: 'programs',
    benefits: 'benefits',
    announcements: 'announcements',
    pages: 'pages',
    faqs: 'faqs',
  },
} as const;

export type StrapiContentType = keyof typeof STRAPI_CONFIG.contentTypes;
