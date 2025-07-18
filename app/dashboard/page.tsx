'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ClientDashboard } from './client-dashboard';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated via localStorage
    const companyData = localStorage.getItem('paintquote_company');
    if (!companyData) {
      router.push('/access-code');
    }
  }, [router]);

  return <ClientDashboard />;
}