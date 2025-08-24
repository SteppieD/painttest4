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

interface QuoteExpirationEmailProps extends QuoteEmailData {
  companyName: string;
  contactName: string;
  customerEmail: string;
  daysUntilExpiration: number;
}

export function QuoteExpirationEmail(data: EmailData) {
  const {
    quoteId = 'Q001',
    customerName = 'Valued Customer',
    projectType = 'painting',
    totalAmount = '0',
    quoteUrl = '#',
    companyName = 'PaintQuote Pro',
    contactName = 'Your Painter',
    daysUntilExpiration = 7
  } = data as QuoteExpirationEmailProps;
  const previewText = `Your ${projectType} painting quote expires in ${daysUntilExpiration} days - Lock in your price today!`;

  const getUrgencyMessage = () => {
    if (daysUntilExpiration <= 1) {
      return "expires tomorrow";
    } else if (daysUntilExpiration <= 3) {
      return `expires in ${daysUntilExpiration} days`;
    } else {
      return `expires in ${daysUntilExpiration} days`;
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

          {/* Urgency Banner */}
          <Section style={urgencyBanner}>
            <Text style={urgencyBannerText}>
              ⏰ Your quote {getUrgencyMessage()}
            </Text>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Text style={greeting}>
              Hi {customerName},
            </Text>
            
            <Text style={paragraph}>
              I wanted to give you a friendly reminder that your painting quote {getUrgencyMessage()}. 
              Material costs have been rising, and I want to make sure you can still get your project 
              done at the price we originally discussed.
            </Text>

            {/* Quote Summary Box */}
            <Section style={quoteBox}>
              <Text style={quoteBoxTitle}>Your Locked-In Pricing</Text>
              <Text style={quoteDetail}>
                <strong>Project:</strong> {projectType} painting
              </Text>
              <Text style={quoteDetail}>
                <strong>Quote ID:</strong> #{quoteId}
              </Text>
              <Text style={quoteDetail}>
                <strong>Current Price:</strong> <span style={amount}>${totalAmount}</span>
              </Text>
              <Text style={expirationDetail}>
                <strong>Price valid until:</strong> {daysUntilExpiration} day{daysUntilExpiration !== 1 ? 's' : ''}
              </Text>
            </Section>

            <Text style={paragraph}>
              <strong>What happens after the quote expires?</strong>
            </Text>

            <ul style={list}>
              <li style={listItem}>📈 Material costs may increase by 5-10%</li>
              <li style={listItem}>📅 Project scheduling may be delayed</li>
              <li style={listItem}>🔄 We'll need to provide a new quote with current pricing</li>
            </ul>

            <Section style={benefitsBox}>
              <Text style={benefitsTitle}>Lock in your price today and get:</Text>
              <ul style={benefitsList}>
                <li style={benefitsItem}>✅ Guaranteed pricing for your project</li>
                <li style={benefitsItem}>📅 Priority scheduling</li>
                <li style={benefitsItem}>🎨 Free color consultation included</li>
                <li style={benefitsItem}>🛡️ Full warranty on materials and labor</li>
              </ul>
            </Section>

            <Section style={buttonContainer}>
              <Button style={primaryButton} href={quoteUrl}>
                Accept Quote & Schedule Project
              </Button>
            </Section>

            <Text style={paragraph}>
              Have questions about the project? I'm here to help! Just reply to this email 
              or give me a call. I would love to get your painting project started soon.
            </Text>

            <Text style={signature}>
              Best regards,<br />
              {contactName}<br />
              {companyName}
            </Text>

            <Hr style={hr} />

            <Text style={footerText}>
              <strong>Need more time to decide?</strong> Reply to this email and I'll extend your quote 
              for another week at no charge.
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

const urgencyBanner = {
  backgroundColor: '#dc2626',
  padding: '12px 24px',
  textAlign: 'center' as const,
};

const urgencyBannerText = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#ffffff',
  margin: '0',
};

const content = {
  padding: '24px',
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
  border: '2px solid #3b82f6',
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

const expirationDetail = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#dc2626',
  margin: '8px 0 0',
  fontWeight: '600' as const,
};

const amount = {
  color: '#059669',
  fontWeight: 'bold',
  fontSize: '20px',
};

const list = {
  margin: '0 0 16px',
  paddingLeft: '16px',
};

const listItem = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#374151',
  margin: '0 0 8px',
};

const benefitsBox = {
  backgroundColor: '#ecfdf5',
  border: '2px solid #10b981',
  borderRadius: '12px',
  padding: '24px',
  margin: '24px 0',
};

const benefitsTitle = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#065f46',
  margin: '0 0 16px',
};

const benefitsList = {
  margin: '0',
  paddingLeft: '0',
};

const benefitsItem = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#065f46',
  margin: '0 0 8px',
  listStyle: 'none',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const primaryButton = {
  backgroundColor: '#dc2626',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '18px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '16px 32px',
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
  padding: '16px',
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
};