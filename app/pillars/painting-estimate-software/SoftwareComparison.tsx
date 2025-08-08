'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, X, Star } from 'lucide-react'

interface SoftwareFeatures {
  quoteGeneration: boolean
  mobileApp: boolean
  cloudStorage: boolean
  teamCollaboration: boolean
  customerPortal: boolean
  analytics: boolean
  integrations: string
  support: string
}

interface SoftwareOption {
  name: string
  logo: string
  pricing: string
  rating: number
  reviews: number
  pros: string[]
  cons: string[]
  bestFor: string
  features: SoftwareFeatures
}

const softwareComparison: SoftwareOption[] = [
  {
    name: 'PaintQuote Pro',
    logo: '🎨',
    pricing: '$79-149/mo',
    rating: 4.9,
    reviews: 2847,
    pros: [
      'AI-powered quote generation',
      'Mobile-first design',
      'Unlimited quotes',
      'Real-time collaboration',
      'Advanced analytics'
    ],
    cons: [
      'Newer to market',
      'Limited integrations (growing)'
    ],
    bestFor: 'Modern contractors wanting cutting-edge tech',
    features: {
      quoteGeneration: true,
      mobileApp: true,
      cloudStorage: true,
      teamCollaboration: true,
      customerPortal: true,
      analytics: true,
      integrations: 'Growing',
      support: '24/7 Chat + Phone'
    }
  },
  {
    name: 'JobNimbus',
    logo: '📃',
    pricing: '$25-150/mo',
    rating: 4.3,
    reviews: 1562,
    pros: [
      'Comprehensive CRM',
      'Good integrations',
      'Established player',
      'Project management'
    ],
    cons: [
      'Steep learning curve',
      'Can be overwhelming',
      'Mobile app issues'
    ],
    bestFor: 'Larger companies needing full CRM',
    features: {
      quoteGeneration: true,
      mobileApp: true,
      cloudStorage: true,
      teamCollaboration: true,
      customerPortal: false,
      analytics: true,
      integrations: 'Extensive',
      support: 'Business hours'
    }
  },
  {
    name: 'PaintScout',
    logo: '🔍',
    pricing: '$99-299/mo',
    rating: 4.1,
    reviews: 892,
    pros: [
      'Industry-specific',
      'Good reporting',
      'Lead tracking'
    ],
    cons: [
      'Expensive',
      'Desktop-focused',
      'Limited mobile features'
    ],
    bestFor: 'Established painting companies',
    features: {
      quoteGeneration: true,
      mobileApp: false,
      cloudStorage: true,
      teamCollaboration: true,
      customerPortal: true,
      analytics: true,
      integrations: 'Limited',
      support: 'Email only'
    }
  }
]

export default function SoftwareComparison() {
  const [comparisonView, setComparisonView] = useState('features')

  return (
    <section className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">
          Best Painting Estimate Software Comparison 2025
        </h2>
        <p className="text-xl text-gray-600">
          See how PaintQuote Pro stacks up against other paint contractor apps
        </p>
      </div>

      <Tabs value={comparisonView} onValueChange={setComparisonView}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="features">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border p-3 text-left">Feature</th>
                  {softwareComparison.map((software) => (
                    <th key={software.name} className="border p-3 text-center">
                      <div className="text-2xl mb-1">{software.logo}</div>
                      <div className="font-bold">{software.name}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-3 font-medium">Quote Generation</td>
                  {softwareComparison.map((software) => (
                    <td key={software.name} className="border p-3 text-center">
                      {software.features.quoteGeneration ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="bg-gray-50">
                  <td className="border p-3 font-medium">Mobile App</td>
                  {softwareComparison.map((software) => (
                    <td key={software.name} className="border p-3 text-center">
                      {software.features.mobileApp ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-3 font-medium">Customer Portal</td>
                  {softwareComparison.map((software) => (
                    <td key={software.name} className="border p-3 text-center">
                      {software.features.customerPortal ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="bg-gray-50">
                  <td className="border p-3 font-medium">Support</td>
                  {softwareComparison.map((software) => (
                    <td key={software.name} className="border p-3 text-center text-sm">
                      {software.features.support}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="pricing">
          <div className="grid md:grid-cols-3 gap-6">
            {softwareComparison.map((software, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="text-3xl mb-2">{software.logo}</div>
                  <CardTitle>{software.name}</CardTitle>
                  <div className="text-2xl font-bold text-purple-600">
                    {software.pricing}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="font-semibold mb-2">Pros:</div>
                    <ul className="space-y-1">
                      {software.pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-4">
                    <div className="font-semibold mb-2">Cons:</div>
                    <ul className="space-y-1">
                      {software.cons.map((con, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <X className="h-4 w-4 text-red-500 mt-0.5" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="text-sm text-gray-600">
                      <strong>Best for:</strong> {software.bestFor}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reviews">
          <div className="grid md:grid-cols-3 gap-6">
            {softwareComparison.map((software, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="text-3xl mb-2">{software.logo}</div>
                  <CardTitle>{software.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(software.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-bold">{software.rating}</span>
                    <span className="text-gray-600">({software.reviews.toLocaleString()} reviews)</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>5 star</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: '65%' }}
                          />
                        </div>
                        <span>65%</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>4 star</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-400 h-2 rounded-full" 
                            style={{ width: '20%' }}
                          />
                        </div>
                        <span>20%</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>3 star</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-yellow-400 h-2 rounded-full" 
                            style={{ width: '10%' }}
                          />
                        </div>
                        <span>10%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}