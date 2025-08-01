'use client';

import { Suspense } from 'react';
import GTMProviderClient from './GTMProviderClient';

export default function GTMProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <GTMProviderClient />
      </Suspense>
      {children}
    </>
  );
}