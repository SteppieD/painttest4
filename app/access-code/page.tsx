'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Loader2, LogIn, Building2, Shield, Clock } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function AccessCodePage() {
  const [accessCode, setAccessCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDemoCodes, setShowDemoCodes] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessCode.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessCode: accessCode.trim().toUpperCase() }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem(
          'paintquote_company',
          JSON.stringify({
            id: data.company.id,
            accessCode: data.company.accessCode,
            name: data.company.name,
            phone: data.company.phone || '',
            email: data.company.email || '',
            logoUrl: data.company.logoUrl || null,
            loginTime: Date.now(),
            isNewCompany: data.company.needsOnboarding || false,
            onboarding_completed: data.company.onboarding_completed || false
          })
        );
        // Use window.location for a hard redirect to ensure proper loading
        window.location.href = '/dashboard';
      } else {
        console.error('Login failed:', data);
        setError(data.error || 'Invalid access code. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoAccess = (code: string) => {
    setAccessCode(code);
    setShowDemoCodes(false);
  };

  const demoCodes = [
    { code: 'DEMO2024', name: 'Demo Painting Company', description: 'Full-featured demo' },
    { code: 'PAINTER001', name: 'Smith Painting LLC', description: 'Sample contractor' },
    { code: 'CONTRACTOR123', name: 'Elite Contractors', description: 'Premium features' },
  ];

  return (
    <div className="min-h-screen gradient-animate">
      <div className="container max-w-lg mx-auto px-4 py-16">
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to home
          </Link>
        </div>

        <Card className="glass-card bg-surface border-white/20">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30">
              <LogIn className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-gradient-modern">Welcome Back</CardTitle>
            <CardDescription className="text-base mt-2 text-medium-contrast">
              Sign in with your company access code
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="accessCode" className="text-base font-medium text-high-contrast">
                  Access Code
                </Label>
                <Input
                  id="accessCode"
                  type="text"
                  placeholder="Enter your access code"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                  className="h-12 text-base font-mono uppercase input-modern"
                  disabled={isLoading}
                  required
                />
                <p className="text-sm text-gray-500">
                  Your unique code provided during registration
                </p>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full h-12 text-base font-medium btn-primary-modern"
                disabled={isLoading || !accessCode.trim()}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-gray-900 px-2 text-gray-400">Or</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full h-12"
                onClick={() => setShowDemoCodes(!showDemoCodes)}
              >
                <Building2 className="mr-2 h-4 w-4" />
                Try Demo Access
              </Button>

              {showDemoCodes && (
                <div className="mt-4 space-y-2">
                  {demoCodes.map((demo) => (
                    <button
                      key={demo.code}
                      onClick={() => handleDemoAccess(demo.code)}
                      className="w-full p-4 text-left rounded-lg glass-card hover:bg-white/10 transition-all"
                    >
                      <div className="font-mono font-bold text-blue-600">{demo.code}</div>
                      <div className="text-sm font-medium mt-1">{demo.name}</div>
                      <div className="text-xs text-gray-500">{demo.description}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="text-center pt-4 border-t">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link href="/trial-signup" className="font-medium text-blue-600 hover:underline">
                  Start free trial
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Features reminder */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="space-y-2">
            <div className="mx-auto w-10 h-10 glass-card rounded-full flex items-center justify-center">
              <Shield className="h-5 w-5 text-blue-400" />
            </div>
            <p className="text-xs text-medium-contrast">Secure Access</p>
          </div>
          <div className="space-y-2">
            <div className="mx-auto w-10 h-10 glass-card rounded-full flex items-center justify-center">
              <Clock className="h-5 w-5 text-emerald-400" />
            </div>
            <p className="text-xs text-medium-contrast">Quick Login</p>
          </div>
          <div className="space-y-2">
            <div className="mx-auto w-10 h-10 glass-card rounded-full flex items-center justify-center">
              <Building2 className="h-5 w-5 text-purple-400" />
            </div>
            <p className="text-xs text-medium-contrast">Multi-Company</p>
          </div>
        </div>
      </div>
    </div>
  );
}