"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Music, Play, Zap, Users, Download, Star, Check, ArrowRight, Guitar, Headphones } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Music className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold text-gray-900">StrumSync</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </a>
            <a href="#faq" className="text-gray-600 hover:text-gray-900 transition-colors">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden md:flex">
              Sign In
            </Button>
            <Link href="/dashboard">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-6">
            🎵 Real-time Music Tab Generation
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Turn Any Song Into
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              {" "}
              Perfect Tabs
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect your Spotify and instantly generate accurate tablature for guitar, piano, bass, and more. Watch tabs
            sync perfectly with the music as you play along.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/dashboard">
              <Button size="lg" className="text-lg px-8 py-6">
                <Play className="mr-2 h-5 w-5" />
                Start Playing Now
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              <Headphones className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          {/* Hero Image/Demo */}
          <div className="relative max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl border p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="ml-4 text-sm text-gray-500">StrumSync Dashboard</span>
              </div>
              <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-8 text-center">
                <Guitar className="h-16 w-16 mx-auto text-purple-600 mb-4" />
                <p className="text-gray-600">Interactive tab display with real-time sync</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need to Master Any Song</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to make learning music faster, easier, and more enjoyable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Zap className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Real-Time Generation</h3>
              <p className="text-gray-600">
                AI-powered tab generation that analyzes any song and creates accurate tablature in seconds.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Play className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Synced Playback</h3>
              <p className="text-gray-600">
                Watch tabs highlight in perfect sync with the original song. Never lose your place again.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Guitar className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Multi-Instrument</h3>
              <p className="text-gray-600">
                Support for guitar, piano, bass, ukulele, and drums with instrument-specific notation.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Music className="h-12 w-12 text-orange-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Smart Tuning</h3>
              <p className="text-gray-600">
                AI suggests optimal tuning and capo settings based on song key and your preferences.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Download className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Export & Share</h3>
              <p className="text-gray-600">
                Export tabs as PDF, text, or images. Share with friends or your band instantly.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <Users className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Community</h3>
              <p className="text-gray-600">
                Join thousands of musicians sharing tabs, tips, and collaborating on songs.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose TabSync */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Musicians Choose StrumSync</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Learn 10x Faster</h3>
                    <p className="text-gray-600">
                      Visual tabs synced with audio help you learn songs in minutes, not hours.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Always Accurate</h3>
                    <p className="text-gray-600">
                      AI-generated tabs with 95%+ accuracy, constantly improving with user feedback.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Works with Spotify</h3>
                    <p className="text-gray-600">
                      Seamless integration with your existing Spotify library and playlists.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="text-center mb-6">
                <Star className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900">Join 50,000+ Musicians</h3>
                <p className="text-gray-600">Already learning faster with StrumSync</p>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 italic">
                    "StrumSync changed how I learn songs. The real-time sync is incredible!"
                  </p>
                  <p className="text-sm font-medium mt-2">- Sarah M., Guitar Teacher</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 italic">
                    "Finally, accurate tabs for any song I want to learn. Game changer!"
                  </p>
                  <p className="text-sm font-medium mt-2">- Mike R., Professional Musician</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            One plan, unlimited access to all features. No hidden fees, cancel anytime.
          </p>

          <div className="max-w-md mx-auto">
            <Card className="p-8 border-2 border-purple-200 relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600">Most Popular</Badge>

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">StrumSync Pro</h3>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-5xl font-bold text-gray-900">$5</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-gray-600">Everything you need to master any song</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Unlimited song tab generation</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>All instruments supported</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Real-time sync playback</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>AI tuning suggestions</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Export & sharing</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>Priority support</span>
                </div>
              </div>

              <Link href="/dashboard">
                <Button className="w-full text-lg py-6">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <p className="text-sm text-gray-500 mt-4">7-day free trial • Cancel anytime</p>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about StrumSync</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-white rounded-lg px-6">
                <AccordionTrigger className="text-left">How accurate are the generated tabs?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Our AI generates tabs with 95%+ accuracy for most songs. The system continuously learns from user
                  feedback to improve accuracy over time. For complex songs, you can also submit corrections to help
                  improve the algorithm.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-white rounded-lg px-6">
                <AccordionTrigger className="text-left">Do I need Spotify Premium?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Yes, Spotify Premium is required for full playback functionality. However, you can still generate and
                  view tabs without Premium - you just won't be able to play the original audio through our app.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-white rounded-lg px-6">
                <AccordionTrigger className="text-left">Which instruments are supported?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Currently we support guitar (6-string), bass (4-string), piano/keyboard, ukulele, and basic drum
                  notation. We're constantly adding new instruments based on user requests.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-white rounded-lg px-6">
                <AccordionTrigger className="text-left">Can I export and share tabs?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Yes! You can export tabs as PDF, text files, or images. You can also generate shareable links that
                  allow others to view (but not edit) your tabs for up to 30 days.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-white rounded-lg px-6">
                <AccordionTrigger className="text-left">Is there a free trial?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  Yes! We offer a 7-day free trial with full access to all features. No credit card required to start.
                  You can cancel anytime during or after the trial period.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Music className="h-8 w-8 text-purple-400" />
                <span className="text-2xl font-bold">StrumSync</span>
              </div>
              <p className="text-gray-400 mb-4">
                The fastest way to learn any song with real-time tab generation and sync.
              </p>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700">
                  <span className="text-sm">𝕏</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700">
                  <span className="text-sm">f</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700">
                  <span className="text-sm">in</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-gray-400">
                <a href="#features" className="block hover:text-white transition-colors">
                  Features
                </a>
                <a href="#pricing" className="block hover:text-white transition-colors">
                  Pricing
                </a>
                <a href="/dashboard" className="block hover:text-white transition-colors">
                  Dashboard
                </a>
                <a href="#" className="block hover:text-white transition-colors">
                  API
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-gray-400">
                <a href="#faq" className="block hover:text-white transition-colors">
                  FAQ
                </a>
                <a href="#" className="block hover:text-white transition-colors">
                  Help Center
                </a>
                <a href="#" className="block hover:text-white transition-colors">
                  Contact
                </a>
                <a href="#" className="block hover:text-white transition-colors">
                  Status
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-gray-400">
                <a href="#" className="block hover:text-white transition-colors">
                  About
                </a>
                <a href="#" className="block hover:text-white transition-colors">
                  Blog
                </a>
                <a href="#" className="block hover:text-white transition-colors">
                  Careers
                </a>
                <a href="#" className="block hover:text-white transition-colors">
                  Privacy
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 StrumSync. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-gray-400 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
