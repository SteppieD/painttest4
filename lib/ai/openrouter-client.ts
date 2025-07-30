import { NextRequest } from 'next/server';

export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface CompletionOptions {
  model?: string;
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
  presence_penalty?: number;
  frequency_penalty?: number;
  top_p?: number;
}

export class OpenRouterClient {
  private apiKey: string;
  private baseUrl = 'https://openrouter.ai/api/v1';
  private defaultModel = 'anthropic/claude-3.5-sonnet';

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.OPENROUTER_API_KEY || '';
    
    // Enhanced logging for debugging
    const keyStatus = {
      provided: !!apiKey,
      fromEnv: !!process.env.OPENROUTER_API_KEY,
      configured: !!this.apiKey,
      length: this.apiKey.length,
      isPlaceholder: this.apiKey === 'your_openrouter_key',
      environment: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV
    };
    
    console.log('[OpenRouter] API key configuration:', JSON.stringify(keyStatus, null, 2));
    
    // Don't throw during build time - only throw when actually trying to use the API
  }

  async createChatCompletion(
    messages: Message[],
    options: CompletionOptions = {}
  ): Promise<string> {
    if (!this.apiKey) {
      throw new Error('OpenRouter API key is required. Please set OPENROUTER_API_KEY in your environment variables.');
    }
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001',
          'X-Title': 'PaintQuote Pro'
        },
        body: JSON.stringify({
          model: options.model || this.defaultModel,
          messages,
          temperature: options.temperature ?? 0.7,
          max_tokens: options.max_tokens ?? 2000,
          stream: options.stream ?? false,
          presence_penalty: options.presence_penalty ?? 0,
          frequency_penalty: options.frequency_penalty ?? 0,
          top_p: options.top_p ?? 1
        })
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('OpenRouter API error:', error);
        throw new Error(`OpenRouter API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('Error calling OpenRouter:', error);
      throw error;
    }
  }

  async createStreamingCompletion(
    messages: Message[],
    options: CompletionOptions = {}
  ): Promise<ReadableStream> {
    if (!this.apiKey) {
      throw new Error('OpenRouter API key is required. Please set OPENROUTER_API_KEY in your environment variables.');
    }
    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001',
        'X-Title': 'PaintQuote Pro'
      },
      body: JSON.stringify({
        model: options.model || this.defaultModel,
        messages,
        temperature: options.temperature ?? 0.7,
        max_tokens: options.max_tokens ?? 2000,
        stream: true,
        presence_penalty: options.presence_penalty ?? 0,
        frequency_penalty: options.frequency_penalty ?? 0,
        top_p: options.top_p ?? 1
      })
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    return response.body!;
  }

  async getAvailableModels(): Promise<any[]> {
    try {
      const response = await fetch(`${this.baseUrl}/models`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch models: ${response.status}`);
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching models:', error);
      throw error;
    }
  }
}

// Export singleton instance with lazy initialization
let _openRouterClient: OpenRouterClient | null = null;

export const openRouterClient = {
  createChatCompletion: async (...args: Parameters<OpenRouterClient['createChatCompletion']>) => {
    if (!_openRouterClient) {
      console.log('[OpenRouter] Creating new client instance at runtime');
      _openRouterClient = new OpenRouterClient();
    }
    return _openRouterClient.createChatCompletion(...args);
  },
  
  createStreamingCompletion: async (...args: Parameters<OpenRouterClient['createStreamingCompletion']>) => {
    if (!_openRouterClient) {
      console.log('[OpenRouter] Creating new client instance at runtime');
      _openRouterClient = new OpenRouterClient();
    }
    return _openRouterClient.createStreamingCompletion(...args);
  },
  
  getAvailableModels: async (...args: Parameters<OpenRouterClient['getAvailableModels']>) => {
    if (!_openRouterClient) {
      console.log('[OpenRouter] Creating new client instance at runtime');
      _openRouterClient = new OpenRouterClient();
    }
    return _openRouterClient.getAvailableModels(...args);
  }
};