import { EmailTemplate, EmailData } from '../types';
import { WelcomeEmail } from './WelcomeEmail';
import { QuoteCreatedEmail } from './QuoteCreatedEmail';
import { QuoteFollowUpEmail } from './QuoteFollowUpEmail';
import { QuoteExpirationEmail } from './QuoteExpirationEmail';
import { ProjectCompletionEmail } from './ProjectCompletionEmail';

// Template registry
export const EMAIL_TEMPLATES = {
  WELCOME: {
    name: 'welcome',
    subject: 'Welcome to PaintQuote Pro, {{contactName}}! 🎨',
    category: 'transactional',
    component: WelcomeEmail,
  } as EmailTemplate,

  QUOTE_CREATED: {
    name: 'quote-created',
    subject: 'Quote #{{quoteId}} Created - ${{totalAmount}} for {{customerName}}',
    category: 'notification',
    component: QuoteCreatedEmail,
  } as EmailTemplate,

  QUOTE_FOLLOW_UP_1: {
    name: 'quote-follow-up-1',
    subject: '{{customerName}}, questions about your {{projectType}} painting quote?',
    category: 'marketing',
    component: QuoteFollowUpEmail,
  } as EmailTemplate,

  QUOTE_FOLLOW_UP_2: {
    name: 'quote-follow-up-2',
    subject: 'Still thinking about your painting project, {{customerName}}?',
    category: 'marketing',
    component: QuoteFollowUpEmail,
  } as EmailTemplate,

  QUOTE_FOLLOW_UP_3: {
    name: 'quote-follow-up-3',
    subject: 'Last chance: Your {{projectType}} painting quote expires soon',
    category: 'marketing',
    component: QuoteFollowUpEmail,
  } as EmailTemplate,

  QUOTE_EXPIRATION: {
    name: 'quote-expiration',
    subject: 'Your {{projectType}} painting quote expires in {{daysUntilExpiration}} days',
    category: 'transactional',
    component: QuoteExpirationEmail,
  } as EmailTemplate,

  PROJECT_COMPLETION: {
    name: 'project-completion',
    subject: 'Thank you for choosing {{companyName}}! 🌟',
    category: 'transactional',
    component: ProjectCompletionEmail,
  } as EmailTemplate,
} as const;

// Template helper functions
export function getTemplate(templateName: keyof typeof EMAIL_TEMPLATES): EmailTemplate {
  const template = EMAIL_TEMPLATES[templateName];
  if (!template) {
    throw new Error(`Email template '${templateName}' not found`);
  }
  return template;
}

export function listTemplates(): string[] {
  return Object.keys(EMAIL_TEMPLATES);
}

// Export individual templates for direct use
export { 
  WelcomeEmail, 
  QuoteCreatedEmail, 
  QuoteFollowUpEmail, 
  QuoteExpirationEmail,
  ProjectCompletionEmail 
};