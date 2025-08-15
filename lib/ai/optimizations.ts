// Performance optimizations for AI integration

import { ConversationMessage } from './quote-assistant';
import { PaintProduct } from '../database/adapter';

export class ChatOptimizer {
  private static readonly MAX_CONTEXT_TOKENS = 3000;
  private static readonly MAX_HISTORY_MESSAGES = 20;
  
  // Optimize conversation context for token efficiency
  static optimizeContext(conversationHistory: ConversationMessage[]): ConversationMessage[] {
    // Keep only essential messages
    if (conversationHistory.length <= this.MAX_HISTORY_MESSAGES) {
      return conversationHistory;
    }
    
    // Keep first message (intro) and last N messages
    const firstMessage = conversationHistory[0];
    const recentMessages = conversationHistory.slice(-this.MAX_HISTORY_MESSAGES + 1);
    
    return [firstMessage, ...recentMessages];
  }
  
  // Estimate token count for context management
  static estimateTokens(text: string): number {
    // Rough estimation: 4 characters per token
    return Math.ceil(text.length / 4);
  }
  
  // Compress paint product context for efficiency
  static compressPaintContext(paintProducts: PaintProduct[]): string {
    if (paintProducts.length === 0) return 'No preferred paints configured';
    
    const summarized = paintProducts
      .slice(0, 5) // Limit to top 5 products
      .map(p => `${p.product_name}: $${p.cost_per_gallon}/gal, ${p.coverage_rate} sqft/gal`)
      .join('; ');
      
    const additional = paintProducts.length > 5 ? ` + ${paintProducts.length - 5} more` : '';
    return summarized + additional;
  }
}

// Caching layer for frequently accessed data
export class AICache {
  private static cache = new Map<string, { data: any; expires: number }>();
  private static readonly TTL = 5 * 60 * 1000; // 5 minutes
  
  static set(key: string, data: any): void {
    this.cache.set(key, {
      data,
      expires: Date.now() + this.TTL
    });
  }
  
  static get(key: string): any | null {
    const item = this.cache.get(key);
    if (!item || Date.now() > item.expires) {
      this.cache.delete(key);
      return null;
    }
    return item.data;
  }
  
  static clear(): void {
    this.cache.clear();
  }
}

// Rate limiting for AI API calls
export class RateLimiter {
  private static requests = new Map<string, number[]>();
  private static readonly WINDOW_MS = 60 * 1000; // 1 minute
  private static readonly MAX_REQUESTS = 30; // Per minute per company
  
  static isAllowed(companyId: string): boolean {
    const now = Date.now();
    const windowStart = now - this.WINDOW_MS;
    
    let requests = this.requests.get(companyId) || [];
    requests = requests.filter(timestamp => timestamp > windowStart);
    
    if (requests.length >= this.MAX_REQUESTS) {
      return false;
    }
    
    requests.push(now);
    this.requests.set(companyId, requests);
    return true;
  }
}