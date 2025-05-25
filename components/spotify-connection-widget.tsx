"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Music,
  WifiOff,
  Settings,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Volume2,
  Headphones,
  Radio,
} from "lucide-react"

interface SpotifyConnectionWidgetProps {
  isConnected: boolean
  isPremium: boolean
  currentTrack?: {
    name: string
    artist: string
    progress: number
    duration: number
  }
  onConnect: () => void
  onDisconnect: () => void
}

export function SpotifyConnectionWidget({
  isConnected,
  isPremium,
  currentTrack,
  onConnect,
  onDisconnect,
}: SpotifyConnectionWidgetProps) {
  const [isReconnecting, setIsReconnecting] = useState(false)
  const [audioQuality, setAudioQuality] = useState("High")

  const handleReconnect = async () => {
    setIsReconnecting(true)
    // Simulate reconnection
    setTimeout(() => {
      setIsReconnecting(false)
    }, 2000)
  }

  const getConnectionStatus = () => {
    if (!isConnected) return { text: "Disconnected", color: "text-red-600", icon: WifiOff }
    if (!isPremium) return { text: "Free Account", color: "text-yellow-600", icon: AlertTriangle }
    return { text: "Premium Connected", color: "text-green-600", icon: CheckCircle }
  }

  const status = getConnectionStatus()
  const StatusIcon = status.icon

  if (!isConnected) {
    return (
      <Card className="p-4 bg-red-50 border-red-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <Music className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h4 className="font-semibold text-red-900">Spotify Not Connected</h4>
              <p className="text-sm text-red-700">Connect to access your music library</p>
            </div>
          </div>
          <Button onClick={onConnect} className="bg-green-600 hover:bg-green-700">
            <ExternalLink className="h-4 w-4 mr-2" />
            Connect Spotify
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-4 bg-green-50 border-green-200">
      <div className="flex items-center justify-between">
        {/* Connection Status */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Music className="h-5 w-5 text-green-600" />
            </div>
            {isConnected && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <StatusIcon className="h-2.5 w-2.5 text-white" />
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-green-900">Spotify</h4>
              <Badge className="bg-green-100 text-green-700 text-xs">{isPremium ? "Premium" : "Free"}</Badge>
              {audioQuality && (
                <Badge variant="outline" className="text-xs">
                  {audioQuality} Quality
                </Badge>
              )}
            </div>

            {currentTrack ? (
              <div className="mt-1">
                <p className="text-sm text-green-800 font-medium truncate max-w-48">
                  {currentTrack.name} - {currentTrack.artist}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Progress value={(currentTrack.progress / currentTrack.duration) * 100} className="h-1 flex-1" />
                  <span className="text-xs text-green-600">
                    {Math.floor(currentTrack.progress / 60)}:{(currentTrack.progress % 60).toString().padStart(2, "0")}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-green-700">Ready to play music</p>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Audio Output Indicator */}
          <div className="hidden md:flex items-center gap-1 text-xs text-green-600">
            <Headphones className="h-3 w-3" />
            <span>Audio Ready</span>
          </div>

          {/* Settings Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-green-700 hover:text-green-800">
                <Settings className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <Volume2 className="mr-2 h-4 w-4" />
                Audio Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Radio className="mr-2 h-4 w-4" />
                Playback Device
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleReconnect} disabled={isReconnecting}>
                <RefreshCw className={`mr-2 h-4 w-4 ${isReconnecting ? "animate-spin" : ""}`} />
                {isReconnecting ? "Reconnecting..." : "Refresh Connection"}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ExternalLink className="mr-2 h-4 w-4" />
                Open Spotify
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onDisconnect} className="text-red-600">
                <WifiOff className="mr-2 h-4 w-4" />
                Disconnect
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Premium Upgrade Prompt for Free Users */}
      {isConnected && !isPremium && (
        <div className="mt-3 pt-3 border-t border-green-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <span className="text-sm text-yellow-700">Limited playback with free account</span>
            </div>
            <Button variant="outline" size="sm" className="text-xs">
              Upgrade to Premium
            </Button>
          </div>
        </div>
      )}
    </Card>
  )
}
