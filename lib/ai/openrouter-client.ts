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
    if (!this.apiKey) {
      console.warn('OpenRouter API key not configured');
    }
  }

  async createChatCompletion(
    messages: Message[],
    options: CompletionOptions = {}
  ): Promise<string> {
    if (!this.apiKey) {
      return this.getMockResponse(messages);
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
      return this.getMockResponse(messages);
    }
  }

  async createStreamingCompletion(
    messages: Message[],
    options: CompletionOptions = {}
  ): Promise<ReadableStream> {
    if (!this.apiKey) {
      return this.getMockStream(messages);
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
    if (!this.apiKey) {
      return this.getMockModels();
    }

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
      return this.getMockModels();
    }
  }

  // Mock responses for development/testing
  private getMockResponse(messages: Message[]): string {
    const lastMessage = messages[messages.length - 1];
    
    if (lastMessage.content.toLowerCase().includes('quote')) {
      return "I'd be happy to help you create a painting quote. To get started, could you tell me:\n\n1. What type of project is this? (interior/exterior)\n2. What's the customer's name and address?\n3. What surfaces need to be painted?\n\nOnce I have this information, I can help you generate a professional quote.";
    }
    
    if (lastMessage.content.toLowerCase().includes('price') || lastMessage.content.toLowerCase().includes('cost')) {
      return "Based on the information provided, I can help calculate the pricing. For a typical room, you might expect:\n\n- Materials: $200-400\n- Labor: $300-500\n- Total: $500-900\n\nWould you like me to create a more detailed estimate?";
    }
    
    return "I understand you're looking for painting quote assistance. I can help with:\n\n- Creating professional quotes\n- Calculating material and labor costs\n- Managing customer information\n- Tracking project details\n\nWhat would you like help with today?";
  }

  private getMockStream(messages: Message[]): ReadableStream {
    const response = this.getMockResponse(messages);
    const encoder = new TextEncoder();
    
    return new ReadableStream({
      start(controller) {
        const words = response.split(' ');
        let index = 0;
        
        const interval = setInterval(() => {
          if (index < words.length) {
            const chunk = `data: {"choices":[{"delta":{"content":"${words[index]} "}}]}\n\n`;
            controller.enqueue(encoder.encode(chunk));
            index++;
          } else {
            controller.enqueue(encoder.encode('data: [DONE]\n\n'));
            controller.close();
            clearInterval(interval);
          }
        }, 50);
      }
    });
  }

  private getMockModels(): any[] {
    return [
      { id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet' },
      { id: 'openai/gpt-4', name: 'GPT-4' },
      { id: 'google/gemini-pro', name: 'Gemini Pro' }
    ];
  }
}

// Export singleton instance
export const openRouterClient = new OpenRouterClient();