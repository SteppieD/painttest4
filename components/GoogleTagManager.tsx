'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

interface GoogleTagManagerProps {
  gtmId: string;
}

export default function GoogleTagManager({ gtmId }: GoogleTagManagerProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  // Ensure we only run GTM after hydration is complete
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Don't render anything until hydration is complete
  if (!isHydrated) {
    return null;
  }

  return (
    <>
      {/* Initialize dataLayer safely */}
      <Script
        id="gtm-datalayer"
        strategy="beforeInteractive"
      >{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
      `}</Script>
      
      {/* Load GTM script safely after hydration */}
      <Script
        id="gtm-script"
        src={`https://www.googletagmanager.com/gtm.js?id=${gtmId}`}
        strategy="afterInteractive"
        onLoad={() => {
          // GTM loaded successfully
          if (typeof window !== 'undefined' && window.dataLayer) {
            window.dataLayer.push({
              'gtm.start': new Date().getTime(),
              'event': 'gtm.js'
            });
          }
        }}
      />
    </>
  );
}

// Also export the noscript component for the body
export function GoogleTagManagerNoscript({ gtmId }: GoogleTagManagerProps) {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
}