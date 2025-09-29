"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Users, Zap, Shield, Smartphone, Globe } from "lucide-react"
import { AppSidebar } from "@/components/app-sidebar"
import Container from "@/pages/Container"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [showBottomBar, setShowBottomBar] = useState(false)
  const [selectedUser, setSelectedUser] = useState({
    name: "Alice Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    status: "Online",
    isOnline: true,
  })
  const [chatBackground, setChatBackground] = useState("default")

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Scroll effect for bottom bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setShowBottomBar(scrollPosition > 100) // Show bottom bar after scrolling 100px
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleUserSelect = (user: any) => {
    setSelectedUser(user)
  }

  const handleBackgroundChange = (background: string) => {
    console.log('Page received background change:', background)
    setChatBackground(background)
    localStorage.setItem('chatBackground', background)
  }

  // Load saved background on component mount
  useEffect(() => {
    const savedBackground = localStorage.getItem('chatBackground') || 'default'
    setChatBackground(savedBackground)
  }, [])

  if (showChat) {
    return (
      <SidebarProvider>
        <AppSidebar onUserSelect={handleUserSelect} onBackgroundChange={handleBackgroundChange} />
        <SidebarInset>
          <SidebarTrigger/>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
              <Container selectedUser={selectedUser} chatBackground={chatBackground} />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-700">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-60 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      
        <div className="absolute top-30 left-[480px] w-[480px] h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              AI Chatapp
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
              Features
            </a>
            <a href="#about" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
              About
            </a>
            <ThemeToggle />
            <Button
              onClick={() => setShowChat(true)}
              className="bg-gradient-to-r from-blue-900 to-purple-400 hover:from-gray-900 hover:to-purple-300 hover:text-white"
            >
              Start Chatting
            </Button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="px-6 py-20 text-center">
          <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
              ✨ Modern Chat Experience
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent dark:from-white dark:via-blue-200 dark:to-purple-200">
              Connect with
              <br />
              <span className="relative text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent dark:from-white dark:via-blue-200 dark:to-purple-200">
                Anyone, Anywhere
                <div className="absolute -bottom-3 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full"></div>
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Experience the future of messaging with AI-powered conversations,
              real-time voice messages, and stunning animations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => setShowChat(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Start Chatting Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
              >
                <Users className="w-5 h-5 mr-2" />
                View Demo
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
              Powerful Features
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Everything you need for modern communication
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <MessageCircle className="w-8 h-8" />,
                title: "AI-Powered Chat",
                description: "Intelligent conversations with AI assistants that understand context and provide helpful responses.",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Real Voice Messages",
                description: "Send and receive high-quality voice messages with real-time recording and playback.",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Lightning Fast",
                description: "Optimized performance with smooth animations and instant message delivery.",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Privacy First",
                description: "Your conversations are secure with end-to-end encryption and local data storage.",
                color: "from-orange-500 to-red-500"
              },
              {
                icon: <Smartphone className="w-8 h-8" />,
                title: "Mobile Ready",
                description: "Responsive design that works perfectly on all devices and screen sizes.",
                color: "from-indigo-500 to-purple-500"
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Global Access",
                description: "Connect with people worldwide with multi-language support and instant translation.",
                color: "from-teal-500 to-blue-500"
              }
            ].map((feature, index) => (
              <Card
                key={index}
                className={`group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm`}
              >
                <CardHeader>
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-20 text-center">
          <div className="bg-gradient-to-r from-cyan-900 to-teal-700 rounded-3xl p-12 text-gray-900 dark:text-gray-100">
            <h2 className="text-4xl font-bold mb-6 text-white">
              Ready to Experience the Future?
            </h2>
            <p className="text-xl mb-8 opacity-90 text-gray-00">
              Join thousands of users already enjoying seamless communication
            </p>
            <Button
              size="lg"
              onClick={() => setShowChat(true)}
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Enter Chat Application
            </Button>
          </div>
        </section>
             {/* Floating "Made By VK" Button */}
             <div className="fixed right-285 bottom-1 transform -translate-y-1/2 z-50">
          <Button
            variant="outline"
            size="lg"
            className="bg-gray/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-gray-800 hover:border-blue-900 dark:hover:border-blue-100 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Made By VK
          </Button>
        </div>

        {/* Bottom Blurred Navigation Bar */}
        <div
          className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-500 ${
            showBottomBar
              ? 'translate-y-0 opacity-100'
              : 'translate-y-full opacity-0'
          }`}
        >
          {/* Gradient mask overlay for smooth border effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-gray-900/20 pointer-events-none"></div>

          <div className="relative bg-white/10 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg overflow-hidden">
            {/* Animated border gradient */}
        

            <div className="flex items-center justify-center space-x-8 py-4 px-6 relative">
              {/* Left fade mask */}
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white/30 to-transparent dark:from-gray-900/30 pointer-events-none"></div>

              {/* Right fade mask */}
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white/30 to-transparent dark:from-gray-900/30 pointer-events-none"></div>

         
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="px-6 py-12 text-center text-gray-600 dark:text-gray-300">
          <p>&copy; 2024 ChatApp. Built with Next.js and modern web technologies.</p>
        </footer>
      </div>
    </div>
  )
}
