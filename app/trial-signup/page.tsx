'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function TrialSignupPage() {
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/simple-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyName }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create account');
      }

      setSuccess(true);
      setAccessCode(data.accessCode);
      
      // Store company data in localStorage for authentication
      localStorage.setItem(
        'paintquote_company',
        JSON.stringify({
          id: data.company.id,
          accessCode: data.accessCode,
          name: data.company.name,
          phone: '',
          email: '',
          logoUrl: null,
          loginTime: Date.now(),
          isNewCompany: true,
          quotesRemaining: data.company.quotesRemaining || 5
        })
      );
      
      // Redirect to dashboard after 3 seconds
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <CardTitle className="text-2xl">Welcome to PaintQuote Pro!</CardTitle>
            <CardDescription>Your account has been created successfully</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800 mb-2">Your access code is:</p>
              <p className="text-2xl font-mono font-bold text-blue-900">{accessCode}</p>
              <p className="text-xs text-blue-700 mt-2">Save this code to log in later</p>
            </div>
            <p className="text-sm text-gray-600 text-center">
              Redirecting to your dashboard...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <Link href="/" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to home
          </Link>
          <CardTitle className="text-2xl">Start Your Free Trial</CardTitle>
          <CardDescription>
            Get 5 free quotes per month • No credit card required
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                type="text"
                placeholder="Your Painting Company"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-3 text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading || !companyName.trim()}
            >
              {loading ? 'Creating Account...' : 'Start Free Trial'}
            </Button>

            <div className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/access-code" className="text-blue-600 hover:underline">
                Sign in with access code
              </Link>
            </div>
          </form>

          <div className="mt-6 space-y-3 border-t pt-6">
            <p className="text-sm font-medium text-gray-700">What&apos;s included:</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                5 professional quotes per month
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                AI-powered quote assistance
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Customer management
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Mobile-friendly interface
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}