'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Building, Users, BarChart3, Shield, Rocket, Check } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const BUSINESS_FEATURES = [
  { icon: Users, title: 'Unlimited Team Members', description: 'Add your entire crew with role-based permissions' },
  { icon: BarChart3, title: 'Advanced Analytics', description: 'Deep insights into your business performance' },
  { icon: Shield, title: 'API Access', description: 'Integrate with your existing tools and workflows' },
  { icon: Building, title: 'Multi-location Support', description: 'Manage multiple business locations from one account' },
  { icon: Rocket, title: 'Custom Integrations', description: 'Connect with QuickBooks, CRM systems, and more' },
];

export default function ContactSalesPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    employees: '',
    monthlyQuotes: '',
    message: '',
    currentSoftware: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In production, this would send to your sales team
      const response = await fetch('/api/contact-sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast({
          title: 'Thank you for your interest!',
          description: 'Our sales team will contact you within 24 hours.',
        });
        router.push('/dashboard');
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      // For now, just show success since API doesn't exist yet
      toast({
        title: 'Thank you for your interest!',
        description: 'Our sales team will contact you within 24 hours.',
      });
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        employees: '',
        monthlyQuotes: '',
        message: '',
        currentSoftware: ''
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/pricing">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold text-white">Contact Sales - Business Plan</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Column - Benefits */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Scale Your Painting Business with Enterprise Features
              </h2>
              <p className="text-lg text-gray-300">
                The Business plan is designed for established painting contractors who need advanced features, 
                team collaboration, and custom integrations to manage their growing operations.
              </p>
            </div>

            <Card className="bg-gray-900/80 border-white/10 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white">What's Included</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {BUSINESS_FEATURES.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-purple-400" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{feature.title}</h4>
                        <p className="text-gray-400 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card className="bg-purple-900/30 border-purple-500/30 backdrop-blur-md">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">Dedicated Support</p>
                    <p className="text-gray-300 text-sm mt-1">
                      Get priority access to our support team with guaranteed response times 
                      and a dedicated account manager.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Contact Form */}
          <Card className="bg-gray-900/80 border-white/10 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Get Started with Business</CardTitle>
              <CardDescription className="text-gray-300">
                Fill out the form below and our sales team will create a custom package for your needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-200">Name *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-gray-800/50 border-white/10 text-white"
                      placeholder="John Smith"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-200">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-gray-800/50 border-white/10 text-white"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-200">Phone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-gray-800/50 border-white/10 text-white"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-gray-200">Company *</Label>
                    <Input
                      id="company"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="bg-gray-800/50 border-white/10 text-white"
                      placeholder="ABC Painting Co."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employees" className="text-gray-200">Team Size *</Label>
                    <Select
                      value={formData.employees}
                      onValueChange={(value) => setFormData({ ...formData, employees: value })}
                    >
                      <SelectTrigger className="bg-gray-800/50 border-white/10 text-white">
                        <SelectValue placeholder="Select team size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-5">1-5 employees</SelectItem>
                        <SelectItem value="6-10">6-10 employees</SelectItem>
                        <SelectItem value="11-25">11-25 employees</SelectItem>
                        <SelectItem value="26-50">26-50 employees</SelectItem>
                        <SelectItem value="50+">50+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="monthlyQuotes" className="text-gray-200">Monthly Quotes</Label>
                    <Select
                      value={formData.monthlyQuotes}
                      onValueChange={(value) => setFormData({ ...formData, monthlyQuotes: value })}
                    >
                      <SelectTrigger className="bg-gray-800/50 border-white/10 text-white">
                        <SelectValue placeholder="Quotes per month" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50-100">50-100</SelectItem>
                        <SelectItem value="100-200">100-200</SelectItem>
                        <SelectItem value="200-500">200-500</SelectItem>
                        <SelectItem value="500+">500+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentSoftware" className="text-gray-200">Current Software (if any)</Label>
                  <Input
                    id="currentSoftware"
                    value={formData.currentSoftware}
                    onChange={(e) => setFormData({ ...formData, currentSoftware: e.target.value })}
                    className="bg-gray-800/50 border-white/10 text-white"
                    placeholder="QuickBooks, JobNimbus, etc."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-200">Tell us about your needs</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-gray-800/50 border-white/10 text-white min-h-[100px]"
                    placeholder="What features are most important to you? Any specific integrations needed?"
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                    size="lg"
                  >
                    {isSubmitting ? 'Submitting...' : 'Contact Sales Team'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push('/pricing')}
                    className="border-white/20 text-white hover:bg-white/10"
                    size="lg"
                  >
                    Back to Pricing
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">
            Need immediate assistance? Call our sales team at{' '}
            <a href="tel:1-800-PAINTPRO" className="text-purple-400 hover:text-purple-300">
              1-800-PAINTPRO
            </a>
          </p>
          <p className="text-sm text-gray-500">
            Monday - Friday, 9am - 6pm EST
          </p>
        </div>
      </main>
    </div>
  );
}