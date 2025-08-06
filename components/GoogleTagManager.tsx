'use client';

import Script from 'next/script';

interface GoogleTagManagerProps {
  gtmId: string;
}

// Initialize dataLayer as early as possible
if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer || [];
}

export default function GoogleTagManager({ gtmId }: GoogleTagManagerProps) {
  return (
    <>
      {/* Google Tag Manager - Initialize dataLayer */}
      <Script
        id="gtm-base"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
          `,
        }}
      />
      {/* Google Tag Manager */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({\u0027gtm.start\u0027:
            new Date().getTime(),event:\u0027gtm.js\u0027});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!=\u0027dataLayer\u0027?\u0027&l=\u0027+l:\u0027\u0027;j.async=true;j.src=
            \u0027https://www.googletagmanager.com/gtm.js?id=\u0027+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,\u0027script\u0027,\u0027dataLayer\u0027,\u0027${gtmId}\u0027);
          `,
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