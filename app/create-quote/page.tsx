'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChatInterface } from '@/components/chat/chat-interface';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageSquare, List } from 'lucide-react';
import Link from 'next/link';
import { getCompanyFromLocalStorage } from '@/lib/auth/simple-auth';

export default function CreateQuotePage() {
  const [companyData, setCompanyData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const data = getCompanyFromLocalStorage();
    if (!data) {
      router.push('/access-code');
      return;
    }
    setCompanyData(data);
  }, [router]);

  if (!companyData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-64 h-64 lg:w-96 lg:h-96 bg-blue-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-64 h-64 lg:w-96 lg:h-96 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="glass-card rounded-none border-b border-white/10 relative z-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-xl font-semibold text-white">Create Professional Quote</h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-300">
                ⚡ 2-minute quotes with AI
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-6 relative z-10">
        <div className="mx-auto max-w-4xl">
          <div className="glass-card h-[calc(100vh-200px)] flex flex-col">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold text-white">
                Quick Quote Builder
              </h2>
              <p className="text-sm text-gray-300 mt-1">
                Just describe the project - get a professional quote in under 2 minutes
              </p>
            </div>
            <div className="flex-1 overflow-hidden">
              <ChatInterface
                companyId={companyData.id}
                onQuoteCreated={(quoteId) => {
                  router.push(`/dashboard/quotes/${quoteId}`);
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}