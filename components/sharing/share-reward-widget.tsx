'use client';

import { useState, useEffect } from 'react';
import { Share2, Gift, Check, Copy, Twitter, Facebook, Linkedin, Mail, Link } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { SocialShareTracker, shareTemplates } from '@/lib/sharing/social-share-tracker';

interface ShareRewardWidgetProps {
  companyId: number;
  variant?: 'dashboard' | 'compact' | 'banner';
}

export function ShareRewardWidget({ companyId, variant = 'dashboard' }: ShareRewardWidgetProps) {
  const [stats, setStats] = useState({
    totalShares: 0,
    verifiedShares: 0,
    rewardsClaimed: 0,
    creditsEarned: 0,
    creditsAvailable: 0
  });
  const [hasUnclaimed, setHasUnclaimed] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [shareCode, setShareCode] = useState('');
  const [showShareOptions, setShowShareOptions] = useState(false);

  useEffect(() => {
    // Load share stats
    const loadStats = () => {
      const shareStats = SocialShareTracker.getShareStats(companyId);
      setStats(shareStats);
      setHasUnclaimed(SocialShareTracker.hasUnclaimedRewards(companyId));
    };

    loadStats();
    // Refresh stats every 5 seconds if there are unclaimed rewards
    const interval = hasUnclaimed ? setInterval(loadStats, 5000) : null;
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [companyId, hasUnclaimed]);

  const handleShare = async (platform: 'twitter' | 'facebook' | 'linkedin' | 'email' | 'link') => {
    const { shareCode: code, url } = await SocialShareTracker.trackShare(companyId, platform);
    setShareUrl(url);
    setShareCode(code);

    // Open share dialog based on platform
    let shareLink = '';
    switch (platform) {
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTemplates.twitter.text)}&url=${encodeURIComponent(url)}&hashtags=${shareTemplates.twitter.hashtags.join(',')}`;
        break;
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(shareTemplates.facebook.text)}`;
        break;
      case 'linkedin':
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(shareTemplates.linkedin.text)}`;
        break;
      case 'email':
        shareLink = `mailto:?subject=${encodeURIComponent(shareTemplates.email.subject)}&body=${encodeURIComponent(shareTemplates.email.body + '\n\n' + url)}`;
        break;
      case 'link':
        // Copy to clipboard
        navigator.clipboard.writeText(url);
        toast({
          title: 'Link Copied!',
          description: 'Share link has been copied to your clipboard'
        });
        
        // Auto-verify after a delay (simulating share completion)
        setTimeout(() => {
          SocialShareTracker.verifyShare(code);
          const newStats = SocialShareTracker.getShareStats(companyId);
          setStats(newStats);
          setHasUnclaimed(SocialShareTracker.hasUnclaimedRewards(companyId));
        }, 3000);
        return;
    }

    if (shareLink) {
      window.open(shareLink, '_blank', 'width=600,height=400');
      
      // Auto-verify after a delay (simulating share completion)
      setTimeout(() => {
        SocialShareTracker.verifyShare(code);
        const newStats = SocialShareTracker.getShareStats(companyId);
        setStats(newStats);
        setHasUnclaimed(SocialShareTracker.hasUnclaimedRewards(companyId));
      }, 5000);
    }
  };

  const handleClaimReward = async () => {
    const reward = await SocialShareTracker.claimShareReward(companyId);
    if (reward) {
      toast({
        title: '🎉 Reward Claimed!',
        description: `You earned ${reward.quantity} free quote credit${reward.quantity > 1 ? 's' : ''}!`
      });
      
      // Refresh stats
      const newStats = SocialShareTracker.getShareStats(companyId);
      setStats(newStats);
      setHasUnclaimed(SocialShareTracker.hasUnclaimedRewards(companyId));
    }
  };

  if (variant === 'banner') {
    return (
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-500/20 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Gift className="h-5 w-5 text-blue-400" />
            <div>
              <h4 className="font-semibold text-white">Earn Free Quotes!</h4>
              <p className="text-sm text-gray-300">Share PaintQuote Pro and get 1 free quote per share</p>
            </div>
          </div>
          <Button 
            onClick={() => setShowShareOptions(!showShareOptions)}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share Now
          </Button>
        </div>
        
        {showShareOptions && (
          <div className="mt-4 pt-4 border-t border-white/10 flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleShare('twitter')}
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Twitter className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleShare('facebook')}
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Facebook className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleShare('linkedin')}
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Linkedin className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleShare('email')}
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Mail className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleShare('link')}
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Link className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <Card className="bg-gray-900/80 backdrop-blur-md border-white/10">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg">
                <Gift className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="font-semibold text-white">Share & Earn</p>
                <p className="text-sm text-gray-400">
                  {stats.creditsAvailable > 0 
                    ? `${stats.creditsAvailable} credit${stats.creditsAvailable > 1 ? 's' : ''} available`
                    : 'Get 1 free quote per share'
                  }
                </p>
              </div>
            </div>
            <Button 
              size="sm"
              onClick={() => setShowShareOptions(!showShareOptions)}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              Share
            </Button>
          </div>
          
          {showShareOptions && (
            <div className="mt-3 pt-3 border-t border-white/10 flex gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => handleShare('twitter')}
                className="hover:bg-white/10"
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => handleShare('facebook')}
                className="hover:bg-white/10"
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => handleShare('linkedin')}
                className="hover:bg-white/10"
              >
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => handleShare('link')}
                className="hover:bg-white/10"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Dashboard variant (default)
  return (
    <Card className="bg-gray-900/80 backdrop-blur-md border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-blue-400" />
            Share & Earn Free Quotes
          </span>
          {hasUnclaimed && (
            <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
              Reward Available!
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800/50 rounded-lg p-3">
            <p className="text-2xl font-bold text-white">{stats.creditsAvailable}</p>
            <p className="text-sm text-gray-400">Credits Available</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3">
            <p className="text-2xl font-bold text-white">{stats.creditsEarned}</p>
            <p className="text-sm text-gray-400">Total Earned</p>
          </div>
        </div>

        {/* Claim Button */}
        {hasUnclaimed && (
          <Button 
            onClick={handleClaimReward}
            className="w-full bg-green-500 hover:bg-green-600 text-white"
          >
            <Check className="h-4 w-4 mr-2" />
            Claim Your Free Quote Credit
          </Button>
        )}

        {/* Share Options */}
        <div>
          <p className="text-sm text-gray-400 mb-3">Share on social media to earn 1 free quote per share:</p>
          <div className="grid grid-cols-5 gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleShare('twitter')}
              className="border-white/20 text-white hover:bg-white/10"
              title="Share on Twitter"
            >
              <Twitter className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleShare('facebook')}
              className="border-white/20 text-white hover:bg-white/10"
              title="Share on Facebook"
            >
              <Facebook className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleShare('linkedin')}
              className="border-white/20 text-white hover:bg-white/10"
              title="Share on LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleShare('email')}
              className="border-white/20 text-white hover:bg-white/10"
              title="Share via Email"
            >
              <Mail className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleShare('link')}
              className="border-white/20 text-white hover:bg-white/10"
              title="Copy Link"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Progress */}
        {stats.verifiedShares > 0 && (
          <div className="pt-3 border-t border-white/10">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Share Progress</span>
              <span className="text-white">{stats.verifiedShares} verified shares</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                style={{ width: `${Math.min((stats.verifiedShares / 10) * 100, 100)}%` }}
              />
            </div>
            {stats.verifiedShares >= 10 && (
              <p className="text-xs text-purple-400 mt-1">🎉 Power Sharer! You're helping grow the community!</p>
            )}
          </div>
        )}

        {/* Share URL Display */}
        {shareUrl && (
          <div className="p-3 bg-gray-800/50 rounded-lg">
            <p className="text-xs text-gray-400 mb-1">Your unique share link:</p>
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                value={shareUrl} 
                readOnly 
                className="flex-1 bg-gray-900 text-xs text-gray-300 p-2 rounded border border-white/10"
              />
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                  toast({ title: 'Link copied!' });
                }}
                className="border-white/20 text-white hover:bg-white/10"
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}