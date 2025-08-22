import { ReactElement } from 'react';

// Core email data interface
export interface EmailData {
  [key: string]: string | number | boolean | undefined;
}

// Email template interface
export interface EmailTemplate {
  name: string;
  subject: string;
  category: 'transactional' | 'marketing' | 'notification';
  component: (data: EmailData) => ReactElement;
}

// Batch email request
export interface BatchEmailRequest {
  template: EmailTemplate;
  recipient: string;
  data: EmailData;
}

// Batch email result
export interface BatchEmailResult {
  successful: number;
  failed: number;
  results: PromiseSettledResult<string | null>[];
}

// Email sending options
export interface EmailSendOptions {
  from?: string;
  replyTo?: string;
  tags?: Array<{ name: string; value: string }>;
  headers?: Record<string, string>;
  scheduledAt?: string;
}

// Email send error
export class EmailSendError extends Error {
  constructor(message: string, public originalError?: unknown) {
    super(message);
    this.name = 'EmailSendError';
  }
}

// Webhook event types
export interface ResendWebhookEvent {
  type: 'email.delivered' | 'email.bounced' | 'email.clicked' | 'email.opened' | 'email.complained';
  created_at: string;
  data: {
    email_id: string;
    to: string;
    from: string;
    subject: string;
    tags?: Array<{ name: string; value: string }>;
  };
}

// Company-specific email data
export interface CompanyEmailData extends EmailData {
  companyName: string;
  contactName: string;
  contactEmail: string;
  accessCode: string;
}

// Quote-specific email data
export interface QuoteEmailData extends EmailData {
  quoteId: string;
  customerName: string;
  projectType: string;
  totalAmount: string;
  quoteUrl: string;
}