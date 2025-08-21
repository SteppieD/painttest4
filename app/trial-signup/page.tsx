'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, CheckCircle, Sparkles, Mail } from 'lucide-react';
import Link from 'next/link';
import ModernNavigation from '@/components/modern-navigation';
// Removed Tabs import - magic link only now

export default function TrialSignupPage() {
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Magic link signup only
      const response = await fetch('/api/auth/magic-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyName, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send magic link');
      }

      setMagicLinkSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (magicLinkSent) {
    return (
      <>
        <ModernNavigation />
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 pt-16">
          {/* Background effects */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
          </div>
          
          <div className="w-full max-w-md bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg border-blue-500/20 relative z-10 p-6">
            <div className="text-center mb-6">
              <Mail className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h1 className="text-2xl font-semibold leading-none tracking-tight text-white">Check Your Email!</h1>
              <p className="text-base text-gray-100 mt-1.5">We{"'"}ve sent you a magic link to sign in</p>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg border-blue-500/20 p-4">
                <p className="text-base text-gray-100">
                  We sent a sign-in link to <strong className="text-white">{email}</strong>
                </p>
                <p className="text-base text-gray-200 mt-2">Click the link in your email to complete signup</p>
              </div>
              <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg border-amber-500/20 p-4 bg-amber-500/5">
                <p className="text-base text-amber-300">
                  ⏰ The link expires in 15 minutes
                </p>
              </div>
              <div className="text-center space-y-2">
                <p className="text-base text-gray-200">Didn{"'"}t receive the email?</p>
                <Button
                  variant="outline"
                  size="default"
                  onClick={() => {
                    setMagicLinkSent(false);
                    setError('');
                  }}
                  className="text-base"
                >
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <ModernNavigation />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 pt-16">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
        </div>
        
        <div className="w-full max-w-md bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg relative z-10 p-6">
          <div className="mb-6">
            <Link href="/" className="inline-flex items-center text-base text-gray-100 hover:text-white mb-4 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to home
            </Link>
            <h1 className="text-2xl font-semibold leading-none tracking-tight text-white">Quote Free in 2 Minutes</h1>
            <p className="text-base text-gray-100 mt-1.5">
              Join 15,000+ contractors • 5 quotes free every month
            </p>
          </div>
          <div>
            <div className="mb-6 text-center">
              <div className="inline-flex items-center justify-center px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-4">
                <Mail className="h-4 w-4 mr-2 text-blue-400" />
                <span className="text-base text-blue-400">Secure Magic Link Signup</span>
              </div>
              <p className="text-base text-gray-200">
                No passwords needed - we'll email you a secure login link
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-gray-100">Company Name</Label>
                  <Input
                    id="company"
                    type="text"
                    placeholder="Your Painting Company"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                    disabled={loading}
                    className="!bg-gray-800/80 !border-gray-600 !text-white !placeholder-gray-400 focus:!bg-gray-800/90 focus:!border-gray-500 hover:!bg-gray-800/80"
                    style={{ 
                      backgroundColor: 'rgba(31, 41, 55, 0.8) !important'
                    } as React.CSSProperties}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-100">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    className="!bg-gray-800/80 !border-gray-600 !text-white !placeholder-gray-400 focus:!bg-gray-800/90 focus:!border-gray-500 hover:!bg-gray-800/80"
                    style={{ 
                      backgroundColor: 'rgba(31, 41, 55, 0.8) !important'
                    } as React.CSSProperties}
                  />
                  <p className="text-base text-gray-200">
                    We'll send a secure login link to your email
                  </p>
                </div>

                {error && (
                  <div className="bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20 rounded-lg border-red-500/20 bg-red-500/10 p-3 text-base">
                    <p className="text-red-400">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-3"
                  disabled={loading || !companyName.trim() || !email.trim()}
                >
                  {loading ? (
                    <span>Creating Your Account...</span>
                  ) : (
                    <span className="flex items-center justify-center">
                      Start Your 5 Free Quotes
                      <Sparkles className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </Button>
              </form>

            <div className="mt-6 text-center text-base text-gray-200">
              Already have an account?{' '}
              <Link href="/access-code" className="text-blue-400 hover:text-blue-300 hover:underline transition-colors">
                Sign in with access code
              </Link>
            </div>

            <div className="mt-6 space-y-3 border-t border-white/10 pt-6">
              <p className="text-base font-medium text-white">What&apos;s included:</p>
              <ul className="space-y-2 text-base text-gray-100">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
                  5 professional quotes per month
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
                  AI-powered quote assistance
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
                  Customer management
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" />
                  Mobile-friendly interface
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}