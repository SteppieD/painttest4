'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogOut, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function LogoutPage() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear all auth data
    localStorage.removeItem('paintquote_company');
    sessionStorage.clear();
    
    // Clear any cookies (if we use them)
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    
    // Redirect to login
    setTimeout(() => {
      router.push('/access-code');
    }, 1500);
  };

  useEffect(() => {
    // Auto logout on page load
    handleLogout();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-gray-900/80 backdrop-filter backdrop-blur-md border border-white/20">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">Logged Out Successfully</CardTitle>
          <CardDescription className="text-gray-100">
            You have been logged out of your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-base text-gray-200 mb-4">
              Redirecting to login page...
            </p>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-white/10">
            <Link href="/access-code" className="block">
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                <LogOut className="h-4 w-4 mr-2" />
                Go to Login Now
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}