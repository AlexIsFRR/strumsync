"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { TabPost } from "@/components/tab-post"
import {
  UserPlus,
  UserCheck,
  MessageCircle,
  Share2,
  Music,
  Heart,
  Users,
  Calendar,
  MapPin,
  LinkIcon,
  MoreHorizontal,
} from "lucide-react"

export default function UserProfilePage({ params }: { params: { username: string } }) {
  const [isFollowing, setIsFollowing] = useState(false)
  const [followerCount, setFollowerCount] = useState(1247)

  const [user] = useState({
    id: 1,
    name: "Sarah Mitchell",
    username: "sarah_guitar",
    avatar: "/placeholder.svg?height=120&width=120",
    bio: "Professional guitarist and music teacher. Sharing tabs and techniques to help fellow musicians grow. 🎸✨",
    location: "Nashville, TN",
    website: "https://sarahguitar.com",
    joinDate: "March 2023",
    verified: true,
    followers: 1247,
    following: 342,
    tabsShared: 89,
    totalLikes: 3420,
  })

  const [userTabs] = useState([
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
        id: 1,
        name: "Sarah Mitchell",
        username: "sarah_guitar",
        avatar: "/placeholder.svg?height=40&width=40",
        isFollowing: true,
        verified: true,
      },
      song: {
        title: "Blackbird",
        artist: "The Beatles",
        key: "G",
        difficulty: "Intermediate",
      },
      content:
        "Beautiful fingerpicking pattern! This one took me weeks to master but so worth it. Here's my arrangement with some variations.",
      timestamp: "1 day ago",
      likes: 42,
      comments: 15,
      shares: 8,
      isLiked: true,
      tags: ["fingerpicking", "beatles", "intermediate"],
    },
  ])

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    setFollowerCount((prev) => (isFollowing ? prev - 1 : prev + 1))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <DashboardHeader />

      <div className="container mx-auto p-6">
        {/* Profile Header */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src={user.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-2xl">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex gap-2">
                <Button onClick={handleFollow} variant={isFollowing ? "outline" : "default"} className="flex-1">
                  {isFollowing ? (
                    <>
                      <UserCheck className="h-4 w-4 mr-2" />
                      Following
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Follow
                    </>
                  )}
                </Button>
                <Button variant="outline">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-3xl font-bold">{user.name}</h1>
                {user.verified && <Badge className="bg-blue-100 text-blue-700">✓ Verified</Badge>}
              </div>
              <p className="text-gray-600 mb-1">@{user.username}</p>
              <p className="text-gray-700 mb-4">{user.bio}</p>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                {user.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {user.location}
                  </div>
                )}
                {user.website && (
                  <div className="flex items-center gap-1">
                    <LinkIcon className="h-4 w-4" />
                    <a
                      href={user.website}
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {user.website.replace("https://", "")}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Joined {user.joinDate}
                </div>
              </div>

              <div className="flex gap-6 text-sm">
                <div>
                  <span className="font-semibold">{followerCount}</span>
                  <span className="text-gray-600 ml-1">followers</span>
                </div>
                <div>
                  <span className="font-semibold">{user.following}</span>
                  <span className="text-gray-600 ml-1">following</span>
                </div>
                <div>
                  <span className="font-semibold">{user.tabsShared}</span>
                  <span className="text-gray-600 ml-1">tabs shared</span>
                </div>
                <div>
                  <span className="font-semibold">{user.totalLikes}</span>
                  <span className="text-gray-600 ml-1">likes received</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Profile Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Tabs defaultValue="tabs" className="space-y-6">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="tabs">Tabs</TabsTrigger>
                <TabsTrigger value="likes">Likes</TabsTrigger>
                <TabsTrigger value="followers">Followers</TabsTrigger>
              </TabsList>

              <TabsContent value="tabs" className="space-y-6">
                {userTabs.map((post) => (
                  <TabPost key={post.id} post={post} />
                ))}
              </TabsContent>

              <TabsContent value="likes" className="space-y-6">
                <div className="text-center py-12 text-gray-500">
                  <Heart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Liked tabs are private</p>
                </div>
              </TabsContent>

              <TabsContent value="followers" className="space-y-6">
                <div className="text-center py-12 text-gray-500">
                  <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Followers list is private</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Music className="h-4 w-4 text-purple-600" />
                    <span className="text-sm">Tabs Shared</span>
                  </div>
                  <Badge variant="secondary">{user.tabsShared}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-600" />
                    <span className="text-sm">Total Likes</span>
                  </div>
                  <Badge variant="secondary">{user.totalLikes}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Followers</span>
                  </div>
                  <Badge variant="secondary">{followerCount}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Share2 className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Shares Received</span>
                  </div>
                  <Badge variant="secondary">127</Badge>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="cursor-pointer hover:bg-purple-100">
                  #acoustic
                </Badge>
                <Badge variant="secondary" className="cursor-pointer hover:bg-purple-100">
                  #fingerpicking
                </Badge>
                <Badge variant="secondary" className="cursor-pointer hover:bg-purple-100">
                  #beginner
                </Badge>
                <Badge variant="secondary" className="cursor-pointer hover:bg-purple-100">
                  #beatles
                </Badge>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
