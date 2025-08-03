import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ModernNavigation from '@/components/modern-navigation'
import ModernFooter from '@/components/modern-footer'
import {
  Activity,
  CheckCircle,
  AlertCircle,
  XCircle,
  Clock,
  Globe,
  Server,
  Database,
  Shield,
  Zap,
  TrendingUp,
  Calendar,
  Bell,
  RefreshCw,
  BarChart3
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'System Status | PaintQuote Pro Service Health',
  description: 'Real-time system status and uptime monitoring for PaintQuote Pro. Check service health, recent incidents, and scheduled maintenance.',
  openGraph: {
    title: 'PaintQuote Pro System Status',
    description: 'Current operational status and service health',
    images: ['/og-status.png'],
  },
}

export default function StatusPage() {
  const currentStatus = 'operational' // In real app, this would be dynamic

  const services = [
    {
      name: 'Web Application',
      status: 'operational',
      uptime: '99.98%',
      responseTime: '124ms',
      icon: Globe
    },
    {
      name: 'API Services',
      status: 'operational',
      uptime: '99.95%',
      responseTime: '89ms',
      icon: Zap
    },
    {
      name: 'Database',
      status: 'operational',
      uptime: '99.99%',
      responseTime: '12ms',
      icon: Database
    },
    {
      name: 'AI Quote Engine',
      status: 'operational',
      uptime: '99.97%',
      responseTime: '342ms',
      icon: Activity
    },
    {
      name: 'Email Services',
      status: 'operational',
      uptime: '100%',
      responseTime: '1.2s',
      icon: Shield
    },
    {
      name: 'File Storage',
      status: 'operational',
      uptime: '100%',
      responseTime: '234ms',
      icon: Server
    }
  ]

  const recentIncidents = [
    {
      date: '2024-01-15',
      title: 'Scheduled Maintenance Completed',
      duration: '30 minutes',
      severity: 'low',
      description: 'Database optimization and security updates',
      resolved: true
    },
    {
      date: '2024-01-08',
      title: 'API Latency Issue',
      duration: '15 minutes',
      severity: 'medium',
      description: 'Increased response times on quote generation endpoints',
      resolved: true
    },
    {
      date: '2023-12-20',
      title: 'Login Service Disruption',
      duration: '45 minutes',
      severity: 'high',
      description: 'Authentication service experienced intermittent failures',
      resolved: true
    }
  ]

  const upcomingMaintenance = [
    {
      date: '2024-02-01',
      time: '2:00 AM - 3:00 AM EST',
      title: 'Security Updates',
      impact: 'No expected downtime',
      description: 'Rolling security patches with zero downtime deployment'
    },
    {
      date: '2024-02-15',
      time: '3:00 AM - 3:30 AM EST',
      title: 'Infrastructure Upgrade',
      impact: 'Possible brief interruptions',
      description: 'Server capacity expansion to improve performance'
    }
  ]

  const performanceMetrics = [
    { label: 'API Response Time', value: '89ms', target: '<100ms', status: 'good' },
    { label: 'Page Load Time', value: '1.2s', target: '<2s', status: 'good' },
    { label: 'Uptime (30 days)', value: '99.95%', target: '>99.9%', status: 'good' },
    { label: 'Error Rate', value: '0.02%', target: '<0.1%', status: 'good' }
  ]

  const getStatusColor = (_status: string) => {
    switch (_status) {
      case 'operational':
        return 'text-green-400'
      case 'degraded':
        return 'text-yellow-400'
      case 'partial':
        return 'text-orange-400'
      case 'major':
        return 'text-red-400'
      default:
        return 'text-gray-200'
    }
  }

  const getStatusIcon = (_status: string) => {
    switch (_status) {
      case 'operational':
        return CheckCircle
      case 'degraded':
        return AlertCircle
      case 'partial':
        return AlertCircle
      case 'major':
        return XCircle
      default:
        return Activity
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
      <ModernNavigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent" />
        
        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center">
            <Badge className={`mb-4 ${
              currentStatus === 'operational' 
                ? 'bg-green-500/20 text-green-300 border-green-500/30' 
                : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
            }`}>
              <Activity className="h-3 w-3 mr-1" />
              System Status
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {currentStatus === 'operational' ? (
                <>All Systems Operational</>
              ) : (
                <>System Status</>
              )}
            </h1>
            
            <p className="text-xl text-gray-100 max-w-3xl mx-auto mb-8">
              Current status of PaintQuote Pro services and infrastructure
            </p>

            <div className="flex items-center justify-center gap-6 text-base">
              <div className="flex items-center gap-2 text-gray-200">
                <Clock className="h-4 w-4" />
                <span>Last updated: Just now</span>
              </div>
              <div className="flex items-center gap-2 text-gray-200">
                <RefreshCw className="h-4 w-4" />
                <span>Auto-refreshes every 60s</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Status Grid */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Service Status
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const StatusIcon = getStatusIcon(service.status)
              return (
                <Card key={index} className="glass-card p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <service.icon className="h-6 w-6 text-blue-400" />
                      <h3 className="text-lg font-semibold text-white">{service.name}</h3>
                    </div>
                    <StatusIcon className={`h-5 w-5 ${getStatusColor(service.status)}`} />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-base">
                      <span className="text-gray-200">Status</span>
                      <span className={`font-medium capitalize ${getStatusColor(service.status)}`}>
                        {service.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-base">
                      <span className="text-gray-200">Uptime (90d)</span>
                      <span className="text-gray-100">{service.uptime}</span>
                    </div>
                    <div className="flex items-center justify-between text-base">
                      <span className="text-gray-200">Response Time</span>
                      <span className="text-gray-100">{service.responseTime}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-400 h-2 rounded-full"
                        style={{ width: service.uptime }}
                      />
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Performance Metrics
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {performanceMetrics.map((metric, index) => (
              <Card key={index} className="glass-card p-6 text-center">
                <BarChart3 className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                <div className="text-base text-gray-200 mb-2">{metric.label}</div>
                <Badge className={`${
                  metric.status === 'good' 
                    ? 'bg-green-500/20 text-green-300 border-green-500/30' 
                    : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                }`}>
                  Target: {metric.target}
                </Badge>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Incidents */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Recent Incidents
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {recentIncidents.map((incident, index) => (
              <Card key={index} className="glass-card p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className={`${
                        incident.severity === 'low' 
                          ? 'bg-gray-500/20 text-gray-100 border-gray-500/30'
                          : incident.severity === 'medium'
                          ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                          : 'bg-red-500/20 text-red-300 border-red-500/30'
                      }`}>
                        {incident.severity} severity
                      </Badge>
                      <span className="text-base text-gray-200">{incident.date}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{incident.title}</h3>
                    <p className="text-gray-200 mb-2">{incident.description}</p>
                    <div className="flex items-center gap-4 text-base">
                      <span className="text-gray-200">Duration: {incident.duration}</span>
                      {incident.resolved && (
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Resolved
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
              View Incident History
            </Button>
          </div>
        </div>
      </section>

      {/* Upcoming Maintenance */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Scheduled Maintenance
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {upcomingMaintenance.map((maintenance, index) => (
              <Card key={index} className="glass-card p-6">
                <div className="flex items-start gap-4">
                  <Calendar className="h-6 w-6 text-blue-400 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">{maintenance.title}</h3>
                    <div className="flex items-center gap-4 text-base text-gray-200 mb-3">
                      <span>{maintenance.date}</span>
                      <span>•</span>
                      <span>{maintenance.time}</span>
                    </div>
                    <p className="text-gray-100 mb-3">{maintenance.description}</p>
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                      Impact: {maintenance.impact}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md from-blue-500/10 to-purple-500/10 p-12 text-center">
            <Bell className="h-16 w-16 text-blue-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Get Status Updates
            </h2>
            <p className="text-xl text-gray-100 mb-8">
              Subscribe to receive notifications about system status changes
            </p>
            
            <div className="max-w-md mx-auto mb-8">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  Subscribe
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-center gap-6 text-base text-gray-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Instant notifications</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Unsubscribe anytime</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Historical Uptime */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Historical Uptime
            </h2>
            <p className="text-gray-100">Last 90 days</p>
          </div>

          <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md p-8">
            <div className="grid grid-cols-7 gap-2">
              {[...Array(90)].map((_, i) => (
                <div
                  key={i}
                  className="h-8 bg-green-500 rounded opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                  title={`Day ${i + 1}: 100% uptime`}
                />
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between text-base text-gray-200">
              <span>90 days ago</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded" />
                  <span>No issues</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded" />
                  <span>Minor issues</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded" />
                  <span>Major issues</span>
                </div>
              </div>
              <span>Today</span>
            </div>
          </Card>
        </div>
      </section>

      <ModernFooter />
    </div>
  )
}