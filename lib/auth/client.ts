// Client-side auth helpers that don't import server-side dependencies

// Client-side helper to get company data
export function getClientCompanyData(): any | null {
  if (typeof window === 'undefined') return null;
  
  const stored = localStorage.getItem('paintquote_company');
  if (!stored) return null;
  
  try {
    const data = JSON.parse(stored);
    
    // Check if session is still valid (7 days)
    const loginTime = data.loginTime || 0;
    const now = Date.now();
    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    
    if (now - loginTime > sevenDays) {
      localStorage.removeItem('paintquote_company');
      return null;
    }
    
    return data;
  } catch {
    return null;
  }
}

// Client-side helper to save company data
export function saveClientCompanyData(data: any): void {
  if (typeof window === 'undefined') return;
  
  const toSave = {
    ...data,
    loginTime: Date.now()
  };
  
  localStorage.setItem('paintquote_company', JSON.stringify(toSave));
}

// Client-side helper to clear company data
export function clearClientCompanyData(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('paintquote_company');
}