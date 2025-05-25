"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Play, Heart, TrendingUp, Clock, Star } from "lucide-react"

interface Song {
  id: number
  title: string
  artist: string
  duration: number
  key: string
  tempo: number
  difficulty: string
  plays: string
  isLiked?: boolean
}

interface ExploreSectionProps {
  onSongSelect: (song: Song) => void
}

const initialTrendingSongs = [
  {
    id: 1,
    title: "Bohemian Rhapsody",
    artist: "Queen",
    duration: 355,
    key: "Bb",
    tempo: 72,
    difficulty: "Advanced",
    plays: "2.1M",
    isLiked: false,
  },
  {
    id: 2,
    title: "Hotel California",
    artist: "Eagles",
    duration: 391,
    key: "Bm",
    tempo: 75,
    difficulty: "Intermediate",
    plays: "1.8M",
    isLiked: false,
  },
  {
    id: 3,
    title: "Stairway to Heaven",
    artist: "Led Zeppelin",
    duration: 482,
    key: "Am",
    tempo: 82,
    difficulty: "Advanced",
    plays: "1.5M",
    isLiked: false,
  },
  {
    id: 4,
    title: "Sweet Child O' Mine",
    artist: "Guns N' Roses",
    duration: 356,
    key: "Db",
    tempo: 125,
    difficulty: "Advanced",
    plays: "1.3M",
    isLiked: false,
  },
]

const initialRecentSongs = [
  {
    id: 5,
    title: "Wonderwall",
    artist: "Oasis",
    duration: 258,
    key: "F#m",
    tempo: 87,
    difficulty: "Beginner",
    plays: "892K",
    isLiked: true,
  },
  {
    id: 6,
    title: "Let It Be",
    artist: "The Beatles",
    duration: 243,
    key: "C",
    tempo: 76,
    difficulty: "Beginner",
    plays: "756K",
    isLiked: false,
  },
  {
    id: 7,
    title: "Blackbird",
    artist: "The Beatles",
    duration: 136,
    key: "G",
    tempo: 96,
    difficulty: "Intermediate",
    plays: "634K",
    isLiked: false,
  },
  {
    id: 8,
    title: "Tears in Heaven",
    artist: "Eric Clapton",
    duration: 282,
    key: "A",
    tempo: 80,
    difficulty: "Intermediate",
    plays: "521K",
    isLiked: false,
  },
]

const popularGenres = [
  { name: "Rock", count: "12.5K songs", color: "bg-red-100 text-red-700" },
  { name: "Pop", count: "8.3K songs", color: "bg-blue-100 text-blue-700" },
  { name: "Folk", count: "5.1K songs", color: "bg-green-100 text-green-700" },
  { name: "Blues", count: "3.8K songs", color: "bg-purple-100 text-purple-700" },
  { name: "Country", count: "2.9K songs", color: "bg-yellow-100 text-yellow-700" },
  { name: "Jazz", count: "2.1K songs", color: "bg-orange-100 text-orange-700" },
]

export function ExploreSection({ onSongSelect }: ExploreSectionProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [trendingSongs, setTrendingSongs] = useState(initialTrendingSongs)
  const [recentSongs, setRecentSongs] = useState(initialRecentSongs)
  const [favorites, setFavorites] = useState<Song[]>([])

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("tabsync-favorites")
    if (savedFavorites) {
      const parsedFavorites = JSON.parse(savedFavorites)
      setFavorites(parsedFavorites)

      // Update song like status based on favorites
      setTrendingSongs((prev) =>
        prev.map((song) => ({
          ...song,
          isLiked: parsedFavorites.some((fav: Song) => fav.id === song.id),
        })),
      )
      setRecentSongs((prev) =>
        prev.map((song) => ({
          ...song,
          isLiked: parsedFavorites.some((fav: Song) => fav.id === song.id),
        })),
      )
    }
  }, [])

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem("tabsync-favorites", JSON.stringify(favorites))
  }, [favorites])

  const toggleLike = (song: Song, songList: Song[], setSongList: React.Dispatch<React.SetStateAction<Song[]>>) => {
    const updatedSongs = songList.map((s) => (s.id === song.id ? { ...s, isLiked: !s.isLiked } : s))
    setSongList(updatedSongs)

    const updatedSong = { ...song, isLiked: !song.isLiked }

    if (updatedSong.isLiked) {
      // Add to favorites
      setFavorites((prev) => {
        const exists = prev.some((fav) => fav.id === song.id)
        if (!exists) {
          return [...prev, updatedSong]
        }
        return prev
      })
    } else {
      // Remove from favorites
      setFavorites((prev) => prev.filter((fav) => fav.id !== song.id))
    }
  }

  const removeFavorite = (songId: number) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== songId))

    // Update like status in other lists
    setTrendingSongs((prev) => prev.map((song) => (song.id === songId ? { ...song, isLiked: false } : song)))
    setRecentSongs((prev) => prev.map((song) => (song.id === songId ? { ...song, isLiked: false } : song)))
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-700"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-700"
      case "Advanced":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const SongCard = ({
    song,
    onLike,
  }: {
    song: Song
    onLike: () => void
  }) => (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">{song.title[0]}</span>
          </div>
          <div>
            <h4 className="font-semibold">{song.title}</h4>
            <p className="text-gray-600 text-sm">{song.artist}</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs">
                {song.key}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {song.tempo} BPM
              </Badge>
              <Badge className={`text-xs ${getDifficultyColor(song.difficulty)}`}>{song.difficulty}</Badge>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right text-sm text-gray-500">
            <div>{formatDuration(song.duration)}</div>
            <div className="flex items-center gap-1">
              <Play className="h-3 w-3" />
              {song.plays}
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onSongSelect(song)}>
            <Play className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onLike}
            className={song.isLiked ? "text-red-600 hover:text-red-700" : "text-gray-400 hover:text-red-600"}
          >
            <Heart className={`h-4 w-4 ${song.isLiked ? "fill-current" : ""}`} />
          </Button>
        </div>
      </div>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Explore Music</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search songs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="trending" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="genres">Genres</TabsTrigger>
          <TabsTrigger value="favorites">
            Favorites
            {favorites.length > 0 && (
              <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 text-xs">
                {favorites.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trending" className="mt-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              <h3 className="font-semibold text-lg">Trending This Week</h3>
            </div>

            <div className="grid gap-4">
              {trendingSongs.map((song) => (
                <SongCard key={song.id} song={song} onLike={() => toggleLike(song, trendingSongs, setTrendingSongs)} />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="recent" className="mt-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-lg">Recently Added</h3>
            </div>

            <div className="grid gap-4">
              {recentSongs.map((song) => (
                <SongCard key={song.id} song={song} onLike={() => toggleLike(song, recentSongs, setRecentSongs)} />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="genres" className="mt-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Browse by Genre</h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {popularGenres.map((genre, index) => (
                <Card key={index} className="p-6 hover:shadow-md transition-shadow cursor-pointer text-center">
                  <h4 className="font-semibold text-lg mb-2">{genre.name}</h4>
                  <Badge className={`${genre.color} text-sm`}>{genre.count}</Badge>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="favorites" className="mt-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-5 w-5 text-yellow-600" />
              <h3 className="font-semibold text-lg">Your Favorites</h3>
            </div>

            {favorites.length > 0 ? (
              <div className="grid gap-4">
                {favorites.map((song) => (
                  <Card key={song.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold">{song.title[0]}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold">{song.title}</h4>
                          <p className="text-gray-600 text-sm">{song.artist}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {song.key}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {song.tempo} BPM
                            </Badge>
                            <Badge className={`text-xs ${getDifficultyColor(song.difficulty)}`}>
                              {song.difficulty}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right text-sm text-gray-500">
                          <div>{formatDuration(song.duration)}</div>
                          <div className="flex items-center gap-1">
                            <Play className="h-3 w-3" />
                            {song.plays}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => onSongSelect(song)}>
                          <Play className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFavorite(song.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Heart className="h-4 w-4 fill-current" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Heart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No favorites yet. Start exploring and heart songs you love!</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
