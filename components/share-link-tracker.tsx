'use client';

import { useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';

export function ShareLinkTracker() {
  const searchParams = useSearchParams();

  const trackShareVisit = useCallback(async (shareCode: string, platform: string) => {
    try {
      // Track visit in analytics
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: 'share_link_visit',
          share_code: shareCode,
          platform: platform
        });
      }

      // In production, this would also:
      // 1. Send tracking data to backend
      // 2. Update share statistics
      // 3. Potentially trigger verification for the sharer
    } catch (error) {
      console.error('Error tracking share visit:', error);
    }
  }, []);

  useEffect(() => {
    const ref = searchParams.get('ref');
    const utm_source = searchParams.get('utm_source');
    const utm_medium = searchParams.get('utm_medium');
    const utm_campaign = searchParams.get('utm_campaign');

    if (ref && utm_campaign === 'share_reward') {
      // Track the visit
      trackShareVisit(ref, utm_source || 'unknown');
      
      // Store in localStorage for attribution
      localStorage.setItem('share_referral', JSON.stringify({
        shareCode: ref,
        platform: utm_source,
        timestamp: new Date().toISOString()
      }));

      // Show welcome message
      toast({
        title: '🎨 Welcome to PaintQuote Pro!',
        description: 'You were referred by a fellow contractor. Start your free trial to create professional quotes in minutes!',
      });
    }
  }, [searchParams, trackShareVisit]);


  return null;
}