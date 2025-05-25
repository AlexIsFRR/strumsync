"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipBack, SkipForward, Volume2, Repeat, Shuffle } from "lucide-react"

interface Song {
  title: string
  artist: string
  duration: number
  key: string
  tempo: number
}

interface AudioPlayerProps {
  song: Song
  isPlaying: boolean
  currentTime: number
  onPlayPause: () => void
  onSeek: (time: number) => void
}

export function AudioPlayer({ song, isPlaying, currentTime, onPlayPause, onSeek }: AudioPlayerProps) {
  const [volume, setVolume] = useState([75])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const progress = (currentTime / song.duration) * 100

  return (
    <div className="space-y-4">
      {/* Song Info */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">{song.title[0]}</span>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{song.title}</h3>
          <p className="text-gray-600">{song.artist}</p>
          <div className="flex gap-4 text-sm text-gray-500 mt-1">
            <span>Key: {song.key}</span>
            <span>Tempo: {song.tempo} BPM</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <Slider
          value={[currentTime]}
          max={song.duration}
          step={1}
          onValueChange={(value) => onSeek(value[0])}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(song.duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Shuffle className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button onClick={onPlayPause} size="sm" className="h-10 w-10 rounded-full">
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="sm">
            <SkipForward className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Repeat className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Volume2 className="h-4 w-4 text-gray-500" />
          <Slider value={volume} max={100} step={1} onValueChange={setVolume} className="w-20" />
        </div>
      </div>

      {/* Spotify Connection Status */}
      <div className="flex items-center justify-center gap-2 text-sm text-gray-500 bg-green-50 p-2 rounded-lg">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        Connected to Spotify Premium
      </div>
    </div>
  )
}
