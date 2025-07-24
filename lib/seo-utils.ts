import { Metadata } from 'next'

export interface SEOData {
  title: string
  description: string
  keywords?: string
  canonical?: string
  ogImage?: string
  noindex?: boolean
  schema?: object
}

export interface PageData {
  product?: string
  benefit?: string
  brand?: string
  product1?: string
  product2?: string
  app1?: string
  app2?: string
  service?: string
  city?: string
  state?: string
  content?: string
  year?: number
  description?: string
  ogImage?: string
  noindex?: boolean
  canonical?: string
}

export class SEOGenerator {
  private brand = 'PaintQuote Pro'
  private baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://paintquotepro.com'

  generateMetadata(pageType: string, data: PageData): Metadata {
    const templates = {
      product: {
        title: `${data.product} - ${data.benefit} | ${this.brand}`,
        description: `${data.description || `Professional ${data.product} for painting contractors.`} Start your free trial today.`,
        keywords: `${data.product}, painting software, contractor tools, ${data.benefit}`
      },
      comparison: {
        title: `${data.product1} vs ${data.product2}: ${data.year || new Date().getFullYear()} Comparison | ${this.brand}`,
        description: `Compare ${data.product1} and ${data.product2}. Find out which is best for your painting business needs.`,
        keywords: `${data.product1} vs ${data.product2}, painting software comparison, contractor tools comparison`
      },
      integration: {
        title: `Connect ${data.app1} with ${data.app2} - ${data.benefit} | ${this.brand}`,
        description: `Integrate ${data.app1} and ${data.app2} in minutes. ${data.description || 'Streamline your painting business workflow.'}`,
        keywords: `${data.app1} ${data.app2} integration, painting software integration, contractor workflow`
      },
      location: {
        title: `${data.service} in ${data.city}, ${data.state} | ${this.brand}`,
        description: `Find the best ${data.service} in ${data.city}. ${data.content || `Professional painting contractors in ${data.city}, ${data.state}.`}`,
        keywords: `${data.service} ${data.city}, painting contractors ${data.city}, ${data.service} ${data.state}`
      },
      feature: {
        title: `${data.product} - ${data.benefit} Feature | ${this.brand}`,
        description: `${data.description || `Learn about ${data.product} and how it helps painting contractors.`} See how it works.`,
        keywords: `${data.product}, painting software features, contractor tools, ${data.benefit}`
      }
    }

    const template = templates[pageType as keyof typeof templates] || templates.product
    
    return {
      title: this.truncateTitle(template.title),
      description: this.truncateDescription(template.description),
      keywords: template.keywords,
      openGraph: {
        title: this.truncateTitle(template.title),
        description: this.truncateDescription(template.description),
        type: 'website',
        siteName: this.brand,
        images: data.ogImage ? [{
          url: data.ogImage,
          width: 1200,
          height: 630,
          alt: template.title
        }] : undefined
      },
      twitter: {
        card: 'summary_large_image',
        title: this.truncateTitle(template.title),
        description: this.truncateDescription(template.description),
        images: data.ogImage ? [data.ogImage] : undefined
      },
      robots: data.noindex ? 'noindex,nofollow' : 'index,follow',
      alternates: {
        canonical: data.canonical ? `${this.baseUrl}${data.canonical}` : undefined
      }
    }
  }

  private truncateTitle(title: string): string {
    return title.length > 60 ? title.substring(0, 57) + '...' : title
  }

  private truncateDescription(description: string): string {
    return description.length > 160 ? description.substring(0, 157) + '...' : description
  }

  generateSoftwareSchema(data: {
    name: string
    description: string
    category?: string
    operatingSystem?: string
    price?: string
    currency?: string
    ratingValue?: string
    reviewCount?: string
    features?: string[]
  }) {
    return {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": data.name,
      "description": data.description,
      "applicationCategory": data.category || "BusinessApplication",
      "operatingSystem": data.operatingSystem || "Web, iOS, Android",
      "offers": data.price ? {
        "@type": "Offer",
        "price": data.price,
        "priceCurrency": data.currency || "USD"
      } : undefined,
      "aggregateRating": (data.ratingValue && data.reviewCount) ? {
        "@type": "AggregateRating",
        "ratingValue": data.ratingValue,
        "reviewCount": data.reviewCount
      } : undefined,
      "featureList": data.features || []
    }
  }

  generateServiceSchema(data: {
    name: string
    description: string
    provider: string
    areaServed?: string
    category?: string
    url?: string
  }) {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": data.name,
      "description": data.description,
      "provider": {
        "@type": "Organization",
        "name": data.provider
      },
      "areaServed": data.areaServed ? {
        "@type": "Place",
        "name": data.areaServed
      } : undefined,
      "serviceType": data.category,
      "url": data.url
    }
  }

  generateOrganizationSchema(data: {
    name: string
    description: string
    url: string
    logo?: string
    sameAs?: string[]
    address?: {
      streetAddress: string
      addressLocality: string
      addressRegion: string
      postalCode: string
      addressCountry: string
    }
  }) {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": data.name,
      "description": data.description,
      "url": data.url,
      "logo": data.logo,
      "sameAs": data.sameAs || [],
      "address": data.address ? {
        "@type": "PostalAddress",
        ...data.address
      } : undefined
    }
  }
}

export const seoGenerator = new SEOGenerator()

// Utility functions for common SEO tasks
export function generateKeywords(primary: string, secondary: string[], location?: string): string {
  const keywords = [primary, ...secondary]
  if (location) {
    keywords.push(`${primary} ${location}`, `${secondary[0]} ${location}`)
  }
  return keywords.join(', ')
}

export function createCanonicalUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://paintquotepro.com'
  return `${baseUrl}${path}`
}

export function generateReadingTime(text: string): number {
  const wordsPerMinute = 200
  const words = text.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

// Topic cluster utilities
export class TopicCluster {
  pillarTopic: { slug: string; title: string }
  clusterPages: { slug: string; title: string; keywords: string[] }[]
  
  constructor(pillarTopic: { slug: string; title: string }) {
    this.pillarTopic = pillarTopic
    this.clusterPages = []
  }

  addClusterPage(page: { slug: string; title: string; keywords: string[] }) {
    this.clusterPages.push(page)
  }

  generateInternalLinks(currentPageSlug: string): { anchor: string; url: string }[] {
    const links: { anchor: string; url: string }[] = []

    // Always link to pillar from cluster pages
    if (currentPageSlug !== this.pillarTopic.slug) {
      links.push({
        anchor: this.pillarTopic.title,
        url: this.pillarTopic.slug
      })
    }

    // Link to related cluster pages
    if (currentPageSlug === this.pillarTopic.slug) {
      // From pillar, link to all cluster pages
      this.clusterPages.forEach(page => {
        links.push({
          anchor: page.title,
          url: page.slug
        })
      })
    } else {
      // From cluster pages, link to related clusters
      const currentPage = this.clusterPages.find(p => p.slug === currentPageSlug)
      if (currentPage) {
        this.clusterPages
          .filter(page => page.slug !== currentPageSlug)
          .filter(page => this.areRelated(currentPage, page))
          .forEach(page => {
            links.push({
              anchor: page.title,
              url: page.slug
            })
          })
      }
    }

    return links
  }

  private areRelated(page1: { keywords: string[] }, page2: { keywords: string[] }): boolean {
    // Simple keyword overlap check
    const overlap = page1.keywords.filter(keyword => 
      page2.keywords.some(k => k.toLowerCase().includes(keyword.toLowerCase()))
    )
    return overlap.length > 0
  }
}