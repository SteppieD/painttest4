import { NextRequest, NextResponse } from 'next/server';
import { n8nService } from '@/lib/services/n8n-integration-service';
import { getCompanyFromRequest } from '@/lib/auth/simple-auth';

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const company = await getCompanyFromRequest(request);
    if (!company) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Test N8N connection
    const result = await n8nService.testConnection();
    
    return NextResponse.json({
      success: result.connected,
      message: result.message,
      details: result.details,
      isConfigured: n8nService.isConfigured(),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error testing N8N connection:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to test N8N connection',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const company = await getCompanyFromRequest(request);
    if (!company) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { workflowType, testData } = body;

    if (!workflowType) {
      return NextResponse.json(
        { error: 'Workflow type is required' },
        { status: 400 }
      );
    }

    // Get company ID from auth
    const companyId = company.id;

    // Create test data based on workflow type
    const defaultTestData: Record<string, unknown> = {
      payment_success: {
        companyId,
        amount: 99.99,
        currency: 'usd',
        invoiceNumber: 'TEST-001',
        customerEmail: company.email || 'test@example.com',
        customerName: 'Test Company',
        subscriptionPlan: 'professional',
        nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      },
      payment_failed: {
        companyId,
        amount: 99.99,
        currency: 'usd',
        invoiceNumber: 'TEST-002',
        customerEmail: company.email || 'test@example.com',
        customerName: 'Test Company',
        failureReason: 'Card declined',
        attemptCount: 1,
        nextRetryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      },
      subscription_created: {
        companyId,
        plan: 'professional',
        billingPeriod: 'monthly' as const,
        customerEmail: company.email || 'test@example.com',
        customerName: 'Test Company'
      },
      quote_created: {
        companyId,
        quoteId: 'test-quote-123',
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
        totalAmount: 2500,
        projectType: 'Interior Painting'
      },
      usage_limit_warning: {
        companyId,
        currentUsage: 40,
        limit: 50,
        percentageUsed: 80,
        customerEmail: company.email || 'test@example.com'
      }
    };

    const data = testData || defaultTestData[workflowType as keyof typeof defaultTestData];

    if (!data) {
      return NextResponse.json(
        { error: 'Invalid workflow type' },
        { status: 400 }
      );
    }

    // Trigger the workflow
    const success = await n8nService.triggerWorkflow(workflowType as any, data);

    return NextResponse.json({
      success,
      message: success 
        ? `Test workflow '${workflowType}' triggered successfully` 
        : `Failed to trigger workflow '${workflowType}'`,
      workflowType,
      dataSent: data,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error triggering test workflow:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to trigger test workflow',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}