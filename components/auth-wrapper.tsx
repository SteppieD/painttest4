"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface CompanyData {
  id: number;
  accessCode: string;
  name: string;
  phone: string;
  email: string;
  logoUrl: string | null;
  loginTime: number;
  isNewCompany?: boolean;
  subscription_tier?: 'free' | 'pro' | 'enterprise';
  onboarding_completed?: boolean;
  skipOnboarding?: boolean;
}

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const storedData = localStorage.getItem("paintquote_company");
      
      if (!storedData) {
        router.push("/access-code");
        return;
      }

      try {
        const data: CompanyData = JSON.parse(storedData);
        
        // Check if session is still valid (7 days)
        const now = Date.now();
        const sevenDays = 7 * 24 * 60 * 60 * 1000;
        
        if (now - data.loginTime > sevenDays) {
          localStorage.removeItem("paintquote_company");
          router.push("/access-code");
          return;
        }
        
        setCompanyData(data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing auth data:", error);
        router.push("/access-code");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !companyData) {
    return null;
  }

  // Clone children and pass company data as props
  return (
    <div>
      {typeof children === 'function' 
        ? children(companyData)
        : children}
    </div>
  );
}

export function useCompanyAuth() {
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadCompanyData = () => {
      const storedData = localStorage.getItem("paintquote_company");
      console.log('useCompanyAuth - storedData:', storedData);
      if (storedData) {
        try {
          const parsed = JSON.parse(storedData);
          console.log('useCompanyAuth - parsed data:', parsed);
          setCompanyData(parsed);
        } catch (error) {
          console.error("Error parsing company data:", error);
        }
      }
      setIsLoading(false);
    };
    
    // Small delay to ensure localStorage is ready
    setTimeout(loadCompanyData, 100);
  }, []);
  
  return isLoading ? null : companyData;
}