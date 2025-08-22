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
import { QuoteEmailData } from '../types';

interface QuoteCreatedEmailProps extends QuoteEmailData {
  companyName: string;
  contactName: string;
}

export function QuoteCreatedEmail({
  quoteId,
  customerName,
  projectType,
  totalAmount,
  quoteUrl,
  companyName,
  contactName
}: QuoteCreatedEmailProps) {
  const previewText = `Quote #${quoteId} created for ${customerName} - $${totalAmount}`;

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
              Quote Created Successfully! 🎉
            </Text>
            
            <Text style={paragraph}>
              Hi {contactName},
            </Text>

            <Text style={paragraph}>
              Great news! Your quote has been created and is ready to share with your customer.
            </Text>

            {/* Quote Details Box */}
            <Section style={quoteBox}>
              <Text style={quoteBoxTitle}>Quote Details</Text>
              <Text style={quoteDetail}>
                <strong>Quote ID:</strong> #{quoteId}
              </Text>
              <Text style={quoteDetail}>
                <strong>Customer:</strong> {customerName}
              </Text>
              <Text style={quoteDetail}>
                <strong>Project Type:</strong> {projectType}
              </Text>
              <Text style={quoteDetail}>
                <strong>Total Amount:</strong> <span style={amount}>${totalAmount}</span>
              </Text>
            </Section>

            <Section style={buttonContainer}>
              <Button style={viewButton} href={quoteUrl}>
                View Quote
              </Button>
            </Section>

            <Text style={paragraph}>
              <strong>Next Steps:</strong>
            </Text>

            <ul style={list}>
              <li style={listItem}>📧 Share the quote link with {customerName}</li>
              <li style={listItem}>📱 Follow up in 2-3 days if no response</li>
              <li style={listItem}>💰 Convert the quote to a project when accepted</li>
              <li style={listItem}>⭐ Ask for a review after project completion</li>
            </ul>

            <Hr style={hr} />

            <Text style={tipBox}>
              <strong>💡 Pro Tip:</strong> Quotes sent within 24 hours of initial contact have a 40% higher acceptance rate!
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              © 2024 PaintQuote Pro. All rights reserved.
            </Text>
            <Text style={footerText}>
              <Link href="https://paintquotepro.com/dashboard" style={footerLink}>
                Dashboard
              </Link>
              {' • '}
              <Link href="https://paintquotepro.com/help" style={footerLink}>
                Help Center
              </Link>
              {' • '}
              <Link href="https://paintquotepro.com/unsubscribe" style={footerLink}>
                Unsubscribe
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

const quoteBox = {
  backgroundColor: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 0',
};

const quoteBoxTitle = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#1f2937',
  margin: '0 0 16px',
};

const quoteDetail = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#374151',
  margin: '0 0 8px',
};

const amount = {
  color: '#059669',
  fontWeight: 'bold',
  fontSize: '18px',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const viewButton = {
  backgroundColor: '#059669',
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

const tipBox = {
  backgroundColor: '#fef3c7',
  border: '1px solid #f59e0b',
  borderRadius: '8px',
  padding: '16px',
  fontSize: '14px',
  lineHeight: '22px',
  color: '#92400e',
  margin: '16px 0',
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