import React from 'react'

interface AudioVisualizerProps {
  isRecording?: boolean
  isPlaying?: boolean
  height?: number
  barCount?: number
  className?: string
}

export function AudioVisualizer({
  isRecording = false,
  isPlaying = false,
  height = 24,
  barCount = 16,
  className = ""
}: AudioVisualizerProps) {
  const [audioData, setAudioData] = React.useState<number[]>([])

  React.useEffect(() => {
    if (isRecording || isPlaying) {
      const interval = setInterval(() => {
        // Generate more realistic audio data for visualization
        const newData = Array.from({ length: barCount }, (_, index) => {
          const baseAmplitude = isRecording ? 0.6 : 0.3
          const variation = Math.sin(Date.now() * 0.01 + index * 0.5) * 0.3
          const randomFactor = Math.random() * 0.4
          return Math.max(0.1, Math.min(1, baseAmplitude + variation + randomFactor))
        })
        setAudioData(newData)
      }, 80)

      return () => clearInterval(interval)
    } else {
      setAudioData([])
    }
  }, [isRecording, isPlaying, barCount])

  if (!isRecording && !isPlaying) {
    return null
  }

  return (
    <div className={`flex items-center justify-center gap-0.5 ${className}`}>
      {audioData.map((amplitude, index) => (
        <div
          key={index}
          className={`rounded-full transition-all duration-150 ${
            isRecording
              ? 'bg-gradient-to-t from-blue-500 to-blue-400 shadow-sm'
              : 'bg-gradient-to-t from-blue-500 to-blue-400 shadow-sm'
          }`}
          style={{
            width: `${Math.max(2, 100 / barCount - 2)}px`,
            height: `${amplitude * height}px`,
            minHeight: '2px',
            maxHeight: `${height}px`,
            transform: `scaleY(${isRecording ? 1 + amplitude * 0.3 : 1})`,
          }}
        />
      ))}
    </div>
  )
}
