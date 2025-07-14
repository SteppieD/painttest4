import { MetadataRoute } from 'next'

interface SitemapEntry {
  url: string
  lastModified: Date
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://paintquotepro.com'
  const now = new Date()

  // Static pages with high priority
  const staticPages: SitemapEntry[] = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0
    },
    {
      url: `${baseUrl}/painting-contractors`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/painting-estimate-software`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/interior-painting-quote-calculator`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85
    },
    {
      url: `${baseUrl}/exterior-painting-estimate-calculator`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85
    }
  ]

  // Software category pages
  const softwarePages: SitemapEntry[] = [
    {
      url: `${baseUrl}/painting-estimating-software`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75
    },
    {
      url: `${baseUrl}/painting-business-software`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/paint-contractor-app`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75
    },
    {
      url: `${baseUrl}/commercial-painting-estimating-software`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/mobile-painting-estimate-app`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.65
    }
  ]

  // Calculator and tool pages
  const calculatorPages: SitemapEntry[] = [
    {
      url: `${baseUrl}/painting-estimate-calculator-free`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/house-painting-cost-calculator`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75
    },
    {
      url: `${baseUrl}/painting-estimate-calculator`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/house-painting-estimate-calculator`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.65
    }
  ]

  // Standard business pages
  const businessPages: SitemapEntry[] = [
    {
      url: `${baseUrl}/features`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6
    },
    {
      url: `${baseUrl}/case-studies`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6
    },
    {
      url: `${baseUrl}/help`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5
    }
  ]

  // Resource and content pages
  const resourcePages: SitemapEntry[] = [
    {
      url: `${baseUrl}/how-to-quote-painting-jobs`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6
    },
    {
      url: `${baseUrl}/painting-quote-templates`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.55
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/tutorials`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6
    }
  ]

  // Location-based pages (to be expanded)
  const locationPages: SitemapEntry[] = [
    {
      url: `${baseUrl}/locations`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6
    }
  ]

  // Integration and API pages
  const integrationPages: SitemapEntry[] = [
    {
      url: `${baseUrl}/integrations`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5
    },
    {
      url: `${baseUrl}/api`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4
    }
  ]

  // Authentication and user pages (lower priority)
  const userPages: SitemapEntry[] = [
    {
      url: `${baseUrl}/auth/signup`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3
    },
    {
      url: `${baseUrl}/auth/login`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3
    }
  ]

  // Legal pages
  const legalPages: SitemapEntry[] = [
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3
    }
  ]

  // Combine all pages
  const allPages = [
    ...staticPages,
    ...softwarePages,
    ...calculatorPages,
    ...businessPages,
    ...resourcePages,
    ...locationPages,
    ...integrationPages,
    ...userPages,
    ...legalPages
  ]

  return allPages.map(page => ({
    url: page.url,
    lastModified: page.lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority
  }))
}

// Generate dynamic sitemaps for programmatic SEO
export async function generateProgrammaticSitemap(): Promise<SitemapEntry[]> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://paintquotepro.com'
  const now = new Date()
  const pages: SitemapEntry[] = []

  // Major US cities for location-based pages
  const cities = [
    { name: 'New York', state: 'NY' },
    { name: 'Los Angeles', state: 'CA' },
    { name: 'Chicago', state: 'IL' },
    { name: 'Houston', state: 'TX' },
    { name: 'Phoenix', state: 'AZ' },
    { name: 'Philadelphia', state: 'PA' },
    { name: 'San Antonio', state: 'TX' },
    { name: 'San Diego', state: 'CA' },
    { name: 'Dallas', state: 'TX' },
    { name: 'San Jose', state: 'CA' }
  ]

  // Generate location-based pages
  cities.forEach(city => {
    const citySlug = city.name.toLowerCase().replace(/\s+/g, '-')
    const stateSlug = city.state.toLowerCase()
    
    pages.push({
      url: `${baseUrl}/painting-contractors/${stateSlug}/${citySlug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5
    })
  })

  // Generate comparison pages
  const competitors = [
    'contractor-foreman',
    'jobber',
    'housecall-pro',
    'servicetitan',
    'jobprogress'
  ]

  competitors.forEach(competitor => {
    pages.push({
      url: `${baseUrl}/vs/${competitor}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6
    })
  })

  // Generate integration pages
  const integrations = [
    'quickbooks',
    'stripe',
    'google-calendar',
    'zapier',
    'slack'
  ]

  integrations.forEach(integration => {
    pages.push({
      url: `${baseUrl}/integrations/${integration}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4
    })
  })

  return pages
}