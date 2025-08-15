#!/bin/bash

# Replace "Start Free Trial" with "Get Started Free" or "Start Free"
find app -name "*.tsx" -type f -exec sed -i '' 's/Start Free Trial/Get Started Free/g' {} \;
find app -name "*.tsx" -type f -exec sed -i '' 's/Start Your Free Trial/Get Started Free Today/g' {} \;
find app -name "*.tsx" -type f -exec sed -i '' 's/Start 14-Day Trial/Start Free/g' {} \;

# Replace "free trial" in descriptions with "free plan" or "free forever"
find app -name "*.tsx" -type f -exec sed -i '' 's/Free trial available/Free forever plan available/g' {} \;
find app -name "*.tsx" -type f -exec sed -i '' 's/free trial available/free forever plan available/g' {} \;
find app -name "*.tsx" -type f -exec sed -i '' 's/30-day free trial/Free forever plan/g' {} \;
find app -name "*.tsx" -type f -exec sed -i '' 's/14-day pro trial/free forever plan/g' {} \;
find app -name "*.tsx" -type f -exec sed -i '' 's/14-day free trial/free forever plan/g' {} \;
find app -name "*.tsx" -type f -exec sed -i '' 's/Free trial/Free forever/g' {} \;

# Update any remaining trial language
find app -name "*.tsx" -type f -exec sed -i '' 's/No credit card required • 14-day free trial/No credit card required • Free forever plan/g' {} \;
find app -name "*.tsx" -type f -exec sed -i '' 's/14-Day Free Trial/Free Forever Plan/g' {} \;

echo "Updated freemium language across all files"