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

interface ProjectCompletionEmailProps {
  customerName: string;
  projectType: string;
  companyName: string;
  contactName: string;
  totalAmount: string;
  projectDuration: string;
  reviewUrl?: string;
  referralIncentive?: string;
}

export function ProjectCompletionEmail({
  customerName,
  projectType,
  companyName,
  contactName,
  totalAmount,
  projectDuration,
  reviewUrl = '#',
  referralIncentive = '10% off their first project'
}: ProjectCompletionEmailProps) {
  const previewText = `Thank you for choosing ${companyName}! We'd love your feedback on your ${projectType} project.`;

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
            <Text style={completionBadge}>
              ✅ Project Complete!
            </Text>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Text style={greeting}>
              Dear {customerName},
            </Text>
            
            <Text style={paragraph}>
              Thank you for trusting {companyName} with your {projectType} painting project! 
              It was a pleasure working with you, and we hope you're absolutely thrilled 
              with the transformation.
            </Text>

            {/* Project Summary */}
            <Section style={projectBox}>
              <Text style={projectTitle}>Your Project Summary</Text>
              <Text style={projectDetail}>
                <strong>Project:</strong> {projectType} painting
              </Text>
              <Text style={projectDetail}>
                <strong>Completed in:</strong> {projectDuration}
              </Text>
              <Text style={projectDetail}>
                <strong>Investment:</strong> <span style={amount}>${totalAmount}</span>
              </Text>
            </Section>

            <Text style={paragraph}>
              <strong>Your satisfaction is our top priority.</strong> If you notice anything 
              that needs our attention, please don&apos;t hesitate to reach out. We stand behind 
              our work with a full warranty.
            </Text>

            {/* Review Request */}
            <Section style={reviewBox}>
              <Text style={reviewTitle}>🌟 How did we do?</Text>
              <Text style={reviewText}>
                Your feedback helps us serve future customers better and helps other homeowners 
                find quality painting contractors. Would you mind sharing your experience?
              </Text>
              
              <Section style={buttonContainer}>
                <Button style={reviewButton} href={reviewUrl}>
                  Leave a Review
                </Button>
              </Section>
            </Section>

            {/* Referral Program */}
            <Section style={referralBox}>
              <Text style={referralTitle}>💰 Earn Rewards for Referrals</Text>
              <Text style={referralText}>
                Know someone who could use quality painting services? When you refer 
                friends or family to {companyName}, they&apos;ll receive {referralIncentive}, 
                and you&apos;ll get a <strong>$100 credit</strong> toward your next project!
              </Text>
              
              <ul style={referralList}>
                <li style={referralItem}>🏠 Interior or exterior painting</li>
                <li style={referralItem}>🎨 Cabinet refinishing</li>
                <li style={referralItem}>🔧 Drywall repair and painting</li>
                <li style={referralItem}>✨ Deck staining and restoration</li>
              </ul>

              <Text style={referralCta}>
                Just have them mention your name when they call, or forward this email!
              </Text>
            </Section>

            {/* Care Instructions */}
            <Section style={careBox}>
              <Text style={careTitle}>🧽 Keeping Your Paint Looking Great</Text>
              <ul style={careList}>
                <li style={careItem}>Wait 30 days before washing painted surfaces</li>
                <li style={careItem}>Use mild soap and water for cleaning</li>
                <li style={careItem}>Touch up any minor scuffs within the first year</li>
                <li style={careItem}>Schedule annual inspections for exterior paint</li>
              </ul>
            </Section>

            <Text style={paragraph}>
              Thank you again for choosing {companyName}. We look forward to helping 
              you with future painting projects and hope you&apos;ll recommend us to friends and family!
            </Text>

            <Text style={signature}>
              With gratitude,<br />
              {contactName}<br />
              {companyName}
            </Text>

            <Hr style={hr} />

            <Text style={footerText}>
              <strong>Questions about your warranty or need touch-ups?</strong><br />
              Reply to this email or call us anytime. We're here to help!
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
  margin: '0 0 8px',
};

const completionBadge = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#059669',
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

const projectBox = {
  backgroundColor: '#f8fafc',
  border: '2px solid #e2e8f0',
  borderRadius: '12px',
  padding: '24px',
  margin: '24px 0',
};

const projectTitle = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#1f2937',
  margin: '0 0 16px',
};

const projectDetail = {
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

const reviewBox = {
  backgroundColor: '#fef3c7',
  border: '2px solid #f59e0b',
  borderRadius: '12px',
  padding: '24px',
  margin: '24px 0',
  textAlign: 'center' as const,
};

const reviewTitle = {
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#92400e',
  margin: '0 0 16px',
};

const reviewText = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#92400e',
  margin: '0 0 20px',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '20px 0',
};

const reviewButton = {
  backgroundColor: '#f59e0b',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px 24px',
};

const referralBox = {
  backgroundColor: '#ecfdf5',
  border: '2px solid #10b981',
  borderRadius: '12px',
  padding: '24px',
  margin: '24px 0',
};

const referralTitle = {
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#065f46',
  margin: '0 0 16px',
};

const referralText = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#065f46',
  margin: '0 0 16px',
};

const referralList = {
  margin: '0 0 16px',
  paddingLeft: '0',
};

const referralItem = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#065f46',
  margin: '0 0 8px',
  listStyle: 'none',
};

const referralCta = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#065f46',
  margin: '16px 0 0',
  textAlign: 'center' as const,
};

const careBox = {
  backgroundColor: '#f0f9ff',
  border: '2px solid #0ea5e9',
  borderRadius: '12px',
  padding: '24px',
  margin: '24px 0',
};

const careTitle = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#0c4a6e',
  margin: '0 0 16px',
};

const careList = {
  margin: '0',
  paddingLeft: '16px',
};

const careItem = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#0c4a6e',
  margin: '0 0 8px',
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