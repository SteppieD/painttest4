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
      return;
    }
    
    // Parse company data and check onboarding status
    try {
      const parsedData = JSON.parse(companyData);
      // Redirect new companies to onboarding if not completed
      if (parsedData.isNewCompany && !parsedData.onboarding_completed) {
        router.push('/onboarding');
      }
    } catch (error) {
      console.error('Error parsing company data:', error);
    }
  }, [router]);

  return <ClientDashboard />;
}