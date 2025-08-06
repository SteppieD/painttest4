'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Home, 
  Building, 
  Paintbrush, 
  ArrowLeft,
  Clock,
  DollarSign,
  TrendingUp,
  Layers,
  Target,
  BarChart3
} from 'lucide-react'
import { getCompanyFromLocalStorage } from '@/lib/auth/simple-auth'

interface ProjectData {
  totalProjects: number
  activeProjects: number
  completedProjects: number
  projectTypes: {
    type: string
    count: number
    revenue: number
    avgValue: number
    avgDuration: number
    winRate: number
    icon: 'home' | 'building' | 'paintbrush'
  }[]
  projectSizes: {
    size: string
    count: number
    percentage: number
  }[]
  avgProjectDuration: number
  mostProfitableType: string
  projectTrends: {
    month: string
    interior: number
    exterior: number
    commercial: number
  }[]
  surfaceBreakdown: {
    surface: string
    frequency: number
    avgRevenue: number
  }[]
}

export default function ProjectAnalyticsPage() {
  const router = useRouter()
  const [projectData, setProjectData] = useState<ProjectData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedType, setSelectedType] = useState<string | null>(null)

  useEffect(() => {
    const company = getCompanyFromLocalStorage()
    if (!company) {
      router.push('/access-code')
      return
    }
    fetchProjectData(company)
  }, [router])

  const fetchProjectData = async (company: any) => {
    try {
      const response = await fetch('/api/analytics/projects', {
        headers: {
          'x-company-data': JSON.stringify({
            id: company.id,
            access_code: company.access_code
          })
        }
      })

      if (response.ok) {
        const data = await response.json()
        setProjectData(data)
      }
    } catch (error) {
      console.error('Error fetching project data:', error)
      // Use mock data for now
      setProjectData({
        totalProjects: 245,
        activeProjects: 12,
        completedProjects: 233,
        projectTypes: [
          {
            type: 'Interior Residential',
            count: 142,
            revenue: 65000,
            avgValue: 2800,
            avgDuration: 3,
            winRate: 72,
            icon: 'home'
          },
          {
            type: 'Exterior Residential',
            count: 68,
            revenue: 45000,
            avgValue: 4200,
            avgDuration: 5,
            winRate: 65,
            icon: 'home'
          },
          {
            type: 'Commercial',
            count: 35,
            revenue: 85000,
            avgValue: 8500,
            avgDuration: 7,
            winRate: 58,
            icon: 'building'
          }
        ],
        projectSizes: [
          { size: 'Small (<1000 sqft)', count: 89, percentage: 36 },
          { size: 'Medium (1000-3000 sqft)', count: 108, percentage: 44 },
          { size: 'Large (>3000 sqft)', count: 48, percentage: 20 }
        ],
        avgProjectDuration: 4.5,
        mostProfitableType: 'Commercial',
        projectTrends: [
          { month: 'Jan', interior: 18, exterior: 8, commercial: 4 },
          { month: 'Feb', interior: 22, exterior: 10, commercial: 5 },
          { month: 'Mar', interior: 25, exterior: 14, commercial: 6 },
          { month: 'Apr', interior: 28, exterior: 16, commercial: 6 },
          { month: 'May', interior: 24, exterior: 12, commercial: 8 },
          { month: 'Jun', interior: 25, exterior: 8, commercial: 6 }
        ],
        surfaceBreakdown: [
          { surface: 'Walls', frequency: 98, avgRevenue: 2500 },
          { surface: 'Ceilings', frequency: 76, avgRevenue: 1800 },
          { surface: 'Trim', frequency: 54, avgRevenue: 800 },
          { surface: 'Doors', frequency: 42, avgRevenue: 400 },
          { surface: 'Exterior Siding', frequency: 35, avgRevenue: 4500 }
        ]
      })
    } finally {
      setLoading(false)
    }
  }

  const getIconComponent = (icon: string) => {
    switch (icon) {
      case 'home': return <Home className="h-5 w-5" />
      case 'building': return <Building className="h-5 w-5" />
      default: return <Paintbrush className="h-5 w-5" />
    }
  }

  if (loading || !projectData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Project Analytics</h1>
            <p className="text-gray-400">Analyze project types and performance</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-900/80 backdrop-blur border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Projects</CardTitle>
            <Layers className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{projectData.totalProjects}</div>
            <p className="text-xs text-green-400 mt-1">{projectData.activeProjects} active</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/80 backdrop-blur border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Avg Duration</CardTitle>
            <Clock className="h-4 w-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{projectData.avgProjectDuration} days</div>
            <p className="text-xs text-gray-400 mt-1">Project completion time</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/80 backdrop-blur border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Most Profitable</CardTitle>
            <DollarSign className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-white">{projectData.mostProfitableType}</div>
            <p className="text-xs text-gray-400 mt-1">Highest margin type</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/80 backdrop-blur border-white/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Completion Rate</CardTitle>
            <Target className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {Math.round((projectData.completedProjects / projectData.totalProjects) * 100)}%
            </div>
            <p className="text-xs text-gray-400 mt-1">{projectData.completedProjects} completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Project Types Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {projectData.projectTypes.map((type, index) => (
          <Card 
            key={index}
            className={`bg-gray-900/80 backdrop-blur border-white/10 cursor-pointer transition-all ${
              selectedType === type.type ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedType(type.type === selectedType ? null : type.type)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  {getIconComponent(type.icon)}
                  {type.type}
                </CardTitle>
                <span className="text-2xl font-bold text-green-400">
                  {type.count}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Revenue</span>
                <span className="text-white font-medium">${type.revenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Avg Value</span>
                <span className="text-white font-medium">${type.avgValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Avg Duration</span>
                <span className="text-white font-medium">{type.avgDuration} days</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Win Rate</span>
                <span className="text-green-400 font-medium">{type.winRate}%</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Project Trends */}
      <Card className="bg-gray-900/80 backdrop-blur border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Project Type Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 relative">
            <div className="absolute inset-0 flex items-end justify-between gap-2">
              {projectData.projectTrends.map((month, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex flex-col gap-1">
                    <div 
                      className="w-full bg-blue-500 rounded-t"
                      style={{ height: `${month.interior * 3}px` }}
                      title={`Interior: ${month.interior}`}
                    />
                    <div 
                      className="w-full bg-green-500"
                      style={{ height: `${month.exterior * 3}px` }}
                      title={`Exterior: ${month.exterior}`}
                    />
                    <div 
                      className="w-full bg-purple-500 rounded-b"
                      style={{ height: `${month.commercial * 3}px` }}
                      title={`Commercial: ${month.commercial}`}
                    />
                  </div>
                  <div className="text-xs text-gray-400 mt-2">{month.month}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-xs text-gray-400">Interior</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-xs text-gray-400">Exterior</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded"></div>
              <span className="text-xs text-gray-400">Commercial</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Sizes */}
        <Card className="bg-gray-900/80 backdrop-blur border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Project Size Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {projectData.projectSizes.map((size, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">{size.size}</span>
                  <span className="text-white font-medium">{size.count} ({size.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                    style={{ width: `${size.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Surface Breakdown */}
        <Card className="bg-gray-900/80 backdrop-blur border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Most Common Surfaces</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {projectData.surfaceBreakdown.map((surface, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
                  <div>
                    <div className="font-medium text-white">{surface.surface}</div>
                    <div className="text-sm text-gray-400">{surface.frequency}% of projects</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-400">${surface.avgRevenue.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">avg revenue</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}