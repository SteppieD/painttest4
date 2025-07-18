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
  const [useAI, setUseAI] = useState(true);
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
              <h1 className="text-xl font-semibold">Create New Quote</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={useAI ? 'default' : 'outline'}
                size="sm"
                onClick={() => setUseAI(true)}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                AI Assistant
              </Button>
              <Button
                variant={!useAI ? 'default' : 'outline'}
                size="sm"
                onClick={() => setUseAI(false)}
              >
                <List className="h-4 w-4 mr-2" />
                Step by Step
              </Button>
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
                {useAI 
                  ? 'Chat with AI Assistant' 
                  : 'Step-by-Step Quote Creation'
                }
              </CardTitle>
              <p className="text-sm text-gray-500">
                {useAI
                  ? 'Tell me about your painting project in natural language.'
                  : "I'll guide you through each step to create your quote."
                }
              </p>
            </CardHeader>
            <CardContent className="h-[calc(100%-120px)] p-0">
              <ChatInterface
                companyId={companyData.id}
                useAI={useAI}
                onQuoteCreated={(quoteId) => {
                  router.push(`/quotes/${quoteId}`);
                }}
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}