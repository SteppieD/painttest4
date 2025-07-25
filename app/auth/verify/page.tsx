'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Loader2, Sparkles } from 'lucide-react';
import Link from 'next/link';

function VerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('');
  const [accessCode, setAccessCode] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      setMessage('Invalid verification link');
      return;
    }

    verifyToken(token);
  }, [searchParams]);

  const verifyToken = async (token: string) => {
    try {
      const response = await fetch('/api/auth/verify-magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setMessage(data.message);
        setAccessCode(data.accessCode);
        
        // Store company data in localStorage
        if (data.company) {
          localStorage.setItem(
            'paintquote_company',
            JSON.stringify({
              id: data.company.id,
              accessCode: data.accessCode,
              name: data.company.name || data.company.company_name,
              email: data.company.email,
              phone: data.company.phone || '',
              onboarding_completed: data.company.onboarding_completed || false
            })
          );
        }

        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          router.push(data.isNewSignup ? '/onboarding' : '/dashboard');
        }, 2000);
      } else {
        setStatus('error');
        setMessage(data.error || 'Verification failed');
      }
    } catch (error) {
      setStatus('error');
      setMessage('An error occurred during verification');
      console.error('Verification error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 flex items-center justify-center p-4">
      <Card className="glass-card max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white text-center">
            Email Verification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            {status === 'verifying' && (
              <div className="space-y-4">
                <Loader2 className="h-12 w-12 animate-spin text-blue-400 mx-auto" />
                <p className="text-gray-300">Verifying your email...</p>
              </div>
            )}

            {status === 'success' && (
              <div className="space-y-4">
                <CheckCircle className="h-12 w-12 text-green-400 mx-auto" />
                <h3 className="text-xl font-semibold text-white">Success!</h3>
                <p className="text-gray-300">{message}</p>
                
                {accessCode && (
                  <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-400 mb-2">Your access code:</p>
                    <p className="text-2xl font-mono font-bold text-white">{accessCode}</p>
                    <p className="text-xs text-gray-400 mt-2">Save this code - you'll need it to log in</p>
                  </div>
                )}
                
                <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Redirecting to dashboard...</span>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="space-y-4">
                <XCircle className="h-12 w-12 text-red-400 mx-auto" />
                <h3 className="text-xl font-semibold text-white">Verification Failed</h3>
                <p className="text-gray-300">{message}</p>
                
                <div className="space-y-3 mt-6">
                  <Link href="/trial-signup" className="block">
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Try Again
                    </Button>
                  </Link>
                  
                  <Link href="/access-code" className="block">
                    <Button variant="outline" className="w-full">
                      Sign In With Access Code
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function VerifyMagicLinkPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 flex items-center justify-center p-4">
        <Card className="glass-card max-w-md w-full">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-blue-400 mx-auto" />
              <p className="text-gray-300">Loading...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    }>
      <VerifyContent />
    </Suspense>
  );
}