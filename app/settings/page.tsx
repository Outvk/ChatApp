"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Lock,
  Eye,
  EyeOff,
  Save,
  RotateCcw,
  Download,
  Upload,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Moon,
  Sun,
  Monitor,
  Volume2,
  VolumeX,
  Smartphone,
  Mail,
  MessageSquare,
  Camera,
  Mic,
  MicOff,
  Share2
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [settings, setSettings] = useState({
    // General Settings
    displayName: "Alex Johnson",
    email: "alex.johnson@example.com",
    language: "en",
    timezone: "UTC-8",
    dateFormat: "MM/DD/YYYY",

    // Appearance Settings
    theme: "system",
    fontSize: "medium",
    chatBackground: "default",
    messageStyle: "modern",
    animationSpeed: "normal",

    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    messageNotifications: true,
    callNotifications: false,
    soundEnabled: true,
    desktopNotifications: true,
    notificationPreview: false,

    // Privacy Settings
    profileVisibility: "public",
    showOnlineStatus: true,
    showLastSeen: true,
    readReceipts: true,
    typingIndicators: true,
    messageForwarding: false,
    dataCollection: false,

    // Security Settings
    twoFactorEnabled: false,
    sessionTimeout: "30",
    loginAlerts: true,
    passwordChangeRequired: false,

    // Chat Settings
    autoSave: true,
    messageHistory: "1year",
    mediaAutoDownload: "wifi",
    voiceMessageQuality: "high",
    maxFileSize: "100",

    // Advanced Settings
    developerMode: false,
    debugMode: false,
    analyticsEnabled: true,
    crashReporting: true
  })

  const [activeTab, setActiveTab] = useState("general")
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
    setHasUnsavedChanges(true)
  }

  const handleSave = () => {
    // Simulate saving
    console.log("Saving settings:", settings)
    setHasUnsavedChanges(false)
    // Here you would typically save to backend
  }

  const handleReset = () => {
    // Reset to defaults
    setSettings({
      displayName: "Alex Johnson",
      email: "alex.johnson@example.com",
      language: "en",
      timezone: "UTC-8",
      dateFormat: "MM/DD/YYYY",
      theme: "system",
      fontSize: "medium",
      chatBackground: "default",
      messageStyle: "modern",
      animationSpeed: "normal",
      emailNotifications: true,
      pushNotifications: true,
      messageNotifications: true,
      callNotifications: false,
      soundEnabled: true,
      desktopNotifications: true,
      notificationPreview: false,
      profileVisibility: "public",
      showOnlineStatus: true,
      showLastSeen: true,
      readReceipts: true,
      typingIndicators: true,
      messageForwarding: false,
      dataCollection: false,
      twoFactorEnabled: false,
      sessionTimeout: "30",
      loginAlerts: true,
      passwordChangeRequired: false,
      autoSave: true,
      messageHistory: "1year",
      mediaAutoDownload: "wifi",
      voiceMessageQuality: "high",
      maxFileSize: "100",
      developerMode: false,
      debugMode: false,
      analyticsEnabled: true,
      crashReporting: true
    })
    setHasUnsavedChanges(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-16 bg-gray-300 dark:bg-gray-700 rounded-xl mb-8"></div>
            <div className="grid lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <div className="h-96 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
              </div>
              <div className="lg:col-span-3 space-y-6">
                <div className="h-32 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
                <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
                <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-60 w-880 h-80 bg-blue-900 rounded-full mix-blend-multiply filter opacity-10 animate-blob"></div>
        <div className="absolute -bottom-50 -left-60 w-80 h-80 bg-gray-900 rounded-full mix-blend-multiply filter blur-xl opacity-90 animate-blob animation-delay-2000"></div>
        <div className="absolute  -bottom-100 -top-30 left-1/2 w-80 h-80 bg-gray-900 rounded-full mix-blend-multiply filter blur-xl opacity-90 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300"
            >
              ← Back
            </Button>
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Settings
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {hasUnsavedChanges && (
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400">
                Unsaved Changes
              </Badge>
            )}
            <Button
              variant="outline"
              onClick={handleReset}
              className="hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button
              onClick={handleSave}
              disabled={!hasUnsavedChanges}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl  top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-blue-500" />
                  Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-rows-7 bg-transparent p-1 h-auto">
                    <TabsTrigger
                      value="general"
                      className="w-full justify-start data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-blue-900/30 data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-300"
                    >
                      <User className="w-4 h-4 mr-2" />
                      General
                    </TabsTrigger>
                    <TabsTrigger
                      value="appearance"
                      className="w-full justify-start data-[state=active]:bg-purple-100 dark:data-[state=active]:bg-purple-900/30 data-[state=active]:text-purple-700 dark:data-[state=active]:text-purple-300"
                    >
                      <Palette className="w-4 h-4 mr-2" />
                      Appearance
                    </TabsTrigger>
                    <TabsTrigger
                      value="notifications"
                      className="w-full justify-start data-[state=active]:bg-green-100 dark:data-[state=active]:bg-green-900/30 data-[state=active]:text-green-700 dark:data-[state=active]:text-green-300"
                    >
                      <Bell className="w-4 h-4 mr-2" />
                      Notifications
                    </TabsTrigger>
                    <TabsTrigger
                      value="privacy"
                      className="w-full justify-start data-[state=active]:bg-orange-100 dark:data-[state=active]:bg-orange-900/30 data-[state=active]:text-orange-700 dark:data-[state=active]:text-orange-300"
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Privacy
                    </TabsTrigger>
                    <TabsTrigger
                      value="security"
                      className="w-full justify-start data-[state=active]:bg-red-100 dark:data-[state=active]:bg-red-900/30 data-[state=active]:text-red-700 dark:data-[state=active]:text-red-300"
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      Security
                    </TabsTrigger>
                    <TabsTrigger
                      value="advanced"
                      className="w-full justify-start data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-gray-900/30 data-[state=active]:text-gray-700 dark:data-[state=active]:text-gray-300"
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      Advanced
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              {/* General Settings */}
              <TabsContent value="general" className="space-y-6">
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-500" />
                      General Settings
                    </CardTitle>
                    <CardDescription>
                      Manage your basic account information and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="displayName">Display Name</Label>
                        <Input
                          id="displayName"
                          value={settings.displayName}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSettingChange('displayName', e.target.value)}
                          className="transition-all duration-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={settings.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSettingChange('email', e.target.value)}
                          className="transition-all duration-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select value={settings.language} onValueChange={(value) => handleSettingChange('language', value)}>
                          <SelectTrigger className="transition-all duration-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Español</SelectItem>
                            <SelectItem value="fr">Français</SelectItem>
                            <SelectItem value="de">Deutsch</SelectItem>
                            <SelectItem value="ja">日本語</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select value={settings.timezone} onValueChange={(value) => handleSettingChange('timezone', value)}>
                          <SelectTrigger className="transition-all duration-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                            <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                            <SelectItem value="UTC+0">GMT (UTC+0)</SelectItem>
                            <SelectItem value="UTC+1">Central European Time (UTC+1)</SelectItem>
                            <SelectItem value="UTC+9">Japan Standard Time (UTC+9)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Appearance Settings */}
              <TabsContent value="appearance" className="space-y-6">
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="w-5 h-5 text-purple-500" />
                      Appearance Settings
                    </CardTitle>
                    <CardDescription>
                      Customize the look and feel of your chat application
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="theme">Theme</Label>
                        <Select value={settings.theme} onValueChange={(value) => handleSettingChange('theme', value)}>
                          <SelectTrigger className="transition-all duration-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">
                              <div className="flex items-center gap-2">
                                <Sun className="w-4 h-4" />
                                Light
                              </div>
                            </SelectItem>
                            <SelectItem value="dark">
                              <div className="flex items-center gap-2">
                                <Moon className="w-4 h-4" />
                                Dark
                              </div>
                            </SelectItem>
                            <SelectItem value="system">
                              <div className="flex items-center gap-2">
                                <Monitor className="w-4 h-4" />
                                System
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fontSize">Font Size</Label>
                        <Select value={settings.fontSize} onValueChange={(value) => handleSettingChange('fontSize', value)}>
                          <SelectTrigger className="transition-all duration-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">Small</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="large">Large</SelectItem>
                            <SelectItem value="xl">Extra Large</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="animationSpeed">Animation Speed</Label>
                        <Select value={settings.animationSpeed} onValueChange={(value) => handleSettingChange('animationSpeed', value)}>
                          <SelectTrigger className="transition-all duration-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="slow">Slow</SelectItem>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="fast">Fast</SelectItem>
                            <SelectItem value="none">None</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="messageStyle">Message Style</Label>
                        <Select value={settings.messageStyle} onValueChange={(value) => handleSettingChange('messageStyle', value)}>
                          <SelectTrigger className="transition-all duration-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="modern">Modern</SelectItem>
                            <SelectItem value="classic">Classic</SelectItem>
                            <SelectItem value="minimal">Minimal</SelectItem>
                            <SelectItem value="bubble">Bubble</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notification Settings */}
              <TabsContent value="notifications" className="space-y-6">
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="w-5 h-5 text-green-500" />
                      Notification Settings
                    </CardTitle>
                    <CardDescription>
                      Choose what notifications you want to receive and how
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      {[
                        { key: 'emailNotifications', label: 'Email Notifications', icon: Mail, description: 'Receive notifications via email' },
                        { key: 'pushNotifications', label: 'Push Notifications', icon: Smartphone, description: 'Browser push notifications' },
                        { key: 'messageNotifications', label: 'Message Notifications', icon: MessageSquare, description: 'New message alerts' },
                        { key: 'callNotifications', label: 'Call Notifications', icon: Camera, description: 'Incoming call alerts' },
                        { key: 'soundEnabled', label: 'Sound Notifications', icon: settings.soundEnabled ? Volume2 : VolumeX, description: 'Play notification sounds' },
                        { key: 'desktopNotifications', label: 'Desktop Notifications', icon: Monitor, description: 'Show desktop popups' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-300">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                              <item.icon className="w-5 h-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <Label className="text-base font-medium">{item.label}</Label>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                            </div>
                          </div>
                          <Switch
                            checked={settings[item.key as keyof typeof settings] as boolean}
                            onCheckedChange={(checked) => handleSettingChange(item.key, checked)}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Privacy Settings */}
              <TabsContent value="privacy" className="space-y-6">
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-orange-500" />
                      Privacy Settings
                    </CardTitle>
                    <CardDescription>
                      Control your privacy and data sharing preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      {[
                        { key: 'showOnlineStatus', label: 'Show Online Status', icon: Eye, description: 'Let others see when you\'re online' },
                        { key: 'showLastSeen', label: 'Show Last Seen', icon: Eye, description: 'Display when you were last active' },
                        { key: 'readReceipts', label: 'Read Receipts', icon: CheckCircle, description: 'Show when messages are read' },
                        { key: 'typingIndicators', label: 'Typing Indicators', icon: MessageSquare, description: 'Show when you\'re typing' },
                        { key: 'messageForwarding', label: 'Message Forwarding', icon: Share2, description: 'Allow others to forward your messages' }
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-300">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                              <item.icon className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                            </div>
                            <div>
                              <Label className="text-base font-medium">{item.label}</Label>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                            </div>
                          </div>
                          <Switch
                            checked={settings[item.key as keyof typeof settings] as boolean}
                            onCheckedChange={(checked) => handleSettingChange(item.key, checked)}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Settings */}
              <TabsContent value="security" className="space-y-6">
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="w-5 h-5 text-red-500" />
                      Security Settings
                    </CardTitle>
                    <CardDescription>
                      Secure your account and manage security preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-300">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                            <Shield className="w-5 h-5 text-red-600 dark:text-red-400" />
                          </div>
                          <div>
                            <Label className="text-base font-medium">Two-Factor Authentication</Label>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Add an extra layer of security</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={settings.twoFactorEnabled ? "default" : "secondary"}>
                            {settings.twoFactorEnabled ? "Enabled" : "Disabled"}
                          </Badge>
                          <Switch
                            checked={settings.twoFactorEnabled}
                            onCheckedChange={(checked) => handleSettingChange('twoFactorEnabled', checked)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                        <Select value={settings.sessionTimeout} onValueChange={(value) => handleSettingChange('sessionTimeout', value)}>
                          <SelectTrigger className="transition-all duration-300">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="60">1 hour</SelectItem>
                            <SelectItem value="120">2 hours</SelectItem>
                            <SelectItem value="480">8 hours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Advanced Settings */}
              <TabsContent value="advanced" className="space-y-6">
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-gray-500" />
                      Advanced Settings
                    </CardTitle>
                    <CardDescription>
                      Advanced options and developer settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-300">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 dark:bg-gray-900/30 rounded-full flex items-center justify-center">
                            <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                          </div>
                          <div>
                            <Label className="text-base font-medium">Developer Mode</Label>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Enable developer tools and debugging</p>
                          </div>
                        </div>
                        <Switch
                          checked={settings.developerMode}
                          onCheckedChange={(checked) => handleSettingChange('developerMode', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-300">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 dark:bg-gray-900/30 rounded-full flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                          </div>
                          <div>
                            <Label className="text-base font-medium">Analytics</Label>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Help improve the app with usage analytics</p>
                          </div>
                        </div>
                        <Switch
                          checked={settings.analyticsEnabled}
                          onCheckedChange={(checked) => handleSettingChange('analyticsEnabled', checked)}
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Data Management</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <Button variant="outline" className="justify-start hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-300">
                          <Download className="w-4 h-4 mr-2" />
                          Export Data
                        </Button>
                        <Button variant="outline" className="justify-start hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors duration-300">
                          <Upload className="w-4 h-4 mr-2" />
                          Import Data
                        </Button>
                      </div>
                      <Button variant="outline" className="justify-start hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-300 text-red-600 dark:text-red-400">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
