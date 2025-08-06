'use client';

import { useEffect } from 'react';

interface StripeBuyButtonProps {
  buyButtonId: string;
  publishableKey: string;
}

export function StripeBuyButton({ buyButtonId, publishableKey }: StripeBuyButtonProps) {
  useEffect(() => {
    // Load Stripe Buy Button script
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/buy-button.js';
    script.async = true;
    
    // Only append if not already loaded
    if (!document.querySelector('script[src="https://js.stripe.com/v3/buy-button.js"]')) {
      document.body.appendChild(script);
    }
  }, [buyButtonId, publishableKey]);

  return (
    <stripe-buy-button
      buy-button-id={buyButtonId}
      publishable-key={publishableKey}
    />
  );
}

// Declare the custom element for TypeScript without using namespace
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'stripe-buy-button': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'buy-button-id': string;
          'publishable-key': string;
        },
        HTMLElement
      >;
    }
  }
}