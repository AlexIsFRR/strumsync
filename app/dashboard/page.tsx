"use client"

import { useState, useEffect } from "react"
import { AudioPlayer } from "@/components/audio-player"
import { TabDisplay } from "@/components/tab-display"
import { InstrumentSelector } from "@/components/instrument-selector"
import { TuningConfig } from "@/components/tuning-config"
import { AiAssistant } from "@/components/ai-assistant"
import { UserPreferences } from "@/components/user-preferences"
import { ExportModal } from "@/components/export-modal"
import { ExploreSection } from "@/components/explore-section"
import { DashboardHeader } from "@/components/dashboard-header"
import { TabActionsToolbar } from "@/components/tab-actions-toolbar"
import { SpotifyConnectionWidget } from "@/components/spotify-connection-widget"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Dashboard() {
  const [currentSong, setCurrentSong] = useState({
    title: "Wonderwall",
    artist: "Oasis",
    duration: 258,
    key: "F#m",
    tempo: 87,
  })

  const [selectedInstrument, setSelectedInstrument] = useState("guitar")
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [showExportModal, setShowExportModal] = useState(false)
  const [tuningSettings, setTuningSettings] = useState({
    tuning: "standard",
    capo: 0,
  })

  const [spotifyConnection, setSpotifyConnection] = useState({
    isConnected: true,
    isPremium: true,
    currentTrack: {
      name: "Wonderwall",
      artist: "Oasis",
      progress: 45,
      duration: 258,
    },
  })

  // Simulate playback progress
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= currentSong.duration) {
            setIsPlaying(false)
            return 0
          }
          return prev + 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, currentSong.duration])

  const handleSpotifyConnect = () => {
    setSpotifyConnection((prev) => ({ ...prev, isConnected: true }))
  }

  const handleSpotifyDisconnect = () => {
    setSpotifyConnection((prev) => ({ ...prev, isConnected: false }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Streamlined Header */}
      <DashboardHeader />

      <div className="container mx-auto p-6 space-y-6">
        {/* Spotify Connection Status */}
        <SpotifyConnectionWidget
          isConnected={spotifyConnection.isConnected}
          isPremium={spotifyConnection.isPremium}
          currentTrack={spotifyConnection.currentTrack}
          onConnect={handleSpotifyConnect}
          onDisconnect={handleSpotifyDisconnect}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Audio Player */}
            <Card className="p-6">
              <AudioPlayer
                song={currentSong}
                isPlaying={isPlaying}
                currentTime={currentTime}
                onPlayPause={() => setIsPlaying(!isPlaying)}
                onSeek={setCurrentTime}
              />
            </Card>

            {/* Tab Display */}
            <Card className="p-6">
              <TabDisplay
                instrument={selectedInstrument}
                currentTime={currentTime}
                isPlaying={isPlaying}
                tuningSettings={tuningSettings}
                songKey={currentSong.key}
              />
            </Card>

            {/* Tab Actions Toolbar - Moved below tab content */}
            <TabActionsToolbar
              song={currentSong}
              instrument={selectedInstrument}
              tuningSettings={tuningSettings}
              onExport={() => setShowExportModal(true)}
              onShare={() => console.log("Share clicked")}
            />

            {/* Explore Section */}
            <Card className="p-6">
              <ExploreSection onSongSelect={setCurrentSong} />
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Instrument & Settings */}
            <Card className="p-4">
              <Tabs defaultValue="instrument" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="instrument">Instrument</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="instrument" className="mt-4">
                  <InstrumentSelector selected={selectedInstrument} onSelect={setSelectedInstrument} />
                </TabsContent>

                <TabsContent value="settings" className="mt-4">
                  <TuningConfig
                    instrument={selectedInstrument}
                    settings={tuningSettings}
                    onSettingsChange={setTuningSettings}
                  />
                </TabsContent>
              </Tabs>
            </Card>

            {/* AI Assistant */}
            <Card className="p-4">
              <AiAssistant songKey={currentSong.key} instrument={selectedInstrument} onSuggestion={setTuningSettings} />
            </Card>

            {/* User Preferences */}
            <Card className="p-4">
              <UserPreferences currentSong={currentSong} />
            </Card>
          </div>
        </div>

        {/* Export Modal */}
        <ExportModal
          isOpen={showExportModal}
          onClose={() => setShowExportModal(false)}
          song={currentSong}
          instrument={selectedInstrument}
          tuningSettings={tuningSettings}
        />
      </div>
    </div>
  )
}
