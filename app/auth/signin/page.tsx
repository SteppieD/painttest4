'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SigninRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/access-code');
  }, [router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Redirecting to access code login...</p>
    </div>
  );
}