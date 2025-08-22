import { resend, EMAIL_DEFAULTS, isEmailServiceAvailable } from './resend-client';
import { 
  EmailTemplate, 
  EmailData, 
  BatchEmailRequest, 
  BatchEmailResult, 
  EmailSendOptions,
  EmailSendError 
} from './types';

export class EmailService {
  /**
   * Send a single transactional email
   */
  async sendTransactional(
    template: EmailTemplate,
    recipient: string,
    data: EmailData,
    options: EmailSendOptions = {}
  ): Promise<string | null> {
    // Graceful fallback if email service is not configured
    if (!isEmailServiceAvailable()) {
      console.log('[EMAIL] Service not configured - would send:', {
        template: template.name,
        recipient,
        subject: this.renderSubject(template.subject, data)
      });
      return null;
    }

    try {
      const { data: result } = await resend!.emails.send({
        from: options.from || EMAIL_DEFAULTS.from,
        to: [recipient],
        replyTo: options.replyTo || EMAIL_DEFAULTS.replyTo,
        subject: this.renderSubject(template.subject, data),
        react: template.component(data),
        tags: [
          { name: 'category', value: template.category },
          { name: 'template', value: template.name },
          ...(options.tags || [])
        ],
        headers: options.headers,
        scheduledAt: options.scheduledAt,
      });

      console.log(`[EMAIL] Sent ${template.name} to ${recipient}, ID: ${result?.id}`);
      return result?.id || null;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('[EMAIL] Send failed:', {
        template: template.name,
        recipient,
        error: errorMessage
      });
      throw new EmailSendError(`Failed to send ${template.name}: ${errorMessage}`, error);
    }
  }

  /**
   * Send multiple emails in batch
   */
  async sendBatch(emails: BatchEmailRequest[]): Promise<BatchEmailResult> {
    if (!isEmailServiceAvailable()) {
      console.log('[EMAIL] Service not configured - would send batch:', emails.length, 'emails');
      return {
        successful: 0,
        failed: emails.length,
        results: emails.map(() => ({ 
          status: 'rejected' as const, 
          reason: new Error('Email service not configured') 
        }))
      };
    }

    console.log(`[EMAIL] Sending batch of ${emails.length} emails`);

    const results = await Promise.allSettled(
      emails.map(email => this.sendTransactional(
        email.template,
        email.recipient,
        email.data
      ))
    );

    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;

    console.log(`[EMAIL] Batch complete: ${successful} successful, ${failed} failed`);

    return {
      successful,
      failed,
      results,
    };
  }

  /**
   * Send a simple text email (utility method)
   */
  async sendSimple(
    to: string,
    subject: string,
    text: string,
    options: EmailSendOptions = {}
  ): Promise<string | null> {
    if (!isEmailServiceAvailable()) {
      console.log('[EMAIL] Service not configured - would send simple email:', { to, subject });
      return null;
    }

    try {
      const { data: result } = await resend!.emails.send({
        from: options.from || EMAIL_DEFAULTS.from,
        to: [to],
        replyTo: options.replyTo || EMAIL_DEFAULTS.replyTo,
        subject,
        text,
        tags: [
          { name: 'category', value: 'transactional' },
          { name: 'template', value: 'simple-text' },
          ...(options.tags || [])
        ],
        headers: options.headers,
        scheduledAt: options.scheduledAt,
      });

      console.log(`[EMAIL] Sent simple email to ${to}, ID: ${result?.id}`);
      return result?.id || null;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('[EMAIL] Simple email send failed:', { to, subject, error: errorMessage });
      throw new EmailSendError(`Failed to send simple email: ${errorMessage}`, error);
    }
  }

  /**
   * Render email subject with template variables
   */
  private renderSubject(template: string, data: EmailData): string {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      const value = data[key];
      return value?.toString() || match;
    });
  }

  /**
   * Get email service status
   */
  getServiceStatus() {
    return {
      available: isEmailServiceAvailable(),
      configured: !!resend,
      from: EMAIL_DEFAULTS.from,
      replyTo: EMAIL_DEFAULTS.replyTo
    };
  }
}

// Export singleton instance
export const emailService = new EmailService();