import { Metadata } from 'next'
import Link from 'next/link'
import SharedNavigation from '@/components/shared-navigation'
import { 
  Calculator, 
  Clock, 
  FileText, 
  Users, 
  Smartphone, 
  Cloud, 
  Shield, 
  TrendingUp,
  Palette,
  DollarSign,
  CheckCircle,
  Zap,
  BarChart,
  Mail,
  Camera,
  Globe,
  Briefcase,
  MessageSquare,
  Database,
  Settings
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Features | PaintQuote Pro - Professional Painting Estimating Software',
  description: 'Explore all features of PaintQuote Pro: AI-powered quotes, paint calculators, customer management, mobile app, and more. Everything you need to grow your painting business.',
  keywords: 'painting software features, paint calculator, estimating features, contractor tools, painting business management',
  openGraph: {
    title: 'PaintQuote Pro Features - Complete Painting Business Solution',
    description: 'All-in-one painting estimating software with AI quotes, calculators, CRM, mobile app, and more.',
    type: 'website',
  }
}

const featureCategories = [
  {
    title: 'Quote Creation & Estimation',
    description: 'Create professional quotes in minutes, not hours',
    features: [
      {
        icon: Calculator,
        title: 'Advanced Paint Calculators',
        description: 'Accurate paint quantity calculations for walls, ceilings, trim, and specialty surfaces'
      },
      {
        icon: Zap,
        title: 'AI-Powered Quote Generation',
        description: 'Generate complete quotes in 10-15 minutes with intelligent suggestions'
      },
      {
        icon: FileText,
        title: 'Professional Templates',
        description: 'Pre-built templates for residential, commercial, interior, and exterior projects'
      },
      {
        icon: DollarSign,
        title: 'Smart Pricing Engine',
        description: 'Automatic material costs, labor calculations, and profit margin optimization'
      }
    ]
  },
  {
    title: 'Business Management',
    description: 'Streamline your entire painting business operations',
    features: [
      {
        icon: Users,
        title: 'Customer Relationship Management',
        description: 'Track leads, customers, project history, and follow-ups in one place'
      },
      {
        icon: BarChart,
        title: 'Business Analytics Dashboard',
        description: 'Real-time insights on quotes, conversions, revenue, and team performance'
      },
      {
        icon: Briefcase,
        title: 'Project Management',
        description: 'Track job progress, scheduling, crew assignments, and completion status'
      },
      {
        icon: Database,
        title: 'Paint Product Database',
        description: 'Pre-loaded database of major paint brands with updated pricing'
      }
    ]
  },
  {
    title: 'Mobile & Field Tools',
    description: 'Work efficiently from anywhere',
    features: [
      {
        icon: Smartphone,
        title: 'Mobile App Access',
        description: 'Create and edit quotes on-site with iOS and Android apps'
      },
      {
        icon: Camera,
        title: 'Photo Documentation',
        description: 'Capture and attach project photos directly to quotes'
      },
      {
        icon: Globe,
        title: 'Offline Mode',
        description: 'Work without internet and sync when connected'
      },
      {
        icon: Cloud,
        title: 'Cloud Sync',
        description: 'Access your data from any device, anywhere, anytime'
      }
    ]
  },
  {
    title: 'Professional Output',
    description: 'Impress clients with polished presentations',
    features: [
      {
        icon: FileText,
        title: 'Branded Proposals',
        description: 'Customizable quote templates with your logo and branding'
      },
      {
        icon: Mail,
        title: 'Email Delivery',
        description: 'Send professional quotes directly to clients with tracking'
      },
      {
        icon: CheckCircle,
        title: 'Digital Signatures',
        description: 'Get quotes approved instantly with e-signature integration'
      },
      {
        icon: MessageSquare,
        title: 'Client Portal',
        description: 'Let clients view, approve, and communicate about quotes online'
      }
    ]
  },
  {
    title: 'Advanced Features',
    description: 'Power tools for growing businesses',
    features: [
      {
        icon: TrendingUp,
        title: 'Multi-Location Support',
        description: 'Manage multiple crews and locations from one account'
      },
      {
        icon: Shield,
        title: 'Team Permissions',
        description: 'Control access levels for estimators, sales reps, and admins'
      },
      {
        icon: Settings,
        title: 'Custom Workflows',
        description: 'Tailor the software to match your business processes'
      },
      {
        icon: Palette,
        title: 'Color Matching Tools',
        description: 'Advanced color selection and visualization features'
      }
    ]
  }
]

const comparisonData = {
  traditional: {
    title: 'Traditional Estimating',
    timePerQuote: '3-6 hours',
    accuracy: '70-80%',
    professionalLook: 'Basic',
    mobileAccess: 'No',
    followUp: 'Manual',
    costTracking: 'Spreadsheets'
  },
  paintquotepro: {
    title: 'With PaintQuote Pro',
    timePerQuote: '10-15 minutes',
    accuracy: '95%+',
    professionalLook: 'Premium',
    mobileAccess: 'Full mobile app',
    followUp: 'Automated',
    costTracking: 'Real-time analytics'
  }
}

export default function FeaturesPage() {
  return (
    <>
      <SharedNavigation />
      
      <main className="pt-14">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-muted/50 to-background py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Everything You Need to Run a 
                <span className="text-primary"> Successful Painting Business</span>
              </h1>
              <p className="mt-6 text-xl text-muted-foreground">
                From quick estimates to complete business management, PaintQuote Pro has 
                all the tools professional painting contractors need to win more jobs and 
                increase profits.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-lg hover:bg-primary/90"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Start Free Trial
                </Link>
                <Link
                  href="/paint-quote-calculator"
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  <Calculator className="mr-2 h-5 w-5" />
                  Try Free Calculator
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Categories */}
        {featureCategories.map((category, categoryIndex) => (
          <section key={categoryIndex} className={`py-16 md:py-24 ${categoryIndex % 2 === 1 ? 'bg-muted/30' : ''}`}>
            <div className="container">
              <div className="mx-auto max-w-6xl">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    {category.title}
                  </h2>
                  <p className="mt-4 text-lg text-muted-foreground">
                    {category.description}
                  </p>
                </div>
                
                <div className="grid gap-8 md:grid-cols-2">
                  {category.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="rounded-lg border bg-background p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <feature.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                          <p className="text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Comparison Section */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container">
            <div className="mx-auto max-w-5xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  See the Difference
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Compare traditional estimating methods with PaintQuote Pro
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                {/* Traditional Method */}
                <div className="rounded-lg border bg-background p-8">
                  <h3 className="text-xl font-bold mb-6">{comparisonData.traditional.title}</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-muted-foreground">Time per quote</span>
                      <span className="font-medium text-destructive">{comparisonData.traditional.timePerQuote}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-muted-foreground">Accuracy</span>
                      <span className="font-medium">{comparisonData.traditional.accuracy}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-muted-foreground">Professional look</span>
                      <span className="font-medium">{comparisonData.traditional.professionalLook}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-muted-foreground">Mobile access</span>
                      <span className="font-medium">{comparisonData.traditional.mobileAccess}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-muted-foreground">Follow-up</span>
                      <span className="font-medium">{comparisonData.traditional.followUp}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground">Cost tracking</span>
                      <span className="font-medium">{comparisonData.traditional.costTracking}</span>
                    </div>
                  </div>
                </div>

                {/* PaintQuote Pro */}
                <div className="rounded-lg border-2 border-primary bg-primary/5 p-8">
                  <h3 className="text-xl font-bold mb-6 text-primary">{comparisonData.paintquotepro.title}</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-muted-foreground">Time per quote</span>
                      <span className="font-medium text-primary">{comparisonData.paintquotepro.timePerQuote}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-muted-foreground">Accuracy</span>
                      <span className="font-medium text-primary">{comparisonData.paintquotepro.accuracy}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-muted-foreground">Professional look</span>
                      <span className="font-medium text-primary">{comparisonData.paintquotepro.professionalLook}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-muted-foreground">Mobile access</span>
                      <span className="font-medium text-primary">{comparisonData.paintquotepro.mobileAccess}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-muted-foreground">Follow-up</span>
                      <span className="font-medium text-primary">{comparisonData.paintquotepro.followUp}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground">Cost tracking</span>
                      <span className="font-medium text-primary">{comparisonData.paintquotepro.costTracking}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Integration Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-5xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Integrations & Compatibility
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Works seamlessly with your existing tools
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-lg border bg-background p-6 text-center">
                  <h3 className="font-semibold mb-2">QuickBooks Integration</h3>
                  <p className="text-sm text-muted-foreground">Sync invoices and payments</p>
                </div>
                <div className="rounded-lg border bg-background p-6 text-center">
                  <h3 className="font-semibold mb-2">Google Calendar Sync</h3>
                  <p className="text-sm text-muted-foreground">Schedule jobs and appointments</p>
                </div>
                <div className="rounded-lg border bg-background p-6 text-center">
                  <h3 className="font-semibold mb-2">Email Marketing Tools</h3>
                  <p className="text-sm text-muted-foreground">Automated follow-up campaigns</p>
                </div>
                <div className="rounded-lg border bg-background p-6 text-center">
                  <h3 className="font-semibold mb-2">Payment Processing</h3>
                  <p className="text-sm text-muted-foreground">Accept payments online</p>
                </div>
                <div className="rounded-lg border bg-background p-6 text-center">
                  <h3 className="font-semibold mb-2">Cloud Storage</h3>
                  <p className="text-sm text-muted-foreground">Backup to Google Drive or Dropbox</p>
                </div>
                <div className="rounded-lg border bg-background p-6 text-center">
                  <h3 className="font-semibold mb-2">API Access</h3>
                  <p className="text-sm text-muted-foreground">Build custom integrations</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-16 text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Painting Business?
            </h2>
            <p className="mx-auto max-w-2xl text-xl opacity-90 mb-8">
              Join thousands of painting contractors who save hours on every quote 
              and win more jobs with professional estimates.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center rounded-md bg-background px-8 py-3 text-base font-medium text-foreground shadow-lg hover:bg-background/90"
              >
                Start Your Free Trial
                <Zap className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-md border border-primary-foreground/20 px-8 py-3 text-base font-medium hover:bg-primary-foreground/10"
              >
                View Pricing Plans
              </Link>
            </div>
            <p className="mt-4 text-sm opacity-75">
              Free trial • No credit card required • Cancel anytime
            </p>
          </div>
        </section>
      </main>
    </>
  )
}