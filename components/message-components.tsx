import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface MessageBubbleProps {
  message: {
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
  isOwn?: boolean
}

export function MessageBubble({ message, isOwn = false }: MessageBubbleProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }

  return (
    <div className={cn(
      "flex items-end space-x-2 max-w-xs lg:max-w-md group",
      isOwn ? "flex-row-reverse space-x-reverse" : ""
    )}>
      <Avatar className="w-8 h-8 flex-shrink-0">
        <AvatarImage src={message.senderAvatar} alt={message.senderName} />
        <AvatarFallback className="text-xs">{message.senderName.charAt(0)}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col">
        {/* Reply indicator */}
        {message.replyTo && (
          <div className="mb-1 text-xs text-gray-500 dark:text-gray-400">
            Replying to a message
          </div>
        )}

        {/* Message content */}
        <div className={cn(
          "rounded-2xl px-4 py-2 relative transition-all duration-300 group-hover:scale-[1.02]",
          isOwn
            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
            : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm"
        )}>
          {/* Message type specific content */}
          {message.type === 'text' && (
            <div className="text-sm whitespace-pre-wrap">{message.content}</div>
          )}

          {message.type === 'image' && (
            <div className="space-y-2">
              <img
                src={message.content}
                alt="Shared image"
                className="rounded-lg max-w-full h-auto"
              />
              {message.content && (
                <div className="text-sm">{message.content}</div>
              )}
            </div>
          )}

          {message.type === 'file' && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                📄
              </div>
              <div>
                <div className="text-sm font-medium">Document</div>
                <div className="text-xs opacity-80">{message.content}</div>
              </div>
            </div>
          )}

          {message.type === 'voice' && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                🎵
              </div>
              <div>
                <div className="text-sm font-medium">Voice Message</div>
                <div className="text-xs opacity-80">{message.content}</div>
              </div>
            </div>
          )}

          {message.type === 'location' && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                📍
              </div>
              <div>
                <div className="text-sm font-medium">Location</div>
                <div className="text-xs opacity-80">{message.content}</div>
              </div>
            </div>
          )}

          {/* Timestamp */}
          <div className={cn(
            "text-xs mt-1 flex items-center space-x-1",
            isOwn ? "text-blue-100 justify-end" : "text-gray-500"
          )}>
            <span>{formatTime(message.timestamp)}</span>
            {isOwn && (
              <div className="flex items-center">
                {message.isRead ? (
                  <div className="w-4 h-4 flex items-center justify-center">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-4 h-4 rounded-full bg-white/30"></div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

interface TypingIndicatorProps {
  isVisible: boolean
  userName?: string
}

export function TypingIndicator({ isVisible, userName }: TypingIndicatorProps) {
  if (!isVisible) return null

  return (
    <div className="flex justify-start mb-4">
      <div className="flex items-end space-x-2 max-w-xs">
        <Avatar className="w-8 h-8">
          <AvatarFallback className="text-xs bg-gray-300 dark:bg-gray-600">
            {userName?.charAt(0) || '?'}
          </AvatarFallback>
        </Avatar>
        <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-2">
          <div className="flex items-center space-x-1">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span className="text-xs text-gray-500 ml-2">
              {userName || 'Someone'} is typing...
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

interface MessageInputProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  onRecordingToggle: () => void
  isRecording: boolean
  placeholder?: string
}

export function MessageInput({
  value,
  onChange,
  onSend,
  onRecordingToggle,
  isRecording,
  placeholder = "Type a message..."
}: MessageInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-end space-x-2">
        <div className="flex-1 relative">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full resize-none rounded-2xl px-4 py-3 pr-20 bg-gray-50 dark:bg-gray-700/50 border-0 focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-blue-500 transition-all duration-300 max-h-32"
            rows={1}
            onKeyPress={handleKeyPress}
            style={{ minHeight: '48px' }}
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            <button className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300">
              <span className="text-lg">😊</span>
            </button>
            <button className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>
          </div>
        </div>
        <button
          onClick={onSend}
          disabled={!value.trim()}
          className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
        <button
          onClick={onRecordingToggle}
          className={`h-12 w-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
            isRecording
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          {isRecording ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          )}
        </button>
      </div>
      {isRecording && (
        <div className="mt-3 text-center">
          <div className="inline-flex items-center space-x-2 text-red-500 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-full">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span className="text-sm font-medium">Recording voice message...</span>
            <button className="ml-2 text-red-600 hover:text-red-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
