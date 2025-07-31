'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { initializeGTM, trackRouteChange } from '@/lib/analytics/gtm-init';

export default function GTMProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize GTM on mount
  useEffect(() => {
    initializeGTM();
  }, []);

  // Track route changes
  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    trackRouteChange(url);
  }, [pathname, searchParams]);

  return <>{children}</>;
}