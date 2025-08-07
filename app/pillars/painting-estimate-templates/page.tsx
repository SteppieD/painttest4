import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Download, FileText, Calculator, Sparkles } from 'lucide-react'

export default function PaintingEstimateTemplatesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Free Painting Estimate Templates
          </h1>
          <p className="text-xl mb-8 text-indigo-50">
            Professional templates to win more painting jobs
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl py-12">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Download Professional Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              Get instant access to our painting quote templates with PaintQuote Pro:
            </p>
            
            <div className="text-center">
              <Link href="/create-quote">
                <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Access Templates with Free Trial
                </Button>
              </Link>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
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
  )
}