"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { UserCard } from "@/components/user-card"
import { TabPost } from "@/components/tab-post"
import { CommunityStats } from "@/components/community-stats"
import { Search, Users, TrendingUp, Music, Heart, MessageCircle, Share2, Filter, Plus, Star, Clock } from "lucide-react"

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("feed")
  const [searchQuery, setSearchQuery] = useState("")

  const [feedPosts] = useState([
    {
      id: 1,
      user: {
        id: 1,
        name: "Sarah Mitchell",
        username: "sarah_guitar",
        avatar: "/placeholder.svg?height=40&width=40",
        isFollowing: true,
        verified: true,
      },
      song: {
        title: "Wonderwall",
        artist: "Oasis",
        key: "F#m",
        difficulty: "Beginner",
      },
      content: "Just nailed this classic! The capo on 2nd fret makes it so much easier. Perfect for beginners! 🎸",
      timestamp: "2 hours ago",
      likes: 24,
      comments: 8,
      shares: 3,
      isLiked: false,
      tags: ["beginner", "acoustic", "oasis"],
    },
    {
      id: 2,
      user: {
        id: 2,
        name: "Mike Rodriguez",
        username: "bass_master_mike",
        avatar: "/placeholder.svg?height=40&width=40",
        isFollowing: false,
        verified: false,
      },
      song: {
        title: "Come As You Are",
        artist: "Nirvana",
        key: "Em",
        difficulty: "Intermediate",
      },
      content:
        "Love this bass line! Here's my take on the main riff with some variations. The timing is everything! 🎵",
      timestamp: "4 hours ago",
      likes: 18,
      comments: 5,
      shares: 7,
      isLiked: true,
      tags: ["bass", "grunge", "nirvana"],
    },
    {
      id: 3,
      user: {
        id: 3,
        name: "Emma Chen",
        username: "piano_emma",
        avatar: "/placeholder.svg?height=40&width=40",
        isFollowing: true,
        verified: true,
      },
      song: {
        title: "Let It Be",
        artist: "The Beatles",
        key: "C",
        difficulty: "Beginner",
      },
      content:
        "Beautiful chord progression! Added some jazz voicings to make it more interesting. Check out the video! 🎹",
      timestamp: "6 hours ago",
      likes: 31,
      comments: 12,
      shares: 9,
      isLiked: false,
      tags: ["piano", "beatles", "jazz"],
    },
  ])

  const [suggestedUsers] = useState([
    {
      id: 4,
      name: "Alex Thompson",
      username: "alex_drums",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Professional drummer, session musician",
      followers: 1200,
      following: 340,
      isFollowing: false,
      verified: true,
      mutualFollowers: 5,
    },
    {
      id: 5,
      name: "Lisa Park",
      username: "ukulele_lisa",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Ukulele teacher & songwriter",
      followers: 890,
      following: 210,
      isFollowing: false,
      verified: false,
      mutualFollowers: 3,
    },
    {
      id: 6,
      name: "David Wilson",
      username: "fingerstyle_dave",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Fingerstyle guitarist, tab creator",
      followers: 2100,
      following: 180,
      isFollowing: false,
      verified: true,
      mutualFollowers: 8,
    },
  ])

  const [trendingTags] = useState([
    { name: "acoustic", count: 1240 },
    { name: "beginner", count: 980 },
    { name: "fingerstyle", count: 756 },
    { name: "jazz", count: 543 },
    { name: "blues", count: 432 },
    { name: "rock", count: 398 },
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <DashboardHeader />

      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Community</h1>
          <p className="text-gray-600">Connect with musicians, share tabs, and discover new music</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <div className="flex items-center justify-between">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                  <TabsTrigger value="feed">Feed</TabsTrigger>
                  <TabsTrigger value="discover">Discover</TabsTrigger>
                  <TabsTrigger value="following">Following</TabsTrigger>
                </TabsList>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search community..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>

              <TabsContent value="feed" className="space-y-6">
                {/* Create Post */}
                <Card className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Input placeholder="Share a tab or musical thought..." className="bg-gray-50 border-0" />
                    </div>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </Card>

                {/* Feed Posts */}
                <div className="space-y-6">
                  {feedPosts.map((post) => (
                    <TabPost key={post.id} post={post} />
                  ))}
                </div>

                {/* Load More */}
                <div className="text-center">
                  <Button variant="outline">Load More Posts</Button>
                </div>
              </TabsContent>

              <TabsContent value="discover" className="space-y-6">
                {/* Trending Tags */}
                <Card className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-orange-600" />
                    Trending Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {trendingTags.map((tag) => (
                      <Badge
                        key={tag.name}
                        variant="secondary"
                        className="cursor-pointer hover:bg-purple-100 hover:text-purple-700"
                      >
                        #{tag.name} ({tag.count})
                      </Badge>
                    ))}
                  </div>
                </Card>

                {/* Featured Tabs */}
                <Card className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-600" />
                    Featured Tabs This Week
                  </h3>
                  <div className="grid gap-4">
                    {feedPosts.slice(0, 2).map((post) => (
                      <TabPost key={post.id} post={post} featured />
                    ))}
                  </div>
                </Card>

                {/* Suggested Users */}
                <Card className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    Musicians You Might Like
                  </h3>
                  <div className="grid gap-4">
                    {suggestedUsers.map((user) => (
                      <UserCard key={user.id} user={user} />
                    ))}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="following" className="space-y-6">
                <div className="text-center py-12 text-gray-500">
                  <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-2">Follow Musicians</h3>
                  <p className="mb-4">Start following musicians to see their latest tabs and updates here.</p>
                  <Button>Discover Musicians</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <CommunityStats />

            {/* Quick Actions */}
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Music className="h-4 w-4 mr-2" />
                  Share a Tab
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Find Musicians
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Join Discussion
                </Button>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Recent Activity
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Heart className="h-3 w-3 text-red-500" />
                  <span className="text-gray-600">You liked Sarah's "Wonderwall" tab</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-3 w-3 text-blue-500" />
                  <span className="text-gray-600">Mike started following you</span>
                </div>
                <div className="flex items-center gap-2">
                  <Share2 className="h-3 w-3 text-green-500" />
                  <span className="text-gray-600">You shared "Hotel California" tab</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
