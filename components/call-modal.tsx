import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Phone, PhoneOff, Video, VideoOff, Mic, MicOff, Volume2 } from "lucide-react"

interface CallModalProps {
  isOpen: boolean
  onClose: () => void
  callType: 'audio' | 'video'
  selectedUser: {
    name: string
    avatar: string
    status: string
    isOnline: boolean
  }
}

type CallState = 'ringing' | 'connected' | 'ended'

export function CallModal({ isOpen, onClose, callType, selectedUser }: CallModalProps) {
  const [callState, setCallState] = React.useState<CallState>('ringing')
  const [isMuted, setIsMuted] = React.useState(false)
  const [isVideoOn, setIsVideoOn] = React.useState(callType === 'video')
  const [isSpeakerOn, setIsSpeakerOn] = React.useState(true)

  React.useEffect(() => {
    if (isOpen && callState === 'ringing') {
      // Auto-connect after 3 seconds for demo
      const timer = setTimeout(() => {
        setCallState('connected')
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isOpen, callState])

  const handleEndCall = () => {
    setCallState('ended')
    setTimeout(() => {
      onClose()
      setCallState('ringing')
      setIsMuted(false)
      setIsVideoOn(callType === 'video')
      setIsSpeakerOn(true)
    }, 1000)
  }

  const handleToggleMute = () => setIsMuted(!isMuted)
  const handleToggleVideo = () => setIsVideoOn(!isVideoOn)
  const handleToggleSpeaker = () => setIsSpeakerOn(!isSpeakerOn)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className={`relative w-full max-w-2xl mx-4 rounded-2xl overflow-hidden transition-all duration-300 ${
        callType === 'video' ? 'aspect-video bg-gray-900 max-h-[90vh] overflow-y-auto' : 'bg-card border shadow-2xl'
      }`}>

        {/* Video Call Background */}
        {callType === 'video' && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
            <div className="absolute inset-0 bg-black/20" />
          </div>
        )}

        {/* Header */}
        <div className={`relative z-10 p-6 ${callType === 'video' ? 'text-white' : ''}`}>
          <div className="flex items-center justify-center gap-4 mb-8">
            <Avatar className={`${callType === 'video' ? 'h-16 w-16' : 'h-12 w-12'} ring-4 ${
              callState === 'ringing' ? 'ring-yellow-400 animate-pulse' :
              callState === 'connected' ? 'ring-green-400' : 'ring-red-400'
            }`}>
              <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
              <AvatarFallback className="text-lg font-semibold">
                {selectedUser.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>

            <div className="text-center">
              <h2 className={`font-semibold ${callType === 'video' ? 'text-white' : 'text-foreground'}`}>
                {selectedUser.name}
              </h2>
              <p className={`text-sm ${callType === 'video' ? 'text-white/80' : 'text-muted-foreground'}`}>
                {callState === 'ringing' ? 'Ringing...' :
                 callState === 'connected' ? 'Connected' : 'Call ended'}
              </p>
            </div>
          </div>

          {/* Call State Indicator */}
          {callState === 'ringing' && (
            <div className="flex justify-center mb-6">
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Video Call Content */}
          {callType === 'video' && callState === 'connected' && (
            <div className="relative mb-6">
              <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                <div className="text-center text-white/60">
                  <Video className="h-12 w-12 mx-auto mb-2" />
                  <p>Video stream would appear here</p>
                </div>
              </div>

              {/* Self Video (small corner) */}
              <div className="absolute bottom-2 right-2 w-24 h-16 bg-gray-700 rounded-lg flex items-center justify-center">
                <div className="text-center text-white/60 text-xs">
                  <div className="w-8 h-8 bg-gray-600 rounded-full mx-auto mb-1" />
                  <p>You</p>
                </div>
              </div>
            </div>
          )}

          {/* Audio Call Content */}
          {callType === 'audio' && callState === 'connected' && (
            <div className="flex justify-center mb-6">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                      <AvatarFallback className="bg-white/20 text-white">
                        {selectedUser.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Call Controls - Hidden when showing placeholder */}
        {callState === 'connected' && (
          <div className={`relative z-10 p-6 pt-0 ${callType === 'video' ? 'bg-black/50' : 'bg-card'}`}>
            <div className="flex items-center justify-center gap-4">
              {/* Mute/Unmute */}
              <Button
                variant={isMuted ? "destructive" : "secondary"}
                size="icon"
                onClick={handleToggleMute}
                className="h-12 w-12 rounded-full"
              >
                {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </Button>

              {/* Speaker */}
              <Button
                variant={isSpeakerOn ? "secondary" : "outline"}
                size="icon"
                onClick={handleToggleSpeaker}
                className="h-12 w-12 rounded-full"
              >
                <Volume2 className="h-5 w-5" />
              </Button>

              {/* Video Toggle (Video calls only) */}
              {callType === 'video' && (
                <Button
                  variant={isVideoOn ? "secondary" : "outline"}
                  size="icon"
                  onClick={handleToggleVideo}
                  className="h-12 w-12 rounded-full"
                >
                  {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                </Button>
              )}

              {/* End Call */}
              <Button
                variant="destructive"
                size="icon"
                onClick={handleEndCall}
                className="h-12 w-12 rounded-full"
              >
                <PhoneOff className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}

        {/* Close button for ringing state */}
        {callState === 'ringing' && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEndCall}
            className="absolute top-4 right-4 text-white/80 hover:text-white"
          >
            Cancel
          </Button>
        )}
      </div>
    </div>
  )
}
