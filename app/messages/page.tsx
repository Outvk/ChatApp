"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  MessageCircle,
  Search,
  Phone,
  Video,
  MoreVertical,
  ArrowLeft
} from "lucide-react"
import { MessageBubble, TypingIndicator, MessageInput } from "@/components/message-components"
import { ThemeToggle } from "@/components/theme-toggle"

interface Message {
  id: string
  senderId: string
  senderName: string
  senderAvatar: string
  content: string
  timestamp: Date
  type: 'text' | 'image' | 'file' | 'voice' | 'location'
  isRead: boolean
  replyTo?: string
}

interface Chat {
  id: string
  name: string
  avatar: string
  lastMessage: string
  lastMessageTime: Date
  unreadCount: number
  isOnline: boolean
  isTyping: boolean
}

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [message, setMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [chats] = useState<Chat[]>([
    {
      id: '1',
      name: 'Alice Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Hey, how are you doing?',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 5),
      unreadCount: 2,
      isOnline: true,
      isTyping: false
    },
    {
      id: '2',
      name: 'Bob Smith',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Thanks for the help!',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 30),
      unreadCount: 0,
      isOnline: false,
      isTyping: true
    },
    {
      id: '3',
      name: 'Carol Davis',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'See you tomorrow!',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2),
      unreadCount: 1,
      isOnline: true,
      isTyping: false
    }
  ])

  const [messages] = useState<Message[]>([
    {
      id: '1',
      senderId: '1',
      senderName: 'Alice Johnson',
      senderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      content: 'Hey! How are you doing today?',
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
      type: 'text',
      isRead: true
    },
    {
      id: '2',
      senderId: 'me',
      senderName: 'You',
      senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      content: 'I\'m doing great! Just working on some new features for the chat app.',
      timestamp: new Date(Date.now() - 1000 * 60 * 8),
      type: 'text',
      isRead: true
    },
    {
      id: '3',
      senderId: '1',
      senderName: 'Alice Johnson',
      senderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      content: 'That sounds awesome! Can\'t wait to see what you\'ve built.',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      type: 'text',
      isRead: false
    }
  ])

  const selectedChatData = chats.find(chat => chat.id === selectedChat)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!message.trim()) return

    // Add message logic here
    console.log('Sending message:', message)
    setMessage("")
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }

  const formatMessageTime = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return 'now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`

    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  if (!selectedChat) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
        {/* Enhanced Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-60 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-30 left-[480px] w-[480px] h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-blob animation-delay-4000"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
          <div className="absolute top-60 right-20 w-48 h-48 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-8 animate-blob animation-delay-6000"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main Hero Section */}
            <div className="mb-12">
              <div className="relative inline-block mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
                <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-8 shadow-2xl">
                  <MessageCircle className="w-24 h-24 text-blue-500" />
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent dark:from-white dark:via-blue-200 dark:to-purple-200 leading-tight">
                Welcome to
                <br />
                <span className="relative">
                  Messages
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4 max-w-2xl mx-auto leading-relaxed">
                Connect with friends, family, and colleagues in a
                <span className="font-semibold text-blue-600 dark:text-blue-400"> beautiful </span>
                and
                <span className="font-semibold text-purple-600 dark:text-purple-400"> intuitive </span>
                messaging experience
              </p>

              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-8">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Real-time messaging</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Voice messages</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>File sharing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span>End-to-end encryption</span>
                </div>
              </div>
            </div>

            {/* Enhanced Conversation Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {chats.map((chat, index) => (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat.id)}
                  className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-white/20 dark:border-gray-700/20"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Card hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="relative">
                        <Avatar className="w-16 h-16 ring-4 ring-white dark:ring-gray-700 shadow-lg">
                          <AvatarImage src={chat.avatar} alt={chat.name} />
                          <AvatarFallback className="text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                            {chat.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        {chat.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 shadow-lg animate-pulse"></div>
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{chat.name}</h3>
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${chat.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {chat.isOnline ? 'Online' : 'Offline'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-4">
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {chat.lastMessage}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-gray-400">
                          {formatMessageTime(chat.lastMessageTime)}
                        </span>
                        {chat.isTyping && (
                          <div className="flex items-center space-x-1 text-blue-500">
                            <div className="flex space-x-1">
                              <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce"></div>
                              <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                            <span className="text-xs font-medium">typing...</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {chat.unreadCount > 0 && (
                      <div className="flex justify-end">
                        <Badge
                          variant="destructive"
                          className="rounded-full px-3 py-1 text-xs font-semibold bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 shadow-lg"
                        >
                          {chat.unreadCount} new
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-500"></div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="mt-12">
              <div className="inline-flex items-center space-x-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-lg">
                <div className="flex space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
                <span className="text-gray-600 dark:text-gray-300 font-medium">
                  Choose a conversation to get started
                </span>
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
        <div className="absolute -top-40 -right-60 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-30 left-[480px] w-[480px] h-80 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 h-screen flex">
        {/* Sidebar */}
        <div className="w-80 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-r border-gray-200 dark:border-gray-700 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedChat(null)}
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Messages
              </h1>
              <ThemeToggle />
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search conversations..."
                className="pl-10 bg-gray-50 dark:bg-gray-700/50 border-0 focus:bg-white dark:focus:bg-gray-700"
              />
            </div>
          </div>

          {/* Chat List */}
          <ScrollArea className="flex-1">
            <div className="p-2">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat.id)}
                  className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                    selectedChat === chat.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                >
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={chat.avatar} alt={chat.name} />
                      <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {chat.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="font-medium truncate">{chat.name}</div>
                      <div className="text-xs text-gray-500">
                        {formatMessageTime(chat.lastMessageTime)}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500 truncate">{chat.lastMessage}</div>
                      {chat.unreadCount > 0 && (
                        <Badge variant="destructive" className="rounded-full w-5 h-5 flex items-center justify-center text-xs">
                          {chat.unreadCount}
                        </Badge>
                      )}
                    </div>
                    {chat.isTyping && (
                      <div className="text-xs text-blue-500 font-medium">typing...</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={selectedChatData?.avatar} alt={selectedChatData?.name} />
                  <AvatarFallback>{selectedChatData?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{selectedChatData?.name}</div>
                  <div className="text-sm text-gray-500">
                    {selectedChatData?.isOnline ? 'Online' : 'Offline'}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Video className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="hover:bg-gray-100 dark:hover:bg-gray-700">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  isOwn={msg.senderId === 'me'}
                />
              ))}
              <TypingIndicator
                isVisible={selectedChatData?.isTyping || false}
                userName={selectedChatData?.name}
              />
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Message Input */}
          <MessageInput
            value={message}
            onChange={setMessage}
            onSend={handleSendMessage}
            onRecordingToggle={() => setIsRecording(!isRecording)}
            isRecording={isRecording}
          />
        </div>
      </div>
    </div>
  )
}
