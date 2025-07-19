'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MobileNav } from '@/components/mobile-nav';
import { useEffect, useState } from 'react';

interface CompanyData {
  id: number;
  name: string;
  email: string;
  accessCode: string;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const [company, setCompany] = useState<CompanyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for company data
    const storedData = localStorage.getItem('paintquote_company');
    if (!storedData) {
      router.push('/access-code');
      return;
    }

    try {
      const data = JSON.parse(storedData);
      setCompany({
        id: data.id,
        name: data.name,
        email: data.email,
        accessCode: data.accessCode
      });
    } catch (error) {
      console.error('Error parsing company data:', error);
      router.push('/access-code');
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem('paintquote_company');
    router.push('/access-code');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!company) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <MobileNav userEmail={company.email} />
              <Link href="/dashboard" className="text-xl font-semibold">
                Paint Quote Pro
              </Link>
              <div className="ml-10 hidden md:flex items-baseline space-x-4">
                <Link
                  href="/dashboard"
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  Dashboard
                </Link>
                <Link
                  href="/create-quote"
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  Quick Quote
                </Link>
                <Link
                  href="/quotes"
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  Quote Pipeline
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  Settings
                </Link>
                <Link
                  href="/billing"
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  Billing
                </Link>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">⚡ {company.name}</span>
              <button
                onClick={handleSignOut}
                className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 pb-20 md:pb-6">
        {children}
      </main>
    </div>
  );
}