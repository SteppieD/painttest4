'use client';

import { useState } from 'react';
import { Gift, Share2, ArrowRight, Sparkles, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function ShareRewardPromo() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-16 md:py-24 relative">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Main Promo Card */}
          <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Left Content */}
                <div>
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full px-4 py-2 mb-4">
                    <Sparkles className="h-4 w-4 text-blue-400" />
                    <span className="text-sm font-medium text-blue-300">Limited Time Offer</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Share PaintQuote Pro,
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Get Free Quotes</span>
                  </h2>
                  
                  <p className="text-lg text-gray-200 mb-6">
                    Every share = 1 free professional quote. Help other contractors discover the fastest way to create quotes while earning credits for your business.
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-green-500/20 rounded-full">
                        <Share2 className="h-4 w-4 text-green-400" />
                      </div>
                      <span className="text-gray-200">Share on any social platform</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-green-500/20 rounded-full">
                        <Gift className="h-4 w-4 text-green-400" />
                      </div>
                      <span className="text-gray-200">Get 1 free quote credit instantly</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-green-500/20 rounded-full">
                        <Users className="h-4 w-4 text-green-400" />
                      </div>
                      <span className="text-gray-200">No limit on credits you can earn</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/trial-signup">
                      <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg">
                        Start Earning Free Quotes
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      Learn How It Works
                    </Button>
                  </div>
                </div>
                
                {/* Right Visual */}
                <div className="relative">
                  <div className="relative bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl p-8 border border-white/10">
                    {/* Stats Display */}
                    <div className="text-center space-y-4">
                      <div className="text-5xl font-bold text-white">2,847+</div>
                      <p className="text-gray-300">Contractors earning free quotes</p>
                      
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="bg-gray-900/50 rounded-lg p-3">
                          <div className="text-2xl font-bold text-blue-400">15,000+</div>
                          <p className="text-xs text-gray-400">Shares this month</p>
                        </div>
                        <div className="bg-gray-900/50 rounded-lg p-3">
                          <div className="text-2xl font-bold text-purple-400">$750K+</div>
                          <p className="text-xs text-gray-400">Value earned</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                        <p className="text-sm text-green-400">
                          Average contractor earns 5 free quotes per month through sharing
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating badges */}
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    No Credit Card Required
                  </div>
                </div>
              </div>
              
              {/* Expanded Content */}
              {isExpanded && (
                <div className="mt-8 pt-8 border-t border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-4">How the Share & Earn Program Works</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gray-900/50 rounded-lg p-4">
                      <div className="text-3xl font-bold text-blue-400 mb-2">1</div>
                      <h4 className="font-semibold text-white mb-2">Share Your Link</h4>
                      <p className="text-sm text-gray-300">
                        Get your unique tracking link and share it on social media, email, or with fellow contractors.
                      </p>
                    </div>
                    <div className="bg-gray-900/50 rounded-lg p-4">
                      <div className="text-3xl font-bold text-purple-400 mb-2">2</div>
                      <h4 className="font-semibold text-white mb-2">Automatic Verification</h4>
                      <p className="text-sm text-gray-300">
                        We track when your share gets engagement. Credits are verified and added to your account instantly.
                      </p>
                    </div>
                    <div className="bg-gray-900/50 rounded-lg p-4">
                      <div className="text-3xl font-bold text-green-400 mb-2">3</div>
                      <h4 className="font-semibold text-white mb-2">Use Your Credits</h4>
                      <p className="text-sm text-gray-300">
                        Each credit gives you one free professional quote. Use them anytime, they never expire!
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                    <p className="text-center text-blue-300">
                      <strong>Pro Tip:</strong> Share in Facebook contractor groups for maximum engagement and credits!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">100%</div>
              <p className="text-sm text-gray-400">Free to Join</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">Instant</div>
              <p className="text-sm text-gray-400">Credit Delivery</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">No Limit</div>
              <p className="text-sm text-gray-400">Earn Unlimited</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">Forever</div>
              <p className="text-sm text-gray-400">Credits Never Expire</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}