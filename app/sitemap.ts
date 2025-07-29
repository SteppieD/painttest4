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
  const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

  // Static pages with high priority
  const staticPages: SitemapEntry[] = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0
    },
    {
      url: `${baseUrl}/trial-signup`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9
    }
  ]

  // Pillar pages - highest priority content
  const pillarPages: SitemapEntry[] = [
    {
      url: `${baseUrl}/guides/how-to-quote-painting-jobs`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1.0
    },
    {
      url: `${baseUrl}/guides/painting-estimate-software`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1.0
    },
    {
      url: `${baseUrl}/guides/paint-calculator`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1.0
    },
    {
      url: `${baseUrl}/guides/painting-business-guide`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1.0
    }
  ]

  // Cluster pages for SEO pyramid
  const clusterPages: SitemapEntry[] = [
    // How to Quote cluster
    {
      url: `${baseUrl}/guides/interior-painting-quotes`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/guides/exterior-painting-quotes`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/guides/commercial-painting-quotes`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/guides/cabinet-painting-quotes`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/guides/paint-quantity-calculations`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/guides/labor-cost-estimation`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/guides/pricing-psychology`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/guides/quote-presentation-tips`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/guides/follow-up-strategies`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/guides/common-quoting-mistakes`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    // Paint Calculator cluster
    {
      url: `${baseUrl}/guides/paint-coverage-rates`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/guides/measurement-techniques`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8
    }
  ]

  // Marketing pages
  const marketingPages: SitemapEntry[] = [
    {
      url: `${baseUrl}/features`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7
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
    ...pillarPages,
    ...clusterPages,
    ...marketingPages,
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