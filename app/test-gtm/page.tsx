'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { trackQuoteCreated, trackFeatureUsage, trackUserEngagement } from '@/lib/analytics/track-events';

export default function TestGTMPage() {
  useEffect(() => {
    // Check if GTM is loaded
    if (typeof window !== 'undefined' && window.dataLayer) {
      console.log('✅ GTM is loaded! DataLayer:', window.dataLayer);
      console.log('GTM ID from env:', process.env.NEXT_PUBLIC_GTM_ID);
    } else {
      console.log('❌ GTM not loaded yet');
    }
  }, []);

  const testQuoteEvent = () => {
    trackQuoteCreated({
      quoteId: 'test-123',
      value: 5000,
      customerName: 'Test Customer',
      projectType: 'interior'
    });
    console.log('Quote event pushed to dataLayer');
  };

  const testFeatureEvent = () => {
    trackFeatureUsage('test-feature');
    console.log('Feature event pushed to dataLayer');
  };

  const testEngagementEvent = () => {
    trackUserEngagement('click', { button: 'test-button' });
    console.log('Engagement event pushed to dataLayer');
  };

  const checkDataLayer = () => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      console.log('Current dataLayer:', window.dataLayer);
      alert(`DataLayer has ${window.dataLayer.length} events. Check console for details.`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Google Tag Manager Test Page</h1>
        
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">GTM Status</h2>
          <p className="mb-2">GTM Container ID: <code className="bg-gray-700 px-2 py-1 rounded">GTM-563BQKRH</code></p>
          <p className="mb-4">Open browser console to see debug information</p>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Test Events:</h3>
              <div className="flex gap-2 flex-wrap">
                <Button onClick={testQuoteEvent} variant="secondary">
                  Test Quote Created Event
                </Button>
                <Button onClick={testFeatureEvent} variant="secondary">
                  Test Feature Usage Event
                </Button>
                <Button onClick={testEngagementEvent} variant="secondary">
                  Test User Engagement Event
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Debug Tools:</h3>
              <Button onClick={checkDataLayer} variant="outline">
                Check DataLayer Contents
              </Button>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">How to Verify GTM is Working:</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-300">
            <li>Open Chrome DevTools (F12)</li>
            <li>Go to the Console tab</li>
            <li>Type: <code className="bg-gray-700 px-2 py-1 rounded">window.dataLayer</code></li>
            <li>You should see an array with GTM events</li>
            <li>Click the test buttons above to push custom events</li>
            <li>Check the dataLayer again to see your events</li>
          </ol>
          
          <div className="mt-6 p-4 bg-yellow-900/30 border border-yellow-600 rounded">
            <p className="text-yellow-200">
              <strong>Pro Tip:</strong> Install the Google Tag Assistant Chrome extension for easier debugging
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}