import React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Link,
  Button,
  Img,
  Hr,
} from '@react-email/components';
import { CompanyEmailData } from '../types';

interface WelcomeEmailProps extends CompanyEmailData {
  loginUrl?: string;
  dashboardUrl?: string;
}

export function WelcomeEmail({
  companyName,
  contactName,
  accessCode,
  loginUrl = 'https://paintquotepro.com/login',
  dashboardUrl = 'https://paintquotepro.com/dashboard'
}: WelcomeEmailProps) {
  const previewText = `Welcome to PaintQuote Pro, ${contactName}! Your painting business just got smarter.`;

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Img
              src="https://paintquotepro.com/logo.png"
              width="150"
              height="40"
              alt="PaintQuote Pro"
              style={logo}
            />
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Text style={heading}>
              Welcome to PaintQuote Pro, {contactName}!
            </Text>
            
            <Text style={paragraph}>
              Thank you for joining PaintQuote Pro. Your painting business is about to get a whole lot smarter with AI-powered quote generation.
            </Text>

            <Text style={paragraph}>
              <strong>Your Company:</strong> {companyName}<br />
              <strong>Access Code:</strong> <code style={code}>{accessCode}</code>
            </Text>

            <Section style={buttonContainer}>
              <Button style={button} href={dashboardUrl}>
                Get Started Now
              </Button>
            </Section>

            <Text style={paragraph}>
              Here's what you can do with PaintQuote Pro:
            </Text>

            <ul style={list}>
              <li style={listItem}>✨ Generate professional quotes in minutes with AI</li>
              <li style={listItem}>📊 Track your quote performance and conversion rates</li>
              <li style={listItem}>🎨 Customize quotes with your branding</li>
              <li style={listItem}>📱 Access everything from your phone or computer</li>
            </ul>

            <Hr style={hr} />

            <Text style={helpText}>
              Need help getting started? Just reply to this email or visit our{' '}
              <Link href="https://paintquotepro.com/help" style={link}>
                help center
              </Link>.
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              © 2024 PaintQuote Pro. All rights reserved.
            </Text>
            <Text style={footerText}>
              <Link href="https://paintquotepro.com/unsubscribe" style={footerLink}>
                Unsubscribe
              </Link>
              {' • '}
              <Link href="https://paintquotepro.com/privacy" style={footerLink}>
                Privacy Policy
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const header = {
  padding: '32px 24px',
  textAlign: 'center' as const,
};

const logo = {
  margin: '0 auto',
};

const content = {
  padding: '0 24px',
};

const heading = {
  fontSize: '28px',
  fontWeight: 'bold',
  color: '#1f2937',
  textAlign: 'center' as const,
  margin: '0 0 24px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#374151',
  margin: '0 0 16px',
};

const code = {
  backgroundColor: '#f3f4f6',
  padding: '4px 8px',
  borderRadius: '4px',
  fontFamily: 'monospace',
  fontSize: '14px',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#3b82f6',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
};

const list = {
  margin: '0 0 16px',
  paddingLeft: '0',
};

const listItem = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#374151',
  margin: '0 0 8px',
  listStyle: 'none',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '32px 0',
};

const helpText = {
  fontSize: '14px',
  lineHeight: '24px',
  color: '#6b7280',
  margin: '0 0 16px',
};

const link = {
  color: '#3b82f6',
  textDecoration: 'underline',
};

const footer = {
  padding: '24px',
  textAlign: 'center' as const,
};

const footerText = {
  fontSize: '12px',
  lineHeight: '16px',
  color: '#9ca3af',
  margin: '0 0 8px',
};

const footerLink = {
  color: '#9ca3af',
  textDecoration: 'underline',
};