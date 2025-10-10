import { STRAPI_CONFIG } from '@/shared/constants/strapi';

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiEntity {
  id: number;
  attributes: Record<string, any>;
  meta?: Record<string, any>;
}

class StrapiService {
  private baseUrl: string;
  private apiToken: string;

  constructor() {
    this.baseUrl = STRAPI_CONFIG.url;
    this.apiToken = STRAPI_CONFIG.apiToken;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<StrapiResponse<T>> {
    const url = `${this.baseUrl}/api/${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.apiToken) {
      headers.Authorization = `Bearer ${this.apiToken}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Generic methods for content types
  async find<T>(
    contentType: string,
    params: Record<string, any> = {}
  ): Promise<StrapiResponse<T[]>> {
    const searchParams = new URLSearchParams();
    
    // Add common parameters
    if (params.populate) {
      searchParams.append('populate', params.populate);
    }
    if (params.filters) {
      searchParams.append('filters', JSON.stringify(params.filters));
    }
    if (params.sort) {
      searchParams.append('sort', params.sort);
    }
    if (params.pagination) {
      searchParams.append('pagination', JSON.stringify(params.pagination));
    }

    const queryString = searchParams.toString();
    const endpoint = queryString ? `${contentType}?${queryString}` : contentType;

    return this.request<T[]>(endpoint);
  }

  async findOne<T>(
    contentType: string,
    id: number | string,
    params: Record<string, any> = {}
  ): Promise<StrapiResponse<T>> {
    const searchParams = new URLSearchParams();
    
    if (params.populate) {
      searchParams.append('populate', params.populate);
    }

    const queryString = searchParams.toString();
    const endpoint = queryString ? `${contentType}/${id}?${queryString}` : `${contentType}/${id}`;

    return this.request<T>(endpoint);
  }

  // Specific methods for your content types
  async getPrograms(params: Record<string, any> = {}) {
    return this.find(STRAPI_CONFIG.contentTypes.programs, {
      populate: '*',
      ...params,
    });
  }

  async getProgram(id: number | string) {
    return this.findOne(STRAPI_CONFIG.contentTypes.programs, id, {
      populate: '*',
    });
  }

  async getBenefits(params: Record<string, any> = {}) {
    return this.find(STRAPI_CONFIG.contentTypes.benefits, {
      populate: '*',
      ...params,
    });
  }

  async getAnnouncements(params: Record<string, any> = {}) {
    return this.find(STRAPI_CONFIG.contentTypes.announcements, {
      populate: '*',
      sort: 'createdAt:desc',
      ...params,
    });
  }

  async getPage(slug: string) {
    return this.find(STRAPI_CONFIG.contentTypes.pages, {
      filters: { slug },
      populate: '*',
    });
  }

  async getFAQs(params: Record<string, any> = {}) {
    return this.find(STRAPI_CONFIG.contentTypes.faqs, {
      populate: '*',
      sort: 'order:asc',
      ...params,
    });
  }
}

export const strapiService = new StrapiService();
