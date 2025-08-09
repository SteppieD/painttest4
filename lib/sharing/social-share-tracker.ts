// Social sharing tracker for earning free quotes
import { db } from '@/lib/database/adapter';

export interface ShareData {
  companyId: number;
  platform: 'twitter' | 'facebook' | 'linkedin' | 'email' | 'link';
  shareCode: string;
  timestamp: Date;
  verified: boolean;
  rewardClaimed: boolean;
}

export interface ShareReward {
  type: 'extra_quote';
  quantity: number;
  expiresAt?: Date;
}

export class SocialShareTracker {
  // Generate unique share code for tracking
  static generateShareCode(companyId: number): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `PQP${companyId}${timestamp}${random}`.toUpperCase();
  }

  // Create shareable URL with tracking
  static createShareableUrl(shareCode: string, platform: string): string {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://paintquotepro.com';
    const utm = `?ref=${shareCode}&utm_source=${platform}&utm_medium=social&utm_campaign=share_reward`;
    return `${baseUrl}${utm}`;
  }

  // Track when someone shares
  static async trackShare(companyId: number, platform: string): Promise<{ shareCode: string; url: string }> {
    const shareCode = this.generateShareCode(companyId);
    const url = this.createShareableUrl(shareCode, platform);
    
    // Store share record in localStorage (or database in production)
    const shares = this.getShares(companyId);
    shares.push({
      companyId,
      platform: platform as ShareData['platform'],
      shareCode,
      timestamp: new Date(),
      verified: false,
      rewardClaimed: false
    });
    
    localStorage.setItem(`social_shares_${companyId}`, JSON.stringify(shares));
    
    // Track in GTM
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'social_share',
        share_platform: platform,
        share_code: shareCode,
        company_id: companyId
      });
    }
    
    return { shareCode, url };
  }

  // Verify share completion (check if shared and got clicks)
  static async verifyShare(shareCode: string): Promise<boolean> {
    // In production, this would check:
    // 1. If the share was posted (via social media APIs)
    // 2. If it received at least 1 unique click
    // 3. If it's not fraudulent (same IP, etc.)
    
    // For now, we'll auto-verify after sharing
    const allShares = this.getAllShares();
    const share = allShares.find(s => s.shareCode === shareCode);
    
    if (share && !share.verified) {
      share.verified = true;
      localStorage.setItem(`social_shares_${share.companyId}`, JSON.stringify(
        allShares.filter(s => s.companyId === share.companyId)
      ));
      return true;
    }
    
    return false;
  }

  // Claim reward for verified share
  static async claimShareReward(companyId: number): Promise<ShareReward | null> {
    const shares = this.getShares(companyId);
    const unclaimedShare = shares.find(s => s.verified && !s.rewardClaimed);
    
    if (unclaimedShare) {
      // Mark as claimed
      unclaimedShare.rewardClaimed = true;
      localStorage.setItem(`social_shares_${companyId}`, JSON.stringify(shares));
      
      // Add extra quote credit
      const credits = this.getQuoteCredits(companyId);
      credits.available += 1;
      credits.history.push({
        type: 'social_share',
        amount: 1,
        timestamp: new Date(),
        shareCode: unclaimedShare.shareCode
      });
      localStorage.setItem(`quote_credits_${companyId}`, JSON.stringify(credits));
      
      // Track reward claim
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: 'reward_claimed',
          reward_type: 'extra_quote',
          share_code: unclaimedShare.shareCode
        });
      }
      
      return {
        type: 'extra_quote',
        quantity: 1
      };
    }
    
    return null;
  }

  // Get all shares for a company
  static getShares(companyId: number): ShareData[] {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(`social_shares_${companyId}`);
    return stored ? JSON.parse(stored) : [];
  }

  // Get all shares across all companies
  static getAllShares(): ShareData[] {
    if (typeof window === 'undefined') return [];
    const allShares: ShareData[] = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('social_shares_')) {
        const shares = JSON.parse(localStorage.getItem(key) || '[]');
        allShares.push(...shares);
      }
    }
    
    return allShares;
  }

  // Get quote credits for a company
  static getQuoteCredits(companyId: number): {
    available: number;
    history: Array<{
      type: string;
      amount: number;
      timestamp: Date;
      shareCode?: string;
    }>;
  } {
    if (typeof window === 'undefined') {
      return { available: 0, history: [] };
    }
    
    const stored = localStorage.getItem(`quote_credits_${companyId}`);
    return stored ? JSON.parse(stored) : { available: 0, history: [] };
  }

  // Check if company has unclaimed rewards
  static hasUnclaimedRewards(companyId: number): boolean {
    const shares = this.getShares(companyId);
    return shares.some(s => s.verified && !s.rewardClaimed);
  }

  // Get share statistics
  static getShareStats(companyId: number): {
    totalShares: number;
    verifiedShares: number;
    rewardsClaimed: number;
    creditsEarned: number;
    creditsAvailable: number;
  } {
    const shares = this.getShares(companyId);
    const credits = this.getQuoteCredits(companyId);
    
    return {
      totalShares: shares.length,
      verifiedShares: shares.filter(s => s.verified).length,
      rewardsClaimed: shares.filter(s => s.rewardClaimed).length,
      creditsEarned: credits.history.reduce((sum, c) => sum + c.amount, 0),
      creditsAvailable: credits.available
    };
  }
}

// Share message templates
export const shareTemplates = {
  twitter: {
    text: "I'm saving hours on painting quotes with @PaintQuotePro! Create professional quotes in minutes with AI. Try it free:",
    hashtags: ['PaintingBusiness', 'ContractorTools']
  },
  facebook: {
    text: "Just discovered PaintQuote Pro - it's cut my quoting time by 90%! If you're a painting contractor, you need to check this out. Professional quotes in minutes with AI assistance."
  },
  linkedin: {
    text: "Game-changer for painting contractors! PaintQuote Pro has transformed how I create quotes - from hours to minutes. The AI assistant handles all the calculations while I focus on winning more jobs."
  },
  email: {
    subject: "You've got to see this painting quote tool",
    body: "Hey! I've been using PaintQuote Pro for my painting business and it's incredible. Creates professional quotes in minutes instead of hours. Thought you might find it useful too!"
  }
};