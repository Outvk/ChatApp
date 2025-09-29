"use client"

import { useState, useEffect, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Phone, Video, MoreVertical, Mic, Image as ImageIcon } from "lucide-react"
import { AudioVisualizer } from "@/components/audio-visualizer"
import { CallModal } from "@/components/call-modal"

// Sample chat data
const sampleMessages = [
  {
    id: 1,
    user: "Alice Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    message: "Hey! How's the project going?",
    time: "10:30 AM",
    isOwn: false,
    isGif: false,
    isVoice: false,
    isFile: false,
  },
  {
    id: 2,
    user: "You",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
    message: "It's going great! Almost finished with the new features.",
    time: "10:32 AM",
    isOwn: true,
    isGif: false,
    isVoice: false,
    isFile: false,
  },
  {
    id: 3,
    user: "Alice Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    message: "That's awesome! Can't wait to see it in action.",
    time: "10:33 AM",
    isOwn: false,
    isGif: false,
    isVoice: false,
    isFile: false,
  },
  {
    id: 4,
    user: "You",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
    message: "I'll send you a demo link once it's ready!",
    time: "10:35 AM",
    isOwn: true,
    isGif: false,
    isVoice: false,
    isFile: false,
  },
]

export default function Container({ selectedUser, chatBackground }: {
  selectedUser: any;
  chatBackground: string;
}) {
  const [userChats, setUserChats] = useState<{ [userId: string]: any[] }>({})
  const [currentUserId, setCurrentUserId] = useState<string>("")
  const [newMessage, setNewMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [showGifPicker, setShowGifPicker] = useState(false)
  const [showCallModal, setShowCallModal] = useState(false)
  const [callType, setCallType] = useState<'audio' | 'video'>('audio')
  const [selectedMessages, setSelectedMessages] = useState<Set<number>>(new Set())
  const [editingMessage, setEditingMessage] = useState<number | null>(null)
  const [editText, setEditText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const [isPlaying, setIsPlaying] = useState<number | null>(null)

  // Get current user's messages
  const messages = userChats[currentUserId] || []

  // Initialize chat when selectedUser changes
  useEffect(() => {
    if (selectedUser?.name) {
      const userId = selectedUser.name
      if (!userChats[userId]) {
        setUserChats(prev => ({
          ...prev,
          [userId]: []
        }))
      }
      setCurrentUserId(userId)
    }
  }, [selectedUser?.name])

  // Auto-scroll to bottom when messages or typing changes
  useEffect(() => {
    // Small delay to ensure DOM is updated before scrolling
    const timeoutId = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest'
      })
    }, 100)

    return () => clearTimeout(timeoutId)
  }, [messages, isTyping])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest'
    })
  }

  const handleSendMessage = async () => {
    if (newMessage.trim() && currentUserId) {
      console.log('handleSendMessage called with:', newMessage)
      console.log('currentUserId:', currentUserId)
      console.log('selectedUser:', selectedUser)

      const message = {
        id: (userChats[currentUserId]?.length || 0) + 1,
        user: "You",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
        message: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
        isGif: false,
        isVoice: false,
        isFile: false,
      }

      console.log('User message object:', message)

      setUserChats((prev: { [userId: string]: any[] }) => {
        console.log('Previous userChats:', prev)
        const newChats = {
          ...prev,
          [currentUserId]: [...(prev[currentUserId] || []), message]
        }
        console.log('New userChats:', newChats)
        return newChats
      })

      setNewMessage("")
      setIsTyping(true) // Show typing animation

      // Simulate Mistral API response after a short delay
      setTimeout(async () => {
        try {
          console.log('Making Mistral API call...')
          // Mistral API integration
          const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.NEXT_PUBLIC_MISTRAL_API_KEY || 'your-mistral-api-key-here'}`,
            },
            body: JSON.stringify({
              model: 'mistral-medium', // You can change to mistral-small, mistral-large
              messages: [
                {
                  role: 'system',
                  content: `You are ${selectedUser.name}, a friendly and helpful assistant. Respond naturally to the user's message. Keep responses conversational and appropriate length.`
                },
                {
                  role: 'user',
                  content: newMessage
                }
              ],
              max_tokens: 150,
              temperature: 0.7,
            }),
          })

          if (!response.ok) {
            const errorText = await response.text()
            console.error('Mistral API error:', response.status, errorText)
            throw new Error(`Mistral API error: ${response.status} - ${errorText || 'Unknown error'}`)
          }

          const data = await response.json()
          console.log('Mistral response received:', data)

          const botMessage = {
            id: (userChats[currentUserId]?.length || 0) + 2,
            user: selectedUser.name,
            avatar: selectedUser.avatar,
            message: data.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response right now.",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isOwn: false,
            isGif: false,
            isVoice: false,
            isFile: false,
          }

          setUserChats((prev: { [userId: string]: any[] }) => {
            console.log('Adding Mistral bot message to chat:', botMessage)
            return {
              ...prev,
              [currentUserId]: [...(prev[currentUserId] || []), botMessage]
            }
          })
          setIsTyping(false) // Hide typing animation
          console.log('Typing animation hidden')
        } catch (error) {
          console.error('Error calling Mistral API:', error)
          const errorMessage = {
            id: (userChats[currentUserId]?.length || 0) + 2,
            user: selectedUser.name,
            avatar: selectedUser.avatar,
            message: "I'm having trouble connecting to Mistral AI. Please check your API key and try again.",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isOwn: false,
            isGif: false,
            isVoice: false,
            isFile: false,
          }
          setUserChats((prev: { [userId: string]: any[] }) => ({
            ...prev,
            [currentUserId]: [...(prev[currentUserId] || []), errorMessage]
          }))
          setIsTyping(false) // Hide typing animation
        }
      }, 1000) // 1 second delay to simulate thinking
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleVoiceRecord = async () => {
    if (!isRecording) {
      // Start recording
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const mediaRecorder = new MediaRecorder(stream)
        mediaRecorderRef.current = mediaRecorder
        audioChunksRef.current = []

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data)
          }
        }

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
          const audioUrl = URL.createObjectURL(audioBlob)

          const voiceMessage = {
            id: messages.length + 1,
            user: "You",
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
            message: "Voice message",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isOwn: true,
            isVoice: true,
            isGif: false,
            isFile: false,
            audioUrl: audioUrl,
            audioBlob: audioBlob,
            duration: Math.round(audioBlob.size / 16000) // Rough duration estimate
          }

          setUserChats((prev: { [userId: string]: any[] }) => ({
            ...prev,
            [currentUserId]: [...(prev[currentUserId] || []), voiceMessage]
          }))

          // Stop all tracks to release microphone
          stream.getTracks().forEach(track => track.stop())
        }

        mediaRecorder.start()
        setIsRecording(true)
        console.log("Voice recording started")
      } catch (error) {
        console.error('Error starting voice recording:', error)
        alert('Error accessing microphone. Please check permissions.')
      }
    } else {
      // Stop recording
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop()
        setIsRecording(false)
        console.log("Voice recording stopped")
      }
    }
  }

  const handleFileSelect = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && currentUserId) {
      // Create object URL for preview
      const fileUrl = URL.createObjectURL(file)

      // Determine file type and icon
      const getFileIcon = (type: string, name: string) => {
        if (type.startsWith('image/')) return null // Will show actual image
        if (type.includes('pdf')) return '📄'
        if (type.includes('document') || type.includes('word')) return '📝'
        if (type.includes('spreadsheet') || type.includes('excel')) return '📊'
        if (type.includes('presentation') || type.includes('powerpoint')) return '📋'
        if (type.includes('zip') || type.includes('rar')) return '📦'
        if (type.includes('video')) return '🎥'
        if (type.includes('audio')) return '🎵'
        return '📎' // Default file icon
      }

      const fileIcon = getFileIcon(file.type, file.name)

      const message = {
        id: (userChats[currentUserId]?.length || 0) + 1,
        user: "You",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
        message: fileIcon ? `${fileIcon} ${file.name}` : file.name,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
        isGif: false,
        isVoice: false,
        isFile: true,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        fileUrl: fileUrl,
        file: file
      }

      setUserChats((prev: { [userId: string]: any[] }) => {
        console.log('Adding file message to chat:', message)
        return {
          ...prev,
          [currentUserId]: [...(prev[currentUserId] || []), message]
        }
      })

      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleAudioCall = () => {
    setCallType('audio')
    setShowCallModal(true)
  }

  const handleVideoCall = () => {
    setCallType('video')
    setShowCallModal(true)
  }

  const handleCloseCall = () => {
    setShowCallModal(false)
  }

  const handleMessageSelect = (messageId: number) => {
    setSelectedMessages(prev => {
      const newSet = new Set(prev)
      if (newSet.has(messageId)) {
        newSet.delete(messageId)
      } else {
        newSet.add(messageId)
      }
      return newSet
    })
  }

  const handleDeleteSelected = () => {
    if (currentUserId) {
      setUserChats((prev: { [userId: string]: any[] }) => ({
        ...prev,
        [currentUserId]: prev[currentUserId]?.filter(msg => !selectedMessages.has(msg.id)) || []
      }))
      setSelectedMessages(new Set())
    }
  }

  const handleEditMessage = (messageId: number) => {
    const message = messages.find(msg => msg.id === messageId)
    if (message && message.isOwn) {
      setEditingMessage(messageId)
      setEditText(message.message)
    }
  }

  const handleSaveEdit = () => {
    if (editingMessage && currentUserId) {
      setUserChats((prev: { [userId: string]: any[] }) => ({
        ...prev,
        [currentUserId]: prev[currentUserId]?.map(msg =>
          msg.id === editingMessage ? { ...msg, message: editText } : msg
        ) || []
      }))
      setEditingMessage(null)
      setEditText("")
    }
  }

  const handleCancelEdit = () => {
    setEditingMessage(null)
    setEditText("")
  }

  const clearSelection = () => {
    setSelectedMessages(new Set())
  }

  // Audio playback functions
  const playAudio = (messageId: number, audioUrl: string) => {
    const audio = new Audio(audioUrl)
    setIsPlaying(messageId)

    audio.onended = () => {
      setIsPlaying(null)
    }

    audio.onerror = () => {
      console.error('Error playing audio')
      setIsPlaying(null)
    }

    audio.play().catch(error => {
      console.error('Error playing audio:', error)
      setIsPlaying(null)
    })
  }

  const pauseAudio = () => {
    // This would pause currently playing audio if we had a reference to it
    setIsPlaying(null)
  }

  // Background mapping with higher specificity
  const getBackgroundStyle = (bgId: string) => {
    console.log('getBackgroundStyle called with:', bgId)
    const bgMap: { [key: string]: React.CSSProperties } = {
      'default': {},
      'gradient1': {
        backgroundImage: 'linear-gradient(135deg, #ff7e5f 0%, #feb47b 50%, #ff6b9d 100%)',
        backgroundAttachment: 'local'
      },
      'gradient2': {
        backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        backgroundAttachment: 'local'
      },
      'gradient3': {
        backgroundImage: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #43e97b 100%)',
        backgroundAttachment: 'local'
      },
      'gradient4': {
        backgroundImage: 'linear-gradient(135deg, #2c3e50 0%, #3498db 50%, #9b59b6 100%)',
        backgroundAttachment: 'local'
      },
      'gradient5': {
        backgroundImage: 'linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%)',
        backgroundAttachment: 'local'
      },
      'solid1': {
        backgroundColor: '#eff6ff',
        backgroundAttachment: 'local'
      },
      'solid2': {
        backgroundColor: '#f0fdf4',
        backgroundAttachment: 'local'
      },
      'solid3': {
        backgroundColor: '#faf5ff',
        backgroundAttachment: 'local'
      },
    }
    const style = bgMap[bgId] || {}
    console.log('Returning style:', style)
    return style
  }

  const getBackgroundImage = (bgId: string) => {
    console.log('getBackgroundImage called with:', bgId)
    const bgMap: { [key: string]: string } = {
      'gradient1': 'linear-gradient(135deg, #ff7e5f 0%, #feb47b 50%, #ff6b9d 100%)',
      'gradient2': 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      'gradient3': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #43e97b 100%)',
      'gradient4': 'linear-gradient(135deg, #2c3e50 0%, #3498db 50%, #9b59b6 100%)',
      'gradient5': 'linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%)',
    }
    const result = bgMap[bgId] || 'none'
    console.log('getBackgroundImage returning:', result)
    return result
  }

  const getMessagesContainerStyle = () => {
    console.log('getMessagesContainerStyle called with chatBackground:', chatBackground)

    const baseStyle: React.CSSProperties = {
      minHeight: '100%'
    }

    if (chatBackground === 'default') {
      return baseStyle
    }

    if (chatBackground.startsWith('gradient')) {
      const backgroundImage = getBackgroundImage(chatBackground)
      console.log('Applying gradient background:', backgroundImage)
      return {
        ...baseStyle,
        backgroundImage: backgroundImage,
        backgroundSize: 'cover !important',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'local'
      }
    }

    if (chatBackground.startsWith('solid')) {
      const backgroundColor = getBackgroundColor(chatBackground)
      console.log('Applying solid background:', backgroundColor)
      return {
        ...baseStyle,
        backgroundColor: backgroundColor,
        backgroundSize: 'cover !important',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'local'
      }
    }

    return baseStyle
  }

  const getBackgroundColor = (bgId: string) => {
    console.log('getBackgroundColor called with:', bgId)
    const bgMap: { [key: string]: string } = {
      'solid1': '#eff6ff',
      'solid2': '#f0fdf4',
      'solid3': '#faf5ff',
    }
    const result = bgMap[bgId] || 'transparent'
    console.log('getBackgroundColor returning:', result)
    return result
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b bg-card/90 backdrop-blur-sm z-20 relative rounded-t-lg">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-10 w-10">
              <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
              <AvatarFallback>{selectedUser.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
            </Avatar>
            {selectedUser.isOnline && (
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></div>
            )}
          </div>
          <div>
            <h2 className="font-semibold text-foreground">{selectedUser.name}</h2>
            <p className="text-sm text-muted-foreground">{selectedUser.status}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleAudioCall} className="h-8 w-8">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleVideoCall} className="h-8 w-8">
            <Video className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Selection Controls */}
      {selectedMessages.size > 0 && (
        <div className="flex items-center justify-between p-3 bg-primary/10 border-b z-20 relative ">
          <span className="text-sm font-medium">
            {selectedMessages.size} message{selectedMessages.size > 1 ? 's' : ''} selected
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={clearSelection}
              className="h-8"
            >
              Cancel
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDeleteSelected}
              className="h-8 text-destructive hover:text-destructive"
            >
              Delete
            </Button>
          </div>
        </div>
      )}

      {/* Messages Area with Background */}
      <div className="relative h-96 sm:h-[500px] md:h-[600px] lg:h-[500px] overflow-hidden">
        <div
          className="p-4 h-full overflow-y-auto"
          data-background={chatBackground}
          style={getMessagesContainerStyle()}
        >
          {/* Welcome Header - shows only when no messages */}
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="mb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl">💬</span>
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Start a conversation with {selectedUser.name}
                </h2>
                <p className="text-muted-foreground">
                  Send a message to begin chatting. Your conversation will appear here.
                </p>
              </div>
            </div>
          )}

          {/* Messages Content */}
          <div className="space-y-4" ref={messagesEndRef}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
              >
                {!msg.isOwn && (
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarImage src={msg.avatar} alt={msg.user} />
                    <AvatarFallback className="text-xs">{msg.user.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                )}

                <div className={`flex flex-col gap-1 max-w-[70%] ${msg.isOwn ? 'items-end' : 'items-start'}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">{msg.user}</span>
                    <span className="text-xs text-muted-foreground">{msg.time}</span>
                    {msg.isOwn && (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleMessageSelect(msg.id)}
                          className={`w-4 h-4 rounded border-2 transition-colors ${
                            selectedMessages.has(msg.id)
                              ? 'bg-primary border-primary'
                              : 'border-muted-foreground hover:border-primary'
                          }`}
                        >
                          {selectedMessages.has(msg.id) && (
                            <div className="w-full h-full bg-primary-foreground rounded-sm" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  {editingMessage === msg.id ? (
                    <div className="flex items-center gap-2">
                      <Input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="flex-1"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') handleSaveEdit()
                          if (e.key === 'Escape') handleCancelEdit()
                        }}
                      />
                      <Button size="sm" onClick={handleSaveEdit} className="h-8">Save</Button>
                      <Button size="sm" variant="outline" onClick={handleCancelEdit} className="h-8">Cancel</Button>
                    </div>
                  ) : (
                    <div
                      className={`rounded-lg px-3 py-2 text-sm cursor-pointer transition-colors ${
                        selectedMessages.has(msg.id)
                          ? 'bg-primary/20 border-2 border-primary'
                          : msg.isOwn
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                      onClick={() => msg.isOwn && handleMessageSelect(msg.id)}
                    >
                      {msg.isGif ? (
                        <img
                          src={msg.message}
                          alt="GIF"
                          className="max-w-full h-auto rounded"
                          style={{ maxWidth: '200px', maxHeight: '150px' }}
                        />
                      ) : msg.isVoice ? (
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => msg.audioUrl && playAudio(msg.id, msg.audioUrl)}
                              className="w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
                              disabled={isPlaying === msg.id}
                            >
                              {isPlaying === msg.id ? (
                                <div className="w-3 h-3 bg-white rounded-sm animate-pulse" />
                              ) : (
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832L12 11.202a1 1 0 000-1.664L9.555 7.168z" clipRule="evenodd" />
                                </svg>
                              )}
                            </button>
                            <div className="flex-1">
                              <div className="text-sm font-medium">Voice message</div>
                              <div className="text-xs opacity-70">
                                {msg.duration ? `${Math.floor(msg.duration / 60)}:${(msg.duration % 60).toString().padStart(2, '0')}` : '0:00'}
                              </div>
                            </div>
                            <div className="text-xs opacity-50">
                              {isPlaying === msg.id ? 'Playing...' : 'Tap to play'}
                            </div>
                          </div>
                          <AudioVisualizer
                            isPlaying={isPlaying === msg.id}
                            height={20}
                            barCount={12}
                            className="w-full"
                            audioData={msg.audioBlob}
                          />
                        </div>
                      ) : msg.isFile ? (
                        <div className="flex flex-col gap-2 max-w-sm">
                          {(msg as any).fileType?.startsWith('image/') ? (
                            <div className="relative group">
                              <img
                                src={(msg as any).fileUrl}
                                alt={(msg as any).fileName}
                                className="max-w-full h-auto rounded-lg shadow-md"
                                style={{ maxWidth: '250px', maxHeight: '200px' }}
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <div className="bg-black/70 text-white px-2 py-1 rounded text-sm">
                                  {(msg as any).fileName}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded flex items-center justify-center text-lg">
                                {(msg as any).fileType?.includes('pdf') ? '📄' :
                                 (msg as any).fileType?.includes('document') || (msg as any).fileType?.includes('word') ? '📝' :
                                 (msg as any).fileType?.includes('spreadsheet') || (msg as any).fileType?.includes('excel') ? '📊' :
                                 (msg as any).fileType?.includes('presentation') || (msg as any).fileType?.includes('powerpoint') ? '📋' :
                                 (msg as any).fileType?.includes('zip') || (msg as any).fileType?.includes('rar') ? '📦' :
                                 (msg as any).fileType?.includes('video') ? '🎥' :
                                 (msg as any).fileType?.includes('audio') ? '🎵' : '📎'}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium truncate">{(msg as any).fileName}</div>
                                <div className="text-xs opacity-70">
                                  {(msg as any).fileSize ? `${((msg as any).fileSize / 1024 / 1024).toFixed(1)} MB` : ''}
                                </div>
                              </div>
                              <button
                                onClick={() => {
                                  if ((msg as any).fileUrl) {
                                    const link = document.createElement('a')
                                    link.href = (msg as any).fileUrl
                                    link.download = (msg as any).fileName
                                    link.click()
                                  }
                                }}
                                className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                              >
                                Download
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span>{msg.message}</span>
                          {msg.isOwn && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleEditMessage(msg.id)
                              }}
                              className="opacity-0 group-hover:opacity-100 transition-opacity text-xs hover:text-accent-foreground"
                            >
                              ✏️
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {msg.isOwn && (
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarImage src={msg.avatar} alt={msg.user} />
                    <AvatarFallback className="text-xs">{msg.user.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3 justify-start animate-fadeIn">
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                  <AvatarFallback className="text-xs">{selectedUser.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                </Avatar>

                <div className="flex flex-col gap-1 max-w-[70%] items-start">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">{selectedUser.name}</span>
                    <span className="text-xs text-muted-foreground">typing...</span>
                  </div>

                  <div className="bg-muted rounded-lg px-3 py-2 text-sm">
                    <div className="flex items-center gap-1">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="p-4 border-t bg-card/90 backdrop-blur-sm z-20 relative rounded-b-lg">
        {isRecording && (
          <div
            className="mb-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            onClick={handleVoiceRecord}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Recording...</span>
              <span className="text-xs text-blue-500 dark:text-blue-400">Tap to stop</span>
            </div>
            <AudioVisualizer isRecording={true} height={28} barCount={18} className="w-full" />
          </div>
        )}

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Button
              variant={isRecording ? "destructive" : "ghost"}
              size="icon"
              onClick={handleVoiceRecord}
              className="h-8 w-8"
            >
              <Mic className={`h-4 w-4 ${isRecording ? 'animate-pulse' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFileSelect}
              className="h-8 w-8"
            >
              <ImageIcon className="h-4 w-4" />
            </Button>
          </div>

          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*,audio/*,application/pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.rar,text/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Call Modal */}
      <CallModal
        isOpen={showCallModal}
        onClose={handleCloseCall}
        callType={callType}
        selectedUser={selectedUser}
      />
    </div>
  )
}