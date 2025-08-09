import { db } from '@/lib/database/adapter';

export interface OnboardingSettings {
  companyName?: string;
  email?: string;
  phone?: string;
  taxRate?: number;
  city?: string;
  state?: string;
  laborRate?: number;
  markupPercentage?: number;
  minimumJobSize?: number;
  onboardingStep?: 'company' | 'location' | 'pricing' | 'complete';
}

export class OnboardingAssistant {
  private static extractedSettings: OnboardingSettings = {};
  private static questionsAsked: Set<string> = new Set();

  static reset() {
    this.extractedSettings = {};
    this.questionsAsked.clear();
  }

  static getRequiredQuestions(currentStep?: string): string[] {
    const questions: string[] = [];
    
    // Progressive disclosure - only ask what's needed for the quote
    if (!this.extractedSettings.companyName && !this.questionsAsked.has('companyName')) {
      questions.push("What's your company name?");
      this.questionsAsked.add('companyName');
    }

    if (!this.extractedSettings.city && !this.questionsAsked.has('location')) {
      questions.push("What city and state are you located in?");
      this.questionsAsked.add('location');
    }

    if (!this.extractedSettings.laborRate && !this.questionsAsked.has('laborRate')) {
      questions.push("What's your hourly labor rate? (Industry average is $35-65/hour)");
      this.questionsAsked.add('laborRate');
    }

    return questions;
  }

  static extractSettingsFromMessage(message: string): Partial<OnboardingSettings> {
    const extracted: Partial<OnboardingSettings> = {};

    // Extract company name
    const companyPatterns = [
      /(?:company|business|we're|we are|I'm|I am)\s+(?:called\s+)?([A-Z][A-Za-z\s&]+(?:Painting|Painters|Paint|Coatings|Services|Co\.?|LLC|Inc\.?))/i,
      /^([A-Z][A-Za-z\s&]+(?:Painting|Painters|Paint|Coatings|Services|Co\.?|LLC|Inc\.?))/i
    ];

    for (const pattern of companyPatterns) {
      const match = message.match(pattern);
      if (match) {
        extracted.companyName = match[1].trim();
        break;
      }
    }

    // Extract email
    const emailMatch = message.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
    if (emailMatch) {
      extracted.email = emailMatch[1];
    }

    // Extract phone
    const phoneMatch = message.match(/(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/);
    if (phoneMatch) {
      extracted.phone = phoneMatch[1];
    }

    // Extract city and state
    const locationPatterns = [
      /(?:in|from|located in|based in)\s+([A-Za-z\s]+),\s*([A-Z]{2})/i,
      /([A-Za-z\s]+),\s*([A-Z]{2})(?:\s|$)/
    ];

    for (const pattern of locationPatterns) {
      const match = message.match(pattern);
      if (match) {
        extracted.city = match[1].trim();
        extracted.state = match[2].toUpperCase();
        break;
      }
    }

    // Extract labor rate
    const laborRateMatch = message.match(/\$?(\d+(?:\.\d{2})?)\s*(?:\/hour|\/hr|per hour|hourly)/i);
    if (laborRateMatch) {
      extracted.laborRate = parseFloat(laborRateMatch[1]);
    }

    // Extract tax rate
    const taxRateMatch = message.match(/(\d+(?:\.\d+)?)\s*%?\s*(?:tax|sales tax)/i);
    if (taxRateMatch) {
      extracted.taxRate = parseFloat(taxRateMatch[1]);
    }

    // Extract markup
    const markupMatch = message.match(/(\d+(?:\.\d+)?)\s*%?\s*markup/i);
    if (markupMatch) {
      extracted.markupPercentage = parseFloat(markupMatch[1]);
    }

    // Update our stored settings
    this.extractedSettings = { ...this.extractedSettings, ...extracted };

    return extracted;
  }

  static getExtractedSettings(): OnboardingSettings {
    return { ...this.extractedSettings };
  }

  static isOnboardingComplete(): boolean {
    const required = ['companyName', 'city', 'state', 'laborRate'];
    return required.every(field => this.extractedSettings[field as keyof OnboardingSettings]);
  }

  static async saveSettings(companyId: number, settings: OnboardingSettings): Promise<void> {
    try {
      // Get company data from localStorage for access code
      const companyData = localStorage.getItem('paintquote_company');
      const company = companyData ? JSON.parse(companyData) : null;
      
      // Save via API
      const response = await fetch('/api/companies/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-company-data': JSON.stringify({ 
            id: companyId,
            access_code: company?.access_code
          })
        },
        body: JSON.stringify(settings)
      });
      
      if (!response.ok) {
        throw new Error('Failed to save settings');
      }
      
      // Update localStorage
      if (companyData) {
        localStorage.setItem('paintquote_company', JSON.stringify({
          ...company,
          ...settings,
          onboarding_completed: true
        }));
      }
    } catch (error) {
      console.error('Error saving onboarding settings:', error);
      throw error;
    }
  }

  static generateOnboardingPrompts(missingFields: string[]): string {
    const prompts: string[] = [];
    
    if (missingFields.includes('companyName')) {
      prompts.push("I noticed you haven't told me your company name yet. What should I call your business?");
    }
    
    if (missingFields.includes('location')) {
      prompts.push("To calculate accurate quotes, I'll need to know your location. What city and state are you in?");
    }
    
    if (missingFields.includes('laborRate')) {
      prompts.push("What's your standard hourly labor rate? This helps me calculate accurate pricing.");
    }

    return prompts.join(' ');
  }

  static shouldAskForSettings(messageCount: number): boolean {
    // Ask for settings progressively:
    // - Company name after 2 messages
    // - Location after 4 messages
    // - Labor rate when calculating price
    return !this.isOnboardingComplete() && messageCount > 1;
  }
}