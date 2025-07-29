'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChatInterface } from '@/components/chat/chat-interface';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, MessageSquare, List, AlertCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { getCompanyFromLocalStorage } from '@/lib/auth/simple-auth';

function CreateQuoteContent() {
  const searchParams = useSearchParams();
  const isDemo = searchParams.get('demo') === 'true';
  const [companyData, setCompanyData] = useState<any>(null);
  const [quotaInfo, setQuotaInfo] = useState<{
    used: number;
    limit: number;
    remaining: number;
    isUnlimited: boolean;
  } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const data = getCompanyFromLocalStorage();
    if (!data) {
      router.push('/access-code');
      return;
    }
    setCompanyData(data);
    fetchQuotaInfo(data);
  }, [router]);

  const fetchQuotaInfo = async (company: any) => {
    try {
      const response = await fetch('/api/companies/usage', {
        headers: {
          'x-company-data': JSON.stringify({ 
            id: company.id,
            access_code: company.accessCode 
          })
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setQuotaInfo({
          used: data.currentMonth.quotesCreated,
          limit: data.currentMonth.limit,
          remaining: data.currentMonth.quotesRemaining,
          isUnlimited: data.currentMonth.limit === -1
        });
      }
    } catch (error) {
      console.error('Error fetching quota:', error);
    }
  };

  if (!companyData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 flex flex-col">
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
                <Button variant="ghost" size="icon" className="text-white hover:bg-gray-900/70">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-xl font-semibold text-white">Create Professional Quote</h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base text-gray-100">
                ⚡ 2-minute quotes with AI
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Quota Display */}
      {quotaInfo && !quotaInfo.isUnlimited && (
        <div className="container mx-auto px-4 py-4 relative z-20">
          <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-base text-gray-200">Monthly Quote Usage</p>
                    <p className="text-lg font-medium text-white">
                      {quotaInfo.used} / {quotaInfo.limit} quotes used
                    </p>
                  </div>
                  <Progress 
                    value={(quotaInfo.used / quotaInfo.limit) * 100} 
                    className="w-32 h-2 bg-gray-900/70 [&>div]:bg-gradient-to-r [&>div]:from-blue-400 [&>div]:to-purple-400"
                  />
                </div>
                
                {quotaInfo.remaining <= 2 && quotaInfo.remaining > 0 && (
                  <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/50">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {quotaInfo.remaining} quotes left
                  </Badge>
                )}
                
                {quotaInfo.remaining === 0 && (
                  <Link href="/dashboard/settings/billing">
                    <Button 
                      size="default" 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      Upgrade to Pro
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Limit Reached Alert */}
      {quotaInfo && quotaInfo.remaining === 0 && (
        <div className="container mx-auto px-4 pb-4 relative z-20">
          <Card className="bg-gray-900/80 backdrop-filter backdrop-blur-md border-red-500/50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-400 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-medium text-white mb-1">Monthly Quote Limit Reached</h3>
                  <p className="text-base text-gray-100 mb-3">
                    You've used all {quotaInfo.limit} quotes in your free plan this month. 
                    Upgrade to Pro for unlimited quotes and advanced features.
                  </p>
                  <Link href="/dashboard/settings/billing">
                    <Button size="default" variant="outline" className="border-white/20 text-white">
                      View Upgrade Options
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main content */}
      <main className="container mx-auto px-4 py-4 relative z-10 flex-1">
        <div className="mx-auto max-w-4xl h-full">
          <div className="glass-card h-full flex flex-col">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold text-white">
                Quick Quote Builder
              </h2>
              <p className="text-base text-gray-100 mt-1">
                Just describe the project - get a professional quote in under 2 minutes
              </p>
            </div>
            <div className="flex-1 overflow-hidden">
              {quotaInfo && quotaInfo.remaining === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center p-8">
                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertCircle className="h-8 w-8 text-red-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Quote Limit Reached</h3>
                    <p className="text-gray-200 mb-6 max-w-md">
                      You've reached your monthly limit of {quotaInfo.limit} quotes. 
                      Upgrade to Pro for unlimited quotes and continue growing your business.
                    </p>
                    <Link href="/dashboard/settings/billing">
                      <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                        <Sparkles className="h-4 w-4 mr-2" />
                        Upgrade to Pro
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <ChatInterface
                  companyId={companyData.id}
                  isDemo={isDemo}
                  onQuoteCreated={(quoteId) => {
                    router.push(`/dashboard/quotes/${quoteId}`);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function CreateQuotePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-200">Loading quote builder...</p>
        </div>
      </div>
    }>
      <CreateQuoteContent />
    </Suspense>
  );
}