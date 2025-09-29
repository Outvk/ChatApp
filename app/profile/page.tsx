"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  User,
  Settings,
  Bell,
  Shield,
  Palette,
  Camera,
  Edit3,
  Save,
  X,
  Star,
  MessageSquare,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Globe,
  Trophy,
  Activity,
  Heart,
  Share2,
  Download,
  Upload,
  Eye,
  EyeOff
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Alex Johnson",
    username: "alexjohnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "https://alexjohnson.dev",
    bio: "Full-stack developer passionate about creating beautiful, functional web experiences. Love React, Next.js, and modern web technologies.",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=400&fit=crop",
    joinDate: "January 2024",
    lastActive: "2 hours ago",
    stats: {
      messages: 1247,
      connections: 89,
      projects: 23,
      achievements: 15
    },
    skills: ["React", "Next.js", "TypeScript", "Node.js", "Python", "AWS", "Docker", "GraphQL"],
    interests: ["Web Development", "AI/ML", "Open Source", "Design Systems", "Mobile Apps"],
    socialLinks: {
      github: "https://github.com/alexjohnson",
      linkedin: "https://linkedin.com/in/alexjohnson",
      twitter: "https://twitter.com/alexjohnson",
      discord: "alexjohnson#1234"
    }
  })

  const [editData, setEditData] = useState(profileData)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleSave = () => {
    setProfileData(editData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData(profileData)
    setIsEditing(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded-2xl mb-8"></div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="h-80 bg-gray-300 dark:bg-gray-700 rounded-2xl"></div>
              </div>
              <div className="md:w-2/3 space-y-6">
                <div className="h-32 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
                <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-60 w-890 h-50 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-100 animate-blob"></div>
    
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header Actions */}
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
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-100 to-gray-300 bg-clip-text text-transparent">
              Profile
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-gradient-to-r text-gray-700 from-purple-c500 to-purple-200 hover:from-gray-900 hover:to-blue-200 hover:text-white transition-all duration-300"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Profile Cover */}
        <div className="relative mb-8 group">
          <div className="h-64 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-2xl overflow-hidden relative">
            <img
              src={profileData.coverImage}
              alt="Cover"
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

            {isEditing && (
              <Button
                size="sm"
                variant="secondary"
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <Camera className="w-4 h-4 mr-2" />
                Change Cover
              </Button>
            )}
          </div>

          {/* Profile Avatar */}
          <div className="absolute -bottom-16 left-8">
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-white dark:border-gray-800 shadow-2xl">
                <AvatarImage src={profileData.avatar} alt={profileData.name} />
                <AvatarFallback className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  {profileData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>

              {isEditing && (
                <Button
                  size="sm"
                  variant="secondary"
                  className="absolute -bottom-2 -right-2 rounded-full w-10 h-10 p-0"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              )}

              {/* Online Status */}
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="grid lg:grid-cols-3 gap-8 mt-20">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <User className="w-5 h-5 text-blue-500" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={editData.name}
                        onChange={(e) => setEditData({...editData, name: e.target.value})}
                        className="transition-all duration-300"
                      />
                    ) : (
                      <p className="text-lg font-semibold">{profileData.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    {isEditing ? (
                      <Input
                        id="username"
                        value={editData.username}
                        onChange={(e) => setEditData({...editData, username: e.target.value})}
                        className="transition-all duration-300"
                      />
                    ) : (
                      <p className="text-lg">@{profileData.username}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={editData.email}
                        onChange={(e) => setEditData({...editData, email: e.target.value})}
                        className="transition-all duration-300"
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <p>{profileData.email}</p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={editData.phone}
                        onChange={(e) => setEditData({...editData, phone: e.target.value})}
                        className="transition-all duration-300"
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <p>{profileData.phone}</p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bio">Bio</Label>
                    {isEditing ? (
                      <Textarea
                        id="bio"
                        value={editData.bio}
                        onChange={(e) => setEditData({...editData, bio: e.target.value})}
                        rows={3}
                        className="transition-all duration-300"
                      />
                    ) : (
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {profileData.bio}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: MessageSquare, label: "Messages", value: profileData.stats.messages, color: "text-blue-500" },
                { icon: User, label: "Connections", value: profileData.stats.connections, color: "text-green-500" },
                { icon: Trophy, label: "Projects", value: profileData.stats.projects, color: "text-purple-500" },
                { icon: Star, label: "Achievements", value: profileData.stats.achievements, color: "text-yellow-500" }
              ].map((stat, index) => (
                <Card key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-4 text-center">
                    <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                    <p className="text-2xl font-bold">{stat.value.toLocaleString()}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Skills & Interests */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-blue-500" />
                    Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors duration-300"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    Interests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profileData.interests.map((interest, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-purple-200 text-purple-700 dark:border-purple-800 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors duration-300"
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column - Activity & Settings */}
          <div className="space-y-6">
            {/* Activity Status */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-500" />
                  Activity Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                    Online
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Last Active</span>
                  <span className="text-sm font-medium">{profileData.lastActive}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Member Since</span>
                  <span className="text-sm font-medium">{profileData.joinDate}</span>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xs border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-500" />
                  Social Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(profileData.socialLinks).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-300 group"
                  >
                    <div className="w-8 h-8 bg-gray-100 dark:bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-gray-900 transition-colors duration-300">
                      <Globe className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </div>
                    <span className="capitalize text-sm">{platform}</span>
                  </a>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-300">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Profile
                </Button>
                <Button variant="outline" className="w-full justify-start hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors duration-300">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
                <Button variant="outline" className="w-full justify-start hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors duration-300">
                  <Upload className="w-4 h-4 mr-2" />
                  Import Data
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
