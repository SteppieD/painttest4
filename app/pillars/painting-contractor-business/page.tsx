import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, CheckCircle, TrendingUp, Users, DollarSign, FileText, Calculator } from 'lucide-react'

export default function PaintingContractorBusinessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-20">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Painting Contractor Business Guide
          </h1>
          <p className="text-xl mb-8 text-orange-50">
            Complete resource hub for starting and growing a successful painting business
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl py-12">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Coming Soon: Comprehensive Business Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              We're creating the ultimate guide for painting contractors. In the meantime, explore our other resources:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/pillars/how-to-price-painting-jobs">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <Calculator className="h-8 w-8 text-blue-600 mb-4" />
                    <h3 className="font-bold text-lg mb-2">Pricing Guide</h3>
                    <p className="text-gray-600">Master professional pricing strategies</p>
                  </CardContent>
                </Card>
              </Link>
              
              <Link href="/pillars/painting-estimate-software">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <FileText className="h-8 w-8 text-purple-600 mb-4" />
                    <h3 className="font-bold text-lg mb-2">Business Software</h3>
                    <p className="text-gray-600">Tools to streamline your operations</p>
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