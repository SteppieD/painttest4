/**
 * N8N Integration Service
 * Handles communication between PaintQuote Pro and N8N workflows
 */

import { SupabaseAdapterFixed } from '@/lib/database/supabase-adapter-fixed';

export interface N8NWebhookPayload {
  workflowId: string;
  eventType: string;
  data: Record<string, unknown>;
  metadata?: {
    companyId?: number;
    userId?: string;
    timestamp?: string;
    retryCount?: number;
  };
}

export interface N8NWorkflowTrigger {
  payment_success: {
    companyId: number;
    amount: number;
    currency: string;
    invoiceNumber: string;
    invoiceUrl?: string;
    customerEmail: string;
    customerName: string;
    subscriptionPlan: string;
    nextBillingDate: Date;
  };
  payment_failed: {
    companyId: number;
    amount: number;
    currency: string;
    invoiceNumber: string;
    customerEmail: string;
    customerName: string;
    failureReason: string;
    attemptCount: number;
    nextRetryDate?: Date;
  };
  subscription_created: {
    companyId: number;
    plan: string;
    billingPeriod: 'monthly' | 'yearly';
    customerEmail: string;
    customerName: string;
    trialEndsAt?: Date;
  };
  subscription_updated: {
    companyId: number;
    oldPlan: string;
    newPlan: string;
    customerEmail: string;
    customerName: string;
    effectiveDate: Date;
  };
  subscription_cancelled: {
    companyId: number;
    plan: string;
    customerEmail: string;
    customerName: string;
    cancellationDate: Date;
    reason?: string;
  };
  quote_created: {
    companyId: number;
    quoteId: string;
    customerName: string;
    customerEmail: string;
    totalAmount: number;
    projectType: string;
  };
  quote_accepted: {
    companyId: number;
    quoteId: string;
    customerName: string;
    customerEmail: string;
    acceptedDate: Date;
  };
  usage_limit_warning: {
    companyId: number;
    currentUsage: number;
    limit: number;
    percentageUsed: number;
    customerEmail: string;
  };
}

export class N8NIntegrationService {
  private baseUrl: string;
  private apiKey?: string;
  private db: SupabaseAdapterFixed;
  private retryAttempts = 3;
  private retryDelay = 1000; // ms

  constructor() {
    this.baseUrl = process.env.N8N_WEBHOOK_BASE_URL || '';
    this.apiKey = process.env.N8N_API_KEY;
    this.db = new SupabaseAdapterFixed();
    
    if (!this.baseUrl) {
      console.warn('[N8N] No webhook base URL configured. N8N integration disabled.');
    }
  }

  /**
   * Check if N8N integration is configured
   */
  isConfigured(): boolean {
    return !!this.baseUrl;
  }

  /**
   * Trigger a specific N8N workflow
   */
  async triggerWorkflow<K extends keyof N8NWorkflowTrigger>(
    workflowType: K,
    data: N8NWorkflowTrigger[K]
  ): Promise<boolean> {
    if (!this.isConfigured()) {
      console.log(`[N8N] Would trigger ${workflowType} workflow but N8N not configured`);
      return false;
    }

    const webhookUrl = this.getWebhookUrl(workflowType);
    const payload: N8NWebhookPayload = {
      workflowId: workflowType,
      eventType: workflowType,
      data,
      metadata: {
        companyId: (data as any).companyId,
        timestamp: new Date().toISOString(),
        retryCount: 0
      }
    };

    // Log the event
    await this.logWorkflowTrigger(workflowType, payload);

    // Send to N8N with retry logic
    return await this.sendWithRetry(webhookUrl, payload);
  }

  /**
   * Send webhook with retry logic
   */
  private async sendWithRetry(
    url: string, 
    payload: N8NWebhookPayload, 
    attempt = 1
  ): Promise<boolean> {
    try {
      console.log(`[N8N] Sending webhook to ${url} (attempt ${attempt}/${this.retryAttempts})`);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.apiKey && { 'X-N8N-API-KEY': this.apiKey })
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        console.log(`[N8N] Webhook sent successfully for ${payload.workflowId}`);
        await this.updateWorkflowStatus(payload, 'success');
        return true;
      }

      // Handle specific error codes
      if (response.status === 404) {
        console.error(`[N8N] Workflow not found: ${payload.workflowId}`);
        await this.updateWorkflowStatus(payload, 'workflow_not_found');
        return false;
      }

      if (response.status === 401) {
        console.error('[N8N] Authentication failed. Check N8N_API_KEY');
        await this.updateWorkflowStatus(payload, 'auth_failed');
        return false;
      }

      // Retry for other errors
      if (attempt < this.retryAttempts) {
        console.warn(`[N8N] Request failed with status ${response.status}. Retrying...`);
        await new Promise(resolve => setTimeout(resolve, this.retryDelay * attempt));
        payload.metadata!.retryCount = attempt;
        return await this.sendWithRetry(url, payload, attempt + 1);
      }

      console.error(`[N8N] Failed after ${this.retryAttempts} attempts`);
      await this.updateWorkflowStatus(payload, 'failed');
      return false;

    } catch (error) {
      console.error(`[N8N] Error sending webhook:`, error);
      
      if (attempt < this.retryAttempts) {
        await new Promise(resolve => setTimeout(resolve, this.retryDelay * attempt));
        payload.metadata!.retryCount = attempt;
        return await this.sendWithRetry(url, payload, attempt + 1);
      }
      
      await this.updateWorkflowStatus(payload, 'error', error);
      return false;
    }
  }

  /**
   * Get the webhook URL for a specific workflow type
   */
  private getWebhookUrl(workflowType: string): string {
    // Map workflow types to N8N webhook paths
    const webhookPaths: Record<string, string> = {
      payment_success: '/webhook/payment-success',
      payment_failed: '/webhook/payment-failed',
      subscription_created: '/webhook/subscription-created',
      subscription_updated: '/webhook/subscription-updated',
      subscription_cancelled: '/webhook/subscription-cancelled',
      quote_created: '/webhook/quote-created',
      quote_accepted: '/webhook/quote-accepted',
      usage_limit_warning: '/webhook/usage-limit-warning'
    };

    const path = webhookPaths[workflowType] || `/webhook/${workflowType}`;
    return `${this.baseUrl}${path}`;
  }

  /**
   * Log workflow trigger to database
   */
  private async logWorkflowTrigger(
    workflowType: string,
    payload: N8NWebhookPayload
  ): Promise<void> {
    try {
      const { error } = await this.db.getClient()
        .from('n8n_workflow_logs')
        .insert({
          workflow_type: workflowType,
          company_id: payload.metadata?.companyId,
          payload: payload.data,
          status: 'triggered',
          triggered_at: new Date().toISOString()
        });

      if (error) {
        console.error('[N8N] Failed to log workflow trigger:', error);
      }
    } catch (error) {
      console.error('[N8N] Error logging workflow trigger:', error);
    }
  }

  /**
   * Update workflow status in database
   */
  private async updateWorkflowStatus(
    payload: N8NWebhookPayload,
    status: string,
    error?: Error | string | Record<string, unknown>
  ): Promise<void> {
    try {
      const { error: dbError } = await this.db.getClient()
        .from('n8n_workflow_logs')
        .update({
          status,
          error_message: error ? JSON.stringify(error) : null,
          completed_at: new Date().toISOString()
        })
        .eq('workflow_type', payload.workflowId)
        .eq('company_id', payload.metadata?.companyId || 0)
        .order('triggered_at', { ascending: false })
        .limit(1);

      if (dbError) {
        console.error('[N8N] Failed to update workflow status:', dbError);
      }
    } catch (error) {
      console.error('[N8N] Error updating workflow status:', error);
    }
  }

  /**
   * Test N8N connection
   */
  async testConnection(): Promise<{
    connected: boolean;
    message: string;
    details?: Record<string, unknown>;
  }> {
    if (!this.isConfigured()) {
      return {
        connected: false,
        message: 'N8N webhook URL not configured'
      };
    }

    try {
      const testUrl = `${this.baseUrl}/webhook/test`;
      const response = await fetch(testUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.apiKey && { 'X-N8N-API-KEY': this.apiKey })
        },
        body: JSON.stringify({
          test: true,
          timestamp: new Date().toISOString(),
          source: 'PaintQuote Pro'
        })
      });

      if (response.ok) {
        return {
          connected: true,
          message: 'Successfully connected to N8N',
          details: await response.json()
        };
      }

      return {
        connected: false,
        message: `N8N connection failed with status ${response.status}`,
        details: await response.text()
      };
    } catch (error) {
      return {
        connected: false,
        message: 'Failed to connect to N8N',
        details: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Get workflow execution history
   */
  async getWorkflowHistory(
    companyId: number,
    limit = 50
  ): Promise<any[]> {
    try {
      const { data, error } = await this.db.getClient()
        .from('n8n_workflow_logs')
        .select('*')
        .eq('company_id', companyId)
        .order('triggered_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('[N8N] Failed to get workflow history:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('[N8N] Error getting workflow history:', error);
      return [];
    }
  }
}

// Export singleton instance
export const n8nService = new N8NIntegrationService();