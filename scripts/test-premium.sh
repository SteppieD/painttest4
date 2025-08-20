#!/bin/bash

# Test Premium Features Script
# This script helps test premium user functionality

echo "════════════════════════════════════════════════════════════════"
echo "                  🎯 Premium User Testing Guide                  "
echo "════════════════════════════════════════════════════════════════"
echo ""
echo "✅ Premium Test Account Created!"
echo ""
echo "📋 CREDENTIALS:"
echo "────────────────"
echo "  Access Code:  PREMIUM2024"
echo "  Email:        premium@test.com"  
echo "  Password:     premium123"
echo ""
echo "🌐 TEST URLS:"
echo "─────────────"
echo "  Local:        http://localhost:3005/auth/signin"
echo "  Production:   https://paintquotepro.vercel.app/auth/signin"
echo ""
echo "💎 PROFESSIONAL TIER FEATURES TO TEST:"
echo "───────────────────────────────────────"
echo "  1. Dashboard Analytics"
echo "     • All metrics should be visible (no blur)"
echo "     • Revenue tracking should work"
echo "     • Quote conversion rates visible"
echo ""
echo "  2. Unlimited Quotes"
echo "     • No monthly limit on quote creation"
echo "     • Create as many quotes as needed"
echo "     • Usage indicator should show unlimited"
echo ""
echo "  3. Premium Settings"
echo "     • Access to all settings"
echo "     • Custom branding options"
echo "     • Advanced configuration"
echo ""
echo "  4. Analytics Pages"
echo "     • Full access to /dashboard/analytics"
echo "     • All charts and metrics visible"
echo "     • Export capabilities"
echo ""
echo "  5. Team Management"
echo "     • Ability to invite team members"
echo "     • Team roles and permissions"
echo "     • Up to 3 team members"
echo ""
echo "🔄 TO RECREATE PREMIUM USER:"
echo "────────────────────────────"
echo "  curl http://localhost:3005/api/setup-premium-test"
echo ""
echo "════════════════════════════════════════════════════════════════"
echo ""

# Ask if user wants to open the local test URL
read -p "📱 Open local test URL in browser? (y/n): " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    if command -v open &> /dev/null; then
        open "http://localhost:3005/auth/signin"
        echo "✅ Opening browser..."
    else
        echo "⚠️  Please manually open: http://localhost:3005/auth/signin"
    fi
fi

echo ""
echo "Happy testing! 🚀"