'use client'

import { useRef, useState } from 'react'

import { PlayerProps, PlayerState } from '../types/player.types'

export const VideoPlayer = ({
  src,
  poster,
  onPlay,
  onPause,
  onEnded,
  onTimeUpdate,
  className = '',
}: PlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playerState, setPlayerState] = useState<PlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    muted: false,
  })

  const handlePlay = () => {
    setPlayerState((prev) => ({ ...prev, isPlaying: true }))
    onPlay?.()
  }

  const handlePause = () => {
    setPlayerState((prev) => ({ ...prev, isPlaying: false }))
    onPause?.()
  }

  const handleEnded = () => {
    setPlayerState((prev) => ({ ...prev, isPlaying: false }))
    onEnded?.()
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime
      setPlayerState((prev) => ({ ...prev, currentTime }))
      onTimeUpdate?.(currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setPlayerState((prev) => ({
        ...prev,
        duration: videoRef.current!.duration,
      }))
    }
  }

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect()
      const percentage = (e.clientX - rect.left) / rect.width
      const newTime = percentage * playerState.duration
      videoRef.current.currentTime = newTime
    }
  }

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (playerState.isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }
  }

  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-black shadow-2xl ${className}`}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="h-full w-full"
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        controls={false}
      />

      {/* Custom Controls Overlay */}
      <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        {/* Progress Bar */}
        <div
          className="mb-3 h-2 w-full cursor-pointer rounded-full bg-gray-600"
          onClick={handleSeek}
        >
          <div
            className="h-full rounded-full bg-blue-500 transition-all duration-150"
            style={{
              width: `${playerState.duration ? (playerState.currentTime / playerState.duration) * 100 : 0}%`,
            }}
          />
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={togglePlayPause}
              className="text-white transition-colors hover:text-blue-400"
            >
              {playerState.isPlaying ? (
                <svg
                  className="h-8 w-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg
                  className="h-8 w-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <div className="text-sm text-white">
              {formatTime(playerState.currentTime)} /{' '}
              {formatTime(playerState.duration)}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.muted = !videoRef.current.muted
                  setPlayerState((prev) => ({ ...prev, muted: !prev.muted }))
                }
              }}
              className="text-white transition-colors hover:text-blue-400"
            >
              {playerState.muted ? (
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Play Button Overlay */}
      {!playerState.isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={togglePlayPause}
            className="transform rounded-full bg-blue-500 p-4 text-white transition-all duration-200 hover:scale-110 hover:bg-blue-600"
          >
            <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
