'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Loader2, LogIn, Shield, Clock, User } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function AccessCodePage() {
  const [accessCode, setAccessCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [showForgotCode, setShowForgotCode] = useState(false);
  const [forgotCodeEmail, setForgotCodeEmail] = useState('');
  const [forgotCodeLoading, setForgotCodeLoading] = useState(false);
  const [forgotCodeSuccess, setForgotCodeSuccess] = useState(false);
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
        body: JSON.stringify({ 
          accessCode: accessCode.trim().toUpperCase() 
        }),
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


  const handleForgotCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotCodeEmail.trim()) return;

    setForgotCodeLoading(true);
    try {
      const response = await fetch('/api/auth/resend-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: forgotCodeEmail.trim() }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setForgotCodeSuccess(true);
      } else {
        setError(data.error || 'Failed to send code. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setForgotCodeLoading(false);
    }
  };



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
            <CardTitle className="text-3xl font-bold text-gradient-modern">
              Welcome Back
            </CardTitle>
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
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    Your unique code provided during registration
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowForgotCode(true)}
                    className="text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                  >
                    Forgot your code?
                  </button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full h-12 text-base font-medium btn-primary-modern"
                disabled={isLoading || accessCode.length === 0}
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
              <User className="h-5 w-5 text-purple-400" />
            </div>
            <p className="text-xs text-medium-contrast">Multi-Company</p>
          </div>
        </div>

        {/* Forgot Code Modal */}
        <Dialog open={showForgotCode} onOpenChange={setShowForgotCode}>
          <DialogContent className="glass-card bg-surface border-white/20">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-gradient-modern">
                Forgot Your Code?
              </DialogTitle>
              <DialogDescription className="text-medium-contrast">
                Enter your email address and we'll send your access code
              </DialogDescription>
            </DialogHeader>
            
            {forgotCodeSuccess ? (
              <div className="space-y-4">
                <Alert className="border-green-500/50 bg-green-500/10">
                  <AlertDescription className="text-green-400">
                    Access code sent! Check your email for your code.
                  </AlertDescription>
                </Alert>
                <Button
                  onClick={() => {
                    setShowForgotCode(false);
                    setForgotCodeSuccess(false);
                    setForgotCodeEmail('');
                  }}
                  className="w-full btn-primary-modern"
                >
                  Close
                </Button>
              </div>
            ) : (
              <form onSubmit={handleForgotCode} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="forgotEmail" className="text-base font-medium text-high-contrast">
                    Email Address
                  </Label>
                  <Input
                    id="forgotEmail"
                    type="email"
                    placeholder="Enter your email address"
                    value={forgotCodeEmail}
                    onChange={(e) => setForgotCodeEmail(e.target.value)}
                    className="h-12 text-base input-modern"
                    disabled={forgotCodeLoading}
                    required
                  />
                </div>
                
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowForgotCode(false);
                      setForgotCodeEmail('');
                      setError('');
                    }}
                    className="flex-1"
                    disabled={forgotCodeLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 btn-primary-modern"
                    disabled={forgotCodeLoading || !forgotCodeEmail.trim()}
                  >
                    {forgotCodeLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send Code'
                    )}
                  </Button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}