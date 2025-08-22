import { emailService } from './EmailService';
import { EMAIL_TEMPLATES } from './templates';
import { EmailData } from './types';

interface QuoteData {
  id?: number;
  quote_id: string;
  customer_name: string;
  customer_email?: string;
  project_type: string;
  total_cost: number;
  created_at: string;
  status: string;
  company_id: number;
}

interface CompanyData {
  id: number;
  company_name: string;
  email: string;
  name?: string;
}

interface EmailBaseData {
  quoteId: string;
  customerName: string;
  projectType: string;
  totalAmount: string;
  quoteUrl: string;
  companyName: string;
  contactName: string;
  customerEmail: string;
  daysSinceQuote?: number;
  followUpNumber?: number;
  daysUntilExpiration?: number;
}

export class EmailAutomationService {
  /**
   * Schedule quote follow-up emails
   */
  async scheduleQuoteFollowUps(quote: QuoteData, company: CompanyData): Promise<void> {
    if (!quote.customer_email) {
      console.log(`[EMAIL] No customer email for quote ${quote.quote_id}, skipping follow-ups`);
      return;
    }

    const baseData = {
      quoteId: quote.quote_id,
      customerName: quote.customer_name,
      projectType: quote.project_type,
      totalAmount: quote.total_cost.toFixed(2),
      quoteUrl: `${process.env.NEXTAUTH_URL || 'https://paintquotepro.com'}/quote/${quote.quote_id}`,
      companyName: company.company_name,
      contactName: company.name || 'there',
      customerEmail: quote.customer_email,
    };

    try {
      // Follow-up 1: Send after 3 days
      console.log(`[EMAIL] Scheduling follow-up sequence for quote ${quote.quote_id}`);
      
      // Note: In production, these would be scheduled with a job queue like Bull/Redis
      // For now, we'll create the automation logic structure
      
      await this.scheduleFollowUpEmail(1, baseData, 3); // 3 days
      await this.scheduleFollowUpEmail(2, baseData, 7); // 7 days  
      await this.scheduleFollowUpEmail(3, baseData, 14); // 14 days
      
      // Schedule expiration reminder (typically 30 days)
      await this.scheduleExpirationReminder(baseData, 25); // 5 days before expiration
      
    } catch (error) {
      console.error(`[EMAIL] Failed to schedule follow-ups for quote ${quote.quote_id}:`, error);
    }
  }

  /**
   * Schedule a specific follow-up email
   */
  private async scheduleFollowUpEmail(
    followUpNumber: number, 
    baseData: EmailBaseData, 
    daysDelay: number
  ): Promise<void> {
    // In production, this would use a job scheduler
    // For now, we'll create a simple delayed execution simulation
    
    const templateKey = `QUOTE_FOLLOW_UP_${followUpNumber}` as keyof typeof EMAIL_TEMPLATES;
    const template = EMAIL_TEMPLATES[templateKey];
    
    if (!template) {
      console.error(`[EMAIL] Template not found: ${templateKey}`);
      return;
    }

    const emailData = {
      ...baseData,
      daysSinceQuote: daysDelay,
      followUpNumber,
    };

    // Log the scheduling (in production, this would be queued)
    console.log(`[EMAIL] Scheduled ${template.name} for ${baseData.customerEmail} in ${daysDelay} days`);
    
    // For immediate testing, you could uncomment this line:
    // await emailService.sendTransactional(template, baseData.customerEmail, emailData);
  }

  /**
   * Schedule expiration reminder email
   */
  private async scheduleExpirationReminder(baseData: EmailBaseData, daysDelay: number): Promise<void> {
    const template = EMAIL_TEMPLATES.QUOTE_EXPIRATION;
    
    const emailData = {
      ...baseData,
      daysUntilExpiration: 5, // 5 days until expiration
    };

    console.log(`[EMAIL] Scheduled expiration reminder for ${baseData.customerEmail} in ${daysDelay} days`);
    
    // For immediate testing:
    // await emailService.sendTransactional(template, baseData.customerEmail, emailData);
  }

  /**
   * Send immediate follow-up email (for testing)
   */
  async sendImmediateFollowUp(
    quote: QuoteData, 
    company: CompanyData, 
    followUpNumber: number = 1
  ): Promise<string | null> {
    if (!quote.customer_email) {
      throw new Error('Customer email is required for follow-up');
    }

    const templateKey = `QUOTE_FOLLOW_UP_${followUpNumber}` as keyof typeof EMAIL_TEMPLATES;
    const template = EMAIL_TEMPLATES[templateKey];
    
    if (!template) {
      throw new Error(`Template not found: ${templateKey}`);
    }

    const emailData = {
      quoteId: quote.quote_id,
      customerName: quote.customer_name,
      projectType: quote.project_type,
      totalAmount: quote.total_cost.toFixed(2),
      quoteUrl: `${process.env.NEXTAUTH_URL || 'https://paintquotepro.com'}/quote/${quote.quote_id}`,
      companyName: company.company_name,
      contactName: company.name || 'there',
      customerEmail: quote.customer_email,
      daysSinceQuote: this.calculateDaysSince(quote.created_at),
      followUpNumber,
    };

    return await emailService.sendTransactional(template, quote.customer_email, emailData);
  }

  /**
   * Send expiration warning
   */
  async sendExpirationWarning(
    quote: QuoteData, 
    company: CompanyData, 
    daysUntilExpiration: number = 5
  ): Promise<string | null> {
    if (!quote.customer_email) {
      throw new Error('Customer email is required for expiration warning');
    }

    const template = EMAIL_TEMPLATES.QUOTE_EXPIRATION;
    
    const emailData = {
      quoteId: quote.quote_id,
      customerName: quote.customer_name,
      projectType: quote.project_type,
      totalAmount: quote.total_cost.toFixed(2),
      quoteUrl: `${process.env.NEXTAUTH_URL || 'https://paintquotepro.com'}/quote/${quote.quote_id}`,
      companyName: company.company_name,
      contactName: company.name || 'there',
      customerEmail: quote.customer_email,
      daysUntilExpiration,
    };

    return await emailService.sendTransactional(template, quote.customer_email, emailData);
  }

  /**
   * Send project completion email
   */
  async sendProjectCompletionEmail(
    customerName: string,
    customerEmail: string,
    projectData: {
      projectType: string;
      totalAmount: string;
      projectDuration: string;
    },
    company: CompanyData,
    options: {
      reviewUrl?: string;
      referralIncentive?: string;
    } = {}
  ): Promise<string | null> {
    const template = EMAIL_TEMPLATES.PROJECT_COMPLETION;
    
    const emailData = {
      customerName,
      projectType: projectData.projectType,
      companyName: company.company_name,
      contactName: company.name || 'there',
      totalAmount: projectData.totalAmount,
      projectDuration: projectData.projectDuration,
      reviewUrl: options.reviewUrl || '#',
      referralIncentive: options.referralIncentive || '10% off their first project',
    };

    return await emailService.sendTransactional(template, customerEmail, emailData);
  }

  /**
   * Calculate days since a date
   */
  private calculateDaysSince(dateString: string): number {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  /**
   * Get automation status for a quote
   */
  async getAutomationStatus(quoteId: string): Promise<{
    followUpsScheduled: number;
    emailsSent: number;
    nextScheduled?: string;
  }> {
    // In production, this would query a database table tracking email automations
    // For now, return a mock status
    return {
      followUpsScheduled: 3,
      emailsSent: 0,
      nextScheduled: 'Follow-up 1 in 3 days',
    };
  }

  /**
   * Cancel automation for a quote (e.g., when quote is accepted)
   */
  async cancelAutomation(quoteId: string, reason: string = 'Quote accepted'): Promise<void> {
    console.log(`[EMAIL] Cancelling automation for quote ${quoteId}: ${reason}`);
    
    // In production, this would:
    // 1. Cancel scheduled jobs in the queue
    // 2. Update automation status in database
    // 3. Log the cancellation
  }
}

// Export singleton instance
export const emailAutomationService = new EmailAutomationService();