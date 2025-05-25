"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Wifi, WifiOff, Radio, Users, Settings, AlertTriangle, CheckCircle, Clock } from "lucide-react"

interface AudioSyncManagerProps {
  projectId: string
  isHost: boolean
  onSyncStateChange: (state: SyncState) => void
}

interface SyncState {
  isConnected: boolean
  latency: number
  jitter: number
  packetLoss: number
  quality: "excellent" | "good" | "fair" | "poor"
  activeListeners: number
  syncDrift: number
}

interface SyncEvent {
  id: string
  type: "connect" | "disconnect" | "sync" | "error"
  user: string
  timestamp: string
  details: string
}

export function AudioSyncManager({ projectId, isHost, onSyncStateChange }: AudioSyncManagerProps) {
  const [syncState, setSyncState] = useState<SyncState>({
    isConnected: true,
    latency: 45,
    jitter: 2,
    packetLoss: 0,
    quality: "excellent",
    activeListeners: 3,
    syncDrift: 0.1,
  })

  const [syncEvents, setSyncEvents] = useState<SyncEvent[]>([
    {
      id: "1",
      type: "connect",
      user: "Sarah Mitchell",
      timestamp: "2 minutes ago",
      details: "Joined audio sync session",
    },
    {
      id: "2",
      type: "sync",
      user: "System",
      timestamp: "1 minute ago",
      details: "Auto-corrected 0.3s drift for 2 users",
    },
  ])

  const [showAdvanced, setShowAdvanced] = useState(false)
  const syncIntervalRef = useRef<NodeJS.Timeout>()

  // Simulate real-time sync monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate network conditions
      const newLatency = 40 + Math.random() * 20
      const newJitter = Math.random() * 5
      const newPacketLoss = Math.random() * 2
      const newDrift = (Math.random() - 0.5) * 0.5

      let quality: "excellent" | "good" | "fair" | "poor" = "excellent"
      if (newLatency > 100 || newJitter > 10 || newPacketLoss > 1) {
        quality = "poor"
      } else if (newLatency > 75 || newJitter > 5 || newPacketLoss > 0.5) {
        quality = "fair"
      } else if (newLatency > 50 || newJitter > 3) {
        quality = "good"
      }

      const newState = {
        ...syncState,
        latency: Math.round(newLatency),
        jitter: Math.round(newJitter * 10) / 10,
        packetLoss: Math.round(newPacketLoss * 10) / 10,
        quality,
        syncDrift: Math.round(newDrift * 100) / 100,
      }

      setSyncState(newState)
      onSyncStateChange(newState)

      // Add sync events occasionally
      if (Math.random() < 0.1) {
        const eventTypes = ["sync", "connect", "disconnect"]
        const randomType = eventTypes[Math.floor(Math.random() * eventTypes.length)] as
          | "sync"
          | "connect"
          | "disconnect"

        const newEvent: SyncEvent = {
          id: Date.now().toString(),
          type: randomType,
          user: randomType === "sync" ? "System" : "User " + Math.floor(Math.random() * 5),
          timestamp: "now",
          details: getEventDetails(randomType),
        }

        setSyncEvents((prev) => [newEvent, ...prev.slice(0, 9)])
      }
    }, 2000)

    syncIntervalRef.current = interval

    return () => {
      if (syncIntervalRef.current) {
        clearInterval(syncIntervalRef.current)
      }
    }
  }, [syncState, onSyncStateChange])

  const getEventDetails = (type: string) => {
    switch (type) {
      case "sync":
        return `Auto-corrected ${(Math.random() * 0.5).toFixed(1)}s drift`
      case "connect":
        return "Joined audio sync session"
      case "disconnect":
        return "Left audio sync session"
      default:
        return "Unknown event"
    }
  }

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case "excellent":
        return "text-green-600"
      case "good":
        return "text-blue-600"
      case "fair":
        return "text-yellow-600"
      case "poor":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getQualityIcon = (quality: string) => {
    switch (quality) {
      case "excellent":
      case "good":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "fair":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "poor":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <CheckCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case "connect":
        return <Users className="h-3 w-3 text-green-600" />
      case "disconnect":
        return <Users className="h-3 w-3 text-red-600" />
      case "sync":
        return <Radio className="h-3 w-3 text-blue-600" />
      case "error":
        return <AlertTriangle className="h-3 w-3 text-red-600" />
      default:
        return <Radio className="h-3 w-3 text-gray-600" />
    }
  }

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold flex items-center gap-2">
          {syncState.isConnected ? (
            <Wifi className="h-4 w-4 text-green-600" />
          ) : (
            <WifiOff className="h-4 w-4 text-red-600" />
          )}
          Audio Sync Status
        </h3>
        <Button variant="ghost" size="sm" onClick={() => setShowAdvanced(!showAdvanced)}>
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      {/* Connection Status */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm">Connection Quality</span>
          <div className="flex items-center gap-2">
            {getQualityIcon(syncState.quality)}
            <span className={`text-sm font-medium ${getQualityColor(syncState.quality)}`}>
              {syncState.quality.charAt(0).toUpperCase() + syncState.quality.slice(1)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm">Active Listeners</span>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Radio className="h-3 w-3" />
            {syncState.activeListeners}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm">Sync Drift</span>
          <span className={`text-sm ${Math.abs(syncState.syncDrift) > 0.3 ? "text-red-600" : "text-green-600"}`}>
            {syncState.syncDrift > 0 ? "+" : ""}
            {syncState.syncDrift}s
          </span>
        </div>
      </div>

      {/* Advanced Metrics */}
      {showAdvanced && (
        <div className="space-y-3 mb-4 p-3 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium">Network Metrics</h4>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs">Latency</span>
              <span className="text-xs">{syncState.latency}ms</span>
            </div>
            <Progress value={100 - syncState.latency} className="h-1" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs">Jitter</span>
              <span className="text-xs">{syncState.jitter}ms</span>
            </div>
            <Progress value={(20 - syncState.jitter) * 5} className="h-1" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs">Packet Loss</span>
              <span className="text-xs">{syncState.packetLoss}%</span>
            </div>
            <Progress value={(5 - syncState.packetLoss) * 20} className="h-1" />
          </div>
        </div>
      )}

      {/* Recent Events */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Recent Events</h4>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {syncEvents.map((event) => (
            <div key={event.id} className="flex items-start gap-2 p-2 bg-gray-50 rounded text-xs">
              {getEventIcon(event.type)}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{event.user}</span>
                  <span className="text-gray-500">{event.timestamp}</span>
                </div>
                <p className="text-gray-600">{event.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Host Controls */}
      {isHost && (
        <div className="mt-4 pt-4 border-t">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              Force Resync
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              Optimize Quality
            </Button>
          </div>
        </div>
      )}
    </Card>
  )
}
