import { Resend } from 'resend';

// Validate required environment variables
function validateEmailConfig() {
  const requiredVars = {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    FROM_EMAIL: process.env.FROM_EMAIL || 'noreply@paintquotepro.com',
    FROM_NAME: process.env.FROM_NAME || 'PaintQuote Pro',
  };

  const missing = Object.entries(requiredVars)
    .filter(([key, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    console.warn(`Missing email configuration: ${missing.join(', ')}`);
    console.warn('Email functionality will be limited without proper configuration');
  }

  return requiredVars;
}

// Email configuration
export const emailConfig = validateEmailConfig();

// Initialize Resend client with graceful fallback
export const resend = emailConfig.RESEND_API_KEY 
  ? new Resend(emailConfig.RESEND_API_KEY)
  : null;

// Email defaults
export const EMAIL_DEFAULTS = {
  from: `${emailConfig.FROM_NAME} <${emailConfig.FROM_EMAIL}>`,
  replyTo: process.env.REPLY_TO_EMAIL || emailConfig.FROM_EMAIL,
} as const;

// Check if email service is available
export function isEmailServiceAvailable(): boolean {
  return !!resend && !!emailConfig.RESEND_API_KEY;
}