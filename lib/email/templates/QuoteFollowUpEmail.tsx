import React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
} from '@react-email/components';
import { EmailData, QuoteEmailData } from '../types';

interface QuoteFollowUpEmailProps extends QuoteEmailData {
  companyName: string;
  contactName: string;
  customerEmail: string;
  daysSinceQuote: number;
  followUpNumber: number;
}

export function QuoteFollowUpEmail(data: EmailData) {
  const {
    quoteId = 'Q001',
    customerName = 'Valued Customer',
    projectType = 'painting',
    totalAmount = '0',
    quoteUrl = '#',
    companyName = 'PaintQuote Pro',
    contactName = 'Your Painter',
    daysSinceQuote = 3,
    followUpNumber = 1
  } = data as QuoteFollowUpEmailProps;
  const getSubjectLine = () => {
    switch (followUpNumber) {
      case 1:
        return `${customerName}, questions about your ${projectType} painting quote?`;
      case 2:
        return `Still thinking about your painting project, ${customerName}?`;
      case 3:
        return `Last chance: Your ${projectType} painting quote expires soon`;
      default:
        return `Follow up on your painting quote #${quoteId}`;
    }
  };

  const getMainMessage = () => {
    switch (followUpNumber) {
      case 1:
        return `I wanted to follow up on the painting quote I sent you ${daysSinceQuote} days ago. Do you have any questions about the project or pricing?`;
      case 2:
        return `I understand that choosing a painting contractor is an important decision. I'd love to address any concerns you might have about your ${projectType} project.`;
      case 3:
        return `This is my final follow-up regarding your painting quote. The pricing I provided is valid for another 7 days, after which material costs may change.`;
      default:
        return `I wanted to check in about your painting project quote.`;
    }
  };

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Text style={companyHeader}>
              {companyName}
            </Text>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Text style={greeting}>
              Hi {customerName},
            </Text>
            
            <Text style={paragraph}>
              {getMainMessage()}
            </Text>

            {/* Quote Summary Box */}
            <Section style={quoteBox}>
              <Text style={quoteBoxTitle}>Your Quote Summary</Text>
              <Text style={quoteDetail}>
                <strong>Project:</strong> {projectType} painting
              </Text>
              <Text style={quoteDetail}>
                <strong>Quote ID:</strong> #{quoteId}
              </Text>
              <Text style={quoteDetail}>
                <strong>Total Investment:</strong> <span style={amount}>${totalAmount}</span>
              </Text>
            </Section>

            {followUpNumber === 1 && (
              <>
                <Text style={paragraph}>
                  <strong>Common questions I often get:</strong>
                </Text>
                <ul style={list}>
                  <li style={listItem}>📋 What's included in the price?</li>
                  <li style={listItem}>🎨 Can we adjust colors or finishes?</li>
                  <li style={listItem}>📅 When can we start the project?</li>
                  <li style={listItem}>🛡️ What warranty do you provide?</li>
                </ul>
              </>
            )}

            {followUpNumber === 2 && (
              <>
                <Text style={paragraph}>
                  <strong>Why choose {companyName}?</strong>
                </Text>
                <ul style={list}>
                  <li style={listItem}>✅ Licensed and insured professionals</li>
                  <li style={listItem}>🎨 High-quality materials and finishes</li>
                  <li style={listItem}>⏰ On-time project completion guarantee</li>
                  <li style={listItem}>💯 100% satisfaction guarantee</li>
                </ul>
              </>
            )}

            {followUpNumber === 3 && (
              <Section style={urgencyBox}>
                <Text style={urgencyText}>
                  ⏰ <strong>Quote expires in 7 days</strong> - Material prices are subject to change after this date.
                </Text>
              </Section>
            )}

            <Section style={buttonContainer}>
              <Button style={primaryButton} href={quoteUrl}>
                View Complete Quote
              </Button>
            </Section>

            <Text style={paragraph}>
              Have questions? Just reply to this email or call me directly. I'm here to help make your painting project a success.
            </Text>

            <Text style={signature}>
              Best regards,<br />
              {contactName}<br />
              {companyName}
            </Text>

            <Hr style={hr} />

            <Text style={footerText}>
              <strong>Ready to move forward?</strong> Reply to this email or call us to schedule your project start date.
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
  maxWidth: '600px',
};

const header = {
  padding: '32px 24px 16px',
  textAlign: 'center' as const,
};

const companyHeader = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#1f2937',
  margin: '0',
};

const content = {
  padding: '0 24px',
};

const greeting = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#1f2937',
  margin: '0 0 16px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#374151',
  margin: '0 0 16px',
};

const quoteBox = {
  backgroundColor: '#f8fafc',
  border: '2px solid #e2e8f0',
  borderRadius: '12px',
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

const urgencyBox = {
  backgroundColor: '#fef3c7',
  border: '2px solid #f59e0b',
  borderRadius: '8px',
  padding: '16px',
  margin: '24px 0',
  textAlign: 'center' as const,
};

const urgencyText = {
  fontSize: '16px',
  color: '#92400e',
  margin: '0',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const primaryButton = {
  backgroundColor: '#3b82f6',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px 24px',
};

const signature = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#374151',
  margin: '24px 0 16px',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '32px 0',
};

const footerText = {
  fontSize: '14px',
  lineHeight: '22px',
  color: '#6b7280',
  textAlign: 'center' as const,
  margin: '0',
};