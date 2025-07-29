'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/trial-signup');
  }, [router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-200">Redirecting...</p>
    </div>
  );
}