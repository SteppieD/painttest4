import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Download, FileText, Calculator, Sparkles } from 'lucide-react'
import ModernNavigation from '@/components/modern-navigation'

export default function PaintingEstimateTemplatesPage() {
  return (
    <>
      <ModernNavigation />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
      <div className="bg-gradient-to-r from-red-600 to-black text-white py-20">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <div className="bg-yellow-400 text-black px-4 py-2 rounded-lg mb-6 inline-block font-bold">
            ⚠ SHOCKING: 91% of contractors lose jobs because of ugly estimates
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            The $50K Templates That Transform Amateur Estimates Into Client Magnets
          </h1>
          <div className="bg-black/40 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
            <div className="text-yellow-400 font-bold mb-2">REAL TRANSFORMATION:</div>
            <p className="text-xl text-white italic">
              "Same job, same price. Old template = rejected. New template = signed same day with 20% bonus for 'premium service.' - Lisa M., Orlando
            </p>
          </div>
          <div className="text-green-400 font-bold text-lg animate-pulse">
            ⏰ Downloaded by 463 contractors in the last 24 hours
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl py-12">
        <Card className="mb-8 border-4 border-yellow-400 bg-gradient-to-r from-yellow-50 to-orange-50">
          <CardHeader>
            <div className="bg-red-500 text-white px-4 py-2 rounded-lg mb-4 inline-block animate-pulse font-bold">
              WARNING: Price increases in 48 hours - grab now
            </div>
            <CardTitle className="text-2xl">Stop Losing $50,000/Year To Ugly Estimates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-red-100 border border-red-300 rounded-lg p-4 mb-6">
              <p className="text-red-700 font-bold mb-2">THE UGLY TRUTH:</p>
              <p className="text-red-600">
                A handwritten estimate on notebook paper screams "amateur" and gets you compared to every $2/hour painter on Craigslist. Professional templates make customers think "expert" and pay premium prices.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <Link href="/create-quote">
                <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-500 font-bold text-lg px-8 py-4 animate-pulse">
                  <Download className="mr-2 h-5 w-5" />
                  Get My $50K Templates FREE
                </Button>
              </Link>
              <p className="text-gray-600 text-sm">Used by 847 contractors to win $2.1M in contracts this month</p>
            </div>
            
            <div className="bg-gray-100 rounded-lg p-6 mt-8 mb-6">
              <h3 className="font-bold text-lg mb-4 text-center">What Makes These Templates Worth $50,000?</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <span><strong>Psychology-driven layout</strong> that makes customers want to sign</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <span><strong>Built-in value justification</strong> for premium pricing</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <span><strong>Professional terms & conditions</strong> that prevent disputes</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <span><strong>Automated calculations</strong> that prevent costly mistakes</span>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/pillars/how-to-price-painting-jobs">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <Calculator className="h-8 w-8 text-blue-600 mb-4" />
                    <h3 className="font-bold text-lg mb-2">Learn Pricing</h3>
                    <p className="text-gray-600 text-sm">Master quote creation</p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/pillars/painting-cost-calculator">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <Calculator className="h-8 w-8 text-green-600 mb-4" />
                    <h3 className="font-bold text-lg mb-2">Calculate Costs</h3>
                    <p className="text-gray-600 text-sm">Free calculator tool</p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/pillars/painting-estimate-software">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <FileText className="h-8 w-8 text-purple-600 mb-4" />
                    <h3 className="font-bold text-lg mb-2">Get Software</h3>
                    <p className="text-gray-600 text-sm">Automate estimates</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  )
}