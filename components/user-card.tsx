"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserPlus, UserCheck, MessageCircle, Music } from "lucide-react"

interface User {
  id: number
  name: string
  username: string
  avatar: string
  bio: string
  followers: number
  following: number
  isFollowing: boolean
  verified: boolean
  mutualFollowers?: number
}

interface UserCardProps {
  user: User
  compact?: boolean
}

export function UserCard({ user, compact = false }: UserCardProps) {
  const [isFollowing, setIsFollowing] = useState(user.isFollowing)
  const [followerCount, setFollowerCount] = useState(user.followers)

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    setFollowerCount((prev) => (isFollowing ? prev - 1 : prev + 1))
  }

  if (compact) {
    return (
      <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar || "/placeholder.svg"} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm">{user.name}</span>
              {user.verified && (
                <Badge variant="secondary" className="h-4 text-xs">
                  ✓
                </Badge>
              )}
            </div>
            <p className="text-xs text-gray-500">@{user.username}</p>
          </div>
        </div>
        <Button size="sm" variant={isFollowing ? "outline" : "default"} onClick={handleFollow}>
          {isFollowing ? <UserCheck className="h-3 w-3" /> : <UserPlus className="h-3 w-3" />}
        </Button>
      </div>
    )
  }

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatar || "/placeholder.svg"} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold">{user.name}</h4>
              {user.verified && (
                <Badge variant="secondary" className="h-5 text-xs">
                  ✓
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-500">@{user.username}</p>
          </div>
        </div>
        <Button size="sm" variant={isFollowing ? "outline" : "default"} onClick={handleFollow}>
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
      </div>

      <p className="text-sm text-gray-600 mb-3">{user.bio}</p>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
        <div className="flex items-center gap-4">
          <span>
            <strong>{followerCount}</strong> followers
          </span>
          <span>
            <strong>{user.following}</strong> following
          </span>
        </div>
        {user.mutualFollowers && user.mutualFollowers > 0 && (
          <span className="text-xs text-blue-600">{user.mutualFollowers} mutual followers</span>
        )}
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1">
          <MessageCircle className="h-4 w-4 mr-2" />
          Message
        </Button>
        <Button variant="outline" size="sm" className="flex-1">
          <Music className="h-4 w-4 mr-2" />
          View Tabs
        </Button>
      </div>
    </Card>
  )
}
