'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import SharedNavigation from '@/components/shared-navigation'
import { Button } from '@/components/ui/button'
import { Loader2, Mail, Lock, ArrowRight, Check } from 'lucide-react'

export default function SignIn() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError('')

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Sign in failed')
      }

      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const benefits = [
    'Create quotes in 10-15 minutes',
    'Professional templates included',
    'Track all your customers',
    'Mobile and desktop access'
  ]

  return (
    <>
      <SharedNavigation />
      <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left side - Benefits */}
          <div className="hidden lg:block space-y-8">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                Welcome back to <span className="text-primary">PaintQuote Pro</span>
              </h1>
              <p className="mt-4 text-xl text-muted-foreground">
                Sign in to access your painting business dashboard and create professional quotes in minutes.
              </p>
            </div>
            
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">15,000+</div>
                  <div className="text-sm text-muted-foreground">Active contractors</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">4.9/5</div>
                  <div className="text-sm text-muted-foreground">Average rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">2M+</div>
                  <div className="text-sm text-muted-foreground">Quotes created</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Sign in form */}
          <div className="w-full max-w-md mx-auto">
            <div className="bg-background rounded-lg border shadow-lg p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-center">
                  Sign in to your account
                </h2>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Link href="/auth/signup" className="font-medium text-primary hover:text-primary/90">
                    Start your free trial
                  </Link>
                </p>
              </div>

              <form className="space-y-6" onSubmit={onSubmit}>
                {error && (
                  <div className="rounded-md bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
                    {error}
                  </div>
                )}
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="john@paintingcompany.com"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="password" className="block text-sm font-medium">
                        Password
                      </label>
                      <Link href="/auth/forgot-password" className="text-sm text-primary hover:text-primary/90">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full"
                    size="lg"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign in
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <div>
                  <Link href="/paint-quote-calculator">
                    <Button variant="outline" className="w-full" size="lg">
                      Try Free Calculator
                    </Button>
                  </Link>
                </div>
              </form>

              <div className="mt-6 text-center text-xs text-muted-foreground">
                <p>Test credentials for demo:</p>
                <p className="font-mono mt-1">admin@acmepainting.com / admin123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}