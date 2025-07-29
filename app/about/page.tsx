import { Metadata } from 'next'
import Link from 'next/link'
import SharedNavigation from '@/components/shared-navigation'
import { 
  Users, 
  Target, 
  Lightbulb,
  Heart,
  Shield,
  CheckCircle,
  ArrowRight
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us | PaintQuote Pro - Our Story & Mission',
  description: 'Learn about PaintQuote Pro&apos;s mission to help painting contractors save time, win more jobs, and grow their businesses with professional estimating software.',
  keywords: 'about paintquote pro, painting software company, contractor software story, painting business solutions',
  openGraph: {
    title: 'About PaintQuote Pro - Empowering Painting Contractors Since 2018',
    description: 'Our mission is to help painting contractors create professional quotes faster and grow their businesses.',
    type: 'website',
  }
}

const values = [
  {
    icon: Users,
    title: 'Contractor-First Design',
    description: 'Built by contractors, for contractors. Every feature is designed with your workflow in mind.'
  },
  {
    icon: Target,
    title: 'Focus on Efficiency',
    description: 'We obsess over saving you time so you can focus on what matters - growing your business.'
  },
  {
    icon: Shield,
    title: 'Trust & Reliability',
    description: 'Your data is secure, your quotes are accurate, and our support team has your back.'
  },
  {
    icon: Lightbulb,
    title: 'Continuous Innovation',
    description: 'We constantly improve based on your feedback and industry best practices.'
  }
]

const milestones = [
  {
    year: '2018',
    title: 'Founded',
    description: 'Started by a painting contractor frustrated with slow, inaccurate quotes'
  },
  {
    year: '2019',
    title: '1,000 Users',
    description: 'Reached our first thousand contractors using PaintQuote Pro'
  },
  {
    year: '2020',
    title: 'Mobile Launch',
    description: 'Released iOS and Android apps for on-site estimating'
  },
  {
    year: '2021',
    title: 'AI Integration',
    description: 'Introduced AI-powered quote generation and smart suggestions'
  },
  {
    year: '2022',
    title: '10,000 Users',
    description: 'Expanded to serve contractors across all 50 states'
  },
  {
    year: '2023',
    title: '$1B+ Quoted',
    description: 'Helped contractors quote over $1 billion in painting projects'
  },
  {
    year: '2024',
    title: 'Industry Leader',
    description: '15,000+ contractors trust PaintQuote Pro for their business'
  }
]

const teamMembers = [
  {
    name: 'Michael Chen',
    role: 'CEO & Founder',
    bio: 'Former painting contractor with 15 years of experience. Started PaintQuote Pro to solve his own estimating challenges.',
    image: '/team/michael.jpg'
  },
  {
    name: 'Sarah Rodriguez',
    role: 'Head of Product',
    bio: 'Product design expert focused on making complex software simple and intuitive for contractors.',
    image: '/team/sarah.jpg'
  },
  {
    name: 'David Thompson',
    role: 'Head of Customer Success',
    bio: '20+ years in the painting industry. Ensures every contractor gets maximum value from PaintQuote Pro.',
    image: '/team/david.jpg'
  },
  {
    name: 'Jennifer Park',
    role: 'Head of Engineering',
    bio: 'Tech leader passionate about building reliable, fast software that contractors can depend on.',
    image: '/team/jennifer.jpg'
  }
]

const stats = [
  { number: '15,000+', label: 'Active Contractors' },
  { number: '500,000+', label: 'Quotes Created' },
  { number: '$1.2B+', label: 'Projects Quoted' },
  { number: '98%', label: 'Customer Satisfaction' }
]

export default function AboutPage() {
  return (
    <>
      <SharedNavigation />
      
      <main className="pt-14">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-muted/50 to-background py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Empowering Painting Contractors to 
                <span className="text-primary"> Grow Their Business</span>
              </h1>
              <p className="mt-6 text-xl text-muted-foreground">
                Since 2018, we{'\''}ve been on a mission to help painting contractors save time, 
                win more jobs, and build successful businesses with professional estimating software.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                    Our Story
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      PaintQuote Pro was born out of frustration. Our founder, Michael Chen, 
                      ran a successful painting business for 15 years but constantly struggled 
                      with one problem: creating accurate quotes quickly.
                    </p>
                    <p>
                      "I was spending 3-6 hours on every quote, often working late into the night 
                      just to keep up. I knew there had to be a better way," Michael recalls. 
                      "When I couldn{'\''}t find software that truly understood a painter{'\''}s workflow, 
                      I decided to build it myself."
                    </p>
                    <p>
                      What started as a simple calculator for personal use quickly grew as other 
                      contractors saw its potential. Today, PaintQuote Pro helps over 15,000 
                      painting contractors across the country save time and grow their businesses.
                    </p>
                    <p className="font-medium text-foreground">
                      Our mission remains the same: give painting contractors the tools they need 
                      to compete and succeed in today{'\''}s market.
                    </p>
                  </div>
                </div>
                <div className="relative h-96 overflow-hidden rounded-lg border bg-muted lg:h-full">
                  {/* Placeholder for story image */}
                  <div className="flex h-full items-center justify-center">
                    <Users className="h-24 w-24 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-primary py-16 text-primary-foreground">
          <div className="container">
            <div className="mx-auto max-w-5xl">
              <h2 className="text-center text-3xl font-bold mb-12">
                By the Numbers
              </h2>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl font-bold mb-2">{stat.number}</div>
                    <div className="text-sm opacity-90">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-5xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Our Values
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  The principles that guide everything we do
                </p>
              </div>
              
              <div className="grid gap-8 md:grid-cols-2">
                {values.map((value, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <div className="mx-auto max-w-5xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Our Journey
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Major milestones in our mission to help contractors succeed
                </p>
              </div>

              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      {index < milestones.length - 1 && (
                        <div className="h-full w-0.5 bg-border" />
                      )}
                    </div>
                    <div className="pb-8">
                      <div className="text-sm font-medium text-primary mb-1">{milestone.year}</div>
                      <h3 className="text-lg font-semibold mb-1">{milestone.title}</h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-5xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Meet Our Team
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Dedicated to making your business more successful
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {teamMembers.map((member, index) => (
                  <div key={index} className="text-center">
                    <div className="mb-4 h-32 w-32 mx-auto rounded-full bg-muted flex items-center justify-center">
                      <Users className="h-16 w-16 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold mb-1">{member.name}</h3>
                    <div className="text-sm text-primary mb-3">{member.role}</div>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <div className="rounded-lg border bg-background p-8 md:p-12">
                <div className="text-center">
                  <Heart className="h-12 w-12 text-primary mx-auto mb-6" />
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                    Our Mission
                  </h2>
                  <p className="text-xl text-muted-foreground mb-8">
                    To empower every painting contractor with the tools and technology they need 
                    to create professional quotes quickly, win more jobs, and build thriving businesses 
                    that support their families and communities.
                  </p>
                  <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                    <Link
                      href="/auth/signup"
                      className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-medium text-primary-foreground shadow-lg hover:bg-primary/90"
                    >
                      Join Our Mission
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                    <Link
                      href="/features"
                      className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground"
                    >
                      Explore Features
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold mb-4">
                Have Questions? We{'\''}d Love to Hear From You
              </h2>
              <p className="text-muted-foreground mb-8">
                Whether you{'\''}re a current customer or considering PaintQuote Pro, 
                our team is here to help you succeed.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Contact Support
                </Link>
                <Link
                  href="/paint-quote-calculator"
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  Try Free Calculator
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}