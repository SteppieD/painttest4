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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="border-b bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-xl font-semibold">Create Professional Quote</h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                ⚡ 2-minute quotes with AI
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-6">
        <div className="mx-auto max-w-4xl">
          <Card className="h-[calc(100vh-200px)]">
            <CardHeader>
              <CardTitle>
                Quick Quote Builder
              </CardTitle>
              <p className="text-sm text-gray-500">
                Just describe the project - get a professional quote in under 2 minutes
              </p>
            </CardHeader>
            <CardContent className="h-[calc(100%-120px)] p-0">
              <ChatInterface
                companyId={companyData.id}
                onQuoteCreated={(quoteId) => {
                  router.push(`/dashboard/quotes/${quoteId}`);
                }}
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}