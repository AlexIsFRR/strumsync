"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Repeat,
  Shuffle,
  Users,
  Wifi,
  WifiOff,
  Crown,
  Radio,
  Headphones,
} from "lucide-react"

interface Song {
  title: string
  artist: string
  duration: number
  key: string
  tempo: number
}

interface Collaborator {
  id: string
  name: string
  username: string
  avatar: string
  isOnline: boolean
  isListening: boolean
  role: "owner" | "editor" | "viewer"
}

interface SyncAudioPlayerProps {
  song: Song
  collaborators: Collaborator[]
  isHost: boolean
  projectId: string
}

interface SyncState {
  isPlaying: boolean
  currentTime: number
  volume: number
  isConnected: boolean
  hostId: string
  listeners: string[]
  lastSync: number
}

export function SyncAudioPlayer({ song, collaborators, isHost, projectId }: SyncAudioPlayerProps) {
  const [syncState, setSyncState] = useState<SyncState>({
    isPlaying: false,
    currentTime: 0,
    volume: 75,
    isConnected: true,
    hostId: isHost ? "current-user" : "host-user",
    listeners: ["current-user"],
    lastSync: Date.now(),
  })

  const [localVolume, setLocalVolume] = useState([75])
  const [isBuffering, setIsBuffering] = useState(false)
  const [syncOffset, setSyncOffset] = useState(0)
  const [showSyncPanel, setShowSyncPanel] = useState(false)
  const [audioLatency, setAudioLatency] = useState(45) // ms

  const audioRef = useRef<HTMLAudioElement>(null)
  const syncIntervalRef = useRef<NodeJS.Timeout>()
  const lastSyncTimeRef = useRef(Date.now())

  // Simulate WebSocket connection for real-time sync
  useEffect(() => {
    // Initialize sync connection
    const connectToSyncServer = () => {
      console.log(`Connecting to sync server for project: ${projectId}`)
      setSyncState((prev) => ({ ...prev, isConnected: true }))
    }

    connectToSyncServer()

    // Simulate receiving sync updates from other users
    const syncInterval = setInterval(() => {
      if (!isHost) {
        // Simulate receiving sync data from host
        simulateReceiveSyncUpdate()
      }
    }, 1000)

    syncIntervalRef.current = syncInterval

    return () => {
      if (syncIntervalRef.current) {
        clearInterval(syncIntervalRef.current)
      }
    }
  }, [projectId, isHost])

  // Sync time updates
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (syncState.isPlaying && syncState.isConnected) {
      interval = setInterval(() => {
        setSyncState((prev) => {
          const newTime = prev.currentTime + 1
          if (newTime >= song.duration) {
            return { ...prev, currentTime: 0, isPlaying: false }
          }
          return { ...prev, currentTime: newTime }
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [syncState.isPlaying, syncState.isConnected, song.duration])

  const simulateReceiveSyncUpdate = () => {
    // Simulate receiving sync data from host
    const randomOffset = Math.random() * 2 - 1 // -1 to 1 second
    setSyncOffset(randomOffset)
    lastSyncTimeRef.current = Date.now()
  }

  const broadcastSyncUpdate = (newState: Partial<SyncState>) => {
    if (isHost) {
      console.log("Broadcasting sync update:", newState)
      // In real implementation, this would send to WebSocket server
      setSyncState((prev) => ({ ...prev, ...newState, lastSync: Date.now() }))
    }
  }

  const handlePlayPause = () => {
    const newIsPlaying = !syncState.isPlaying
    setIsBuffering(true)

    setTimeout(() => {
      setIsBuffering(false)
      if (isHost) {
        broadcastSyncUpdate({ isPlaying: newIsPlaying })
      }
    }, 200)
  }

  const handleSeek = (time: number) => {
    if (isHost) {
      broadcastSyncUpdate({
        currentTime: time,
        isPlaying: false, // Pause during seek
      })
    }
  }

  const handleVolumeChange = (volume: number[]) => {
    setLocalVolume(volume)
    // Volume is local, not synced
  }

  const requestHostControl = () => {
    console.log("Requesting host control...")
    // In real implementation, this would send a request to current host
  }

  const grantHostControl = (userId: string) => {
    console.log(`Granting host control to: ${userId}`)
    // In real implementation, this would transfer host privileges
  }

  const joinListening = () => {
    setSyncState((prev) => ({
      ...prev,
      listeners: [...prev.listeners.filter((id) => id !== "current-user"), "current-user"],
    }))
  }

  const leaveListening = () => {
    setSyncState((prev) => ({
      ...prev,
      listeners: prev.listeners.filter((id) => id !== "current-user"),
    }))
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getSyncStatus = () => {
    if (!syncState.isConnected) return "Disconnected"
    if (isBuffering) return "Buffering..."
    if (Math.abs(syncOffset) > 0.5) return `Sync offset: ${syncOffset.toFixed(1)}s`
    return "In sync"
  }

  const getSyncStatusColor = () => {
    if (!syncState.isConnected) return "text-red-600"
    if (isBuffering) return "text-yellow-600"
    if (Math.abs(syncOffset) > 0.5) return "text-orange-600"
    return "text-green-600"
  }

  const listeningCollaborators = collaborators.filter((c) => syncState.listeners.includes(c.id) && c.isOnline)

  return (
    <div className="space-y-4">
      {/* Sync Status Bar */}
      <Card className="p-3 bg-blue-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {syncState.isConnected ? (
                <Wifi className="h-4 w-4 text-green-600" />
              ) : (
                <WifiOff className="h-4 w-4 text-red-600" />
              )}
              <span className={`text-sm font-medium ${getSyncStatusColor()}`}>{getSyncStatus()}</span>
            </div>

            <div className="flex items-center gap-2">
              <Radio className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-blue-700">{listeningCollaborators.length} listening</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isHost ? (
              <Badge className="bg-yellow-100 text-yellow-700">
                <Crown className="h-3 w-3 mr-1" />
                Host
              </Badge>
            ) : (
              <Button variant="outline" size="sm" onClick={requestHostControl}>
                Request Control
              </Button>
            )}

            <Button variant="outline" size="sm" onClick={() => setShowSyncPanel(!showSyncPanel)}>
              <Users className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Sync Panel */}
      {showSyncPanel && (
        <Card className="p-4">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Headphones className="h-4 w-4" />
            Listening Session ({listeningCollaborators.length})
          </h4>

          <div className="space-y-3 mb-4">
            {collaborators.map((collaborator) => {
              const isListening = syncState.listeners.includes(collaborator.id)
              const isCurrentHost = syncState.hostId === collaborator.id

              return (
                <div key={collaborator.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={collaborator.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-xs">
                          {collaborator.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {collaborator.isOnline && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{collaborator.name}</span>
                        {isCurrentHost && <Crown className="h-3 w-3 text-yellow-600" />}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{collaborator.isOnline ? "Online" : "Offline"}</span>
                        {isListening && collaborator.isOnline && (
                          <Badge variant="secondary" className="text-xs">
                            <Radio className="h-2 w-2 mr-1" />
                            Listening
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {isHost && collaborator.id !== "current-user" && collaborator.isOnline && (
                    <Button variant="outline" size="sm" onClick={() => grantHostControl(collaborator.id)}>
                      Make Host
                    </Button>
                  )}
                </div>
              )
            })}
          </div>

          <div className="flex gap-2">
            {syncState.listeners.includes("current-user") ? (
              <Button variant="outline" onClick={leaveListening} className="flex-1">
                Leave Session
              </Button>
            ) : (
              <Button onClick={joinListening} className="flex-1">
                Join Session
              </Button>
            )}

            <Button variant="outline" onClick={() => setSyncOffset(0)}>
              Resync
            </Button>
          </div>

          {/* Sync Settings */}
          <div className="mt-4 pt-4 border-t space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Audio Latency</span>
              <span className="text-sm text-gray-500">{audioLatency}ms</span>
            </div>
            <Slider
              value={[audioLatency]}
              max={200}
              step={5}
              onValueChange={(value) => setAudioLatency(value[0])}
              className="w-full"
            />

            <div className="flex items-center justify-between">
              <span className="text-sm">Sync Tolerance</span>
              <span className="text-sm text-gray-500">±0.5s</span>
            </div>
          </div>
        </Card>
      )}

      {/* Main Audio Player */}
      <Card className="p-6">
        {/* Song Info */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg flex items-center justify-center relative">
            <span className="text-white font-bold text-lg">{song.title[0]}</span>
            {syncState.isPlaying && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{song.title}</h3>
            <p className="text-gray-600">{song.artist}</p>
            <div className="flex gap-4 text-sm text-gray-500 mt-1">
              <span>Key: {song.key}</span>
              <span>Tempo: {song.tempo} BPM</span>
            </div>
          </div>

          {/* Listening Avatars */}
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {listeningCollaborators.slice(0, 4).map((collaborator) => (
                <Avatar key={collaborator.id} className="h-8 w-8 border-2 border-white">
                  <AvatarImage src={collaborator.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-xs">
                    {collaborator.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              ))}
              {listeningCollaborators.length > 4 && (
                <div className="h-8 w-8 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-xs text-gray-600">+{listeningCollaborators.length - 4}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2 mb-4">
          <Slider
            value={[syncState.currentTime]}
            max={song.duration}
            step={1}
            onValueChange={(value) => handleSeek(value[0])}
            className="w-full"
            disabled={!isHost}
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>{formatTime(syncState.currentTime)}</span>
            <span>{formatTime(song.duration)}</span>
          </div>
          {!isHost && <p className="text-xs text-gray-500 text-center">Only the host can control playback position</p>}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" disabled={!isHost}>
              <Shuffle className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" disabled={!isHost}>
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button
              onClick={handlePlayPause}
              size="sm"
              className="h-10 w-10 rounded-full"
              disabled={!isHost || isBuffering}
            >
              {isBuffering ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : syncState.isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>
            <Button variant="ghost" size="sm" disabled={!isHost}>
              <SkipForward className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" disabled={!isHost}>
              <Repeat className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Volume2 className="h-4 w-4 text-gray-500" />
            <Slider value={localVolume} max={100} step={1} onValueChange={handleVolumeChange} className="w-20" />
          </div>
        </div>

        {/* Sync Info */}
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Sync Server: {syncState.isConnected ? "Connected" : "Disconnected"}</span>
              <span className="text-gray-600">Latency: {audioLatency}ms</span>
            </div>
            <span className="text-gray-600">
              Last sync: {Math.floor((Date.now() - syncState.lastSync) / 1000)}s ago
            </span>
          </div>
        </div>
      </Card>

      {/* Hidden audio element for actual playback */}
      <audio
        ref={audioRef}
        src="/placeholder-audio.mp3"
        onTimeUpdate={() => {
          if (audioRef.current) {
            const actualTime = audioRef.current.currentTime
            const expectedTime = syncState.currentTime
            const drift = Math.abs(actualTime - expectedTime)

            if (drift > 0.5) {
              // Auto-correct significant drift
              audioRef.current.currentTime = expectedTime
            }
          }
        }}
      />
    </div>
  )
}
