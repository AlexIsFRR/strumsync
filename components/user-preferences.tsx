"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Star, Trash2, Users, MessageCircle } from "lucide-react"

interface Song {
  title: string
  artist: string
  duration: number
  key: string
  tempo: number
}

interface UserPreferencesProps {
  currentSong: Song
}

export function UserPreferences({ currentSong }: UserPreferencesProps) {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      title: "Wonderwall",
      artist: "Oasis",
      instrument: "guitar",
      lastPlayed: "2 hours ago",
      sharedBy: "sarah_guitar",
    },
    {
      id: 2,
      title: "Hotel California",
      artist: "Eagles",
      instrument: "guitar",
      lastPlayed: "1 day ago",
      sharedBy: "mike_guitar",
    },
    {
      id: 3,
      title: "Let It Be",
      artist: "The Beatles",
      instrument: "piano",
      lastPlayed: "3 days ago",
      sharedBy: "piano_emma",
    },
  ])

  const [following] = useState([
    {
      id: 1,
      name: "Sarah Mitchell",
      username: "sarah_guitar",
      avatar: "/placeholder.svg?height=32&width=32",
      isOnline: true,
    },
    {
      id: 2,
      name: "Mike Rodriguez",
      username: "bass_master_mike",
      avatar: "/placeholder.svg?height=32&width=32",
      isOnline: false,
    },
    { id: 3, name: "Emma Chen", username: "piano_emma", avatar: "/placeholder.svg?height=32&width=32", isOnline: true },
  ])

  const [isFavorited, setIsFavorited] = useState(false)

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited)
    if (!isFavorited) {
      // Add to favorites logic
    }
  }

  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter((fav) => fav.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-sm text-gray-700">Your Music</h4>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFavorite}
            className={isFavorited ? "text-red-600" : "text-gray-400"}
          >
            <Heart className={`h-4 w-4 ${isFavorited ? "fill-current" : ""}`} />
          </Button>
          <Button variant="ghost" size="sm">
            <MessageCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Current Song */}
      <Card className="p-3 bg-blue-50">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-blue-700 font-medium">Now Playing</span>
        </div>
        <div className="text-sm">
          <div className="font-medium">{currentSong.title}</div>
          <div className="text-gray-600 text-xs">{currentSong.artist}</div>
        </div>
      </Card>

      {/* Following */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-blue-500" />
          <span className="text-xs text-gray-600">Following ({following.length})</span>
        </div>

        <div className="space-y-2 max-h-32 overflow-y-auto">
          {following.map((user) => (
            <div key={user.id} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded">
              <div className="relative">
                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-purple-600">{user.name[0]}</span>
                </div>
                {user.isOnline && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium truncate">{user.name}</div>
                <div className="text-xs text-gray-500 truncate">@{user.username}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Favorites */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Heart className="h-4 w-4 text-red-500" />
          <span className="text-xs text-gray-600">Favorites</span>
        </div>

        <div className="space-y-2 max-h-40 overflow-y-auto">
          {favorites.map((song) => (
            <Card key={song.id} className="p-2 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium truncate">{song.title}</div>
                  <div className="text-xs text-gray-500 truncate">{song.artist}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {song.instrument}
                    </Badge>
                    <span className="text-xs text-gray-400">{song.lastPlayed}</span>
                  </div>
                  {song.sharedBy && <div className="text-xs text-blue-600 mt-1">Shared by @{song.sharedBy}</div>}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFavorite(song.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <Card className="p-3 bg-green-50">
        <div className="flex items-center gap-2 mb-2">
          <Star className="h-4 w-4 text-green-600" />
          <span className="text-xs text-green-700 font-medium">Community Stats</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <div className="font-medium">89</div>
            <div className="text-gray-600">Followers</div>
          </div>
          <div>
            <div className="font-medium">34</div>
            <div className="text-gray-600">Following</div>
          </div>
          <div>
            <div className="font-medium">12</div>
            <div className="text-gray-600">Tabs shared</div>
          </div>
          <div>
            <div className="font-medium">156</div>
            <div className="text-gray-600">Likes given</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
