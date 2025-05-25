"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ShareModal } from "@/components/share-modal"
import { Heart, MessageCircle, Share2, Music, Play, MoreHorizontal, Star, Bookmark } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface TabPostProps {
  post: {
    id: number
    user: {
      id: number
      name: string
      username: string
      avatar: string
      isFollowing: boolean
      verified: boolean
    }
    song: {
      title: string
      artist: string
      key: string
      difficulty: string
    }
    content: string
    timestamp: string
    likes: number
    comments: number
    shares: number
    isLiked: boolean
    tags: string[]
  }
  featured?: boolean
}

export function TabPost({ post, featured = false }: TabPostProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked)
  const [likeCount, setLikeCount] = useState(post.likes)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1))
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

  return (
    <>
      <Card
        className={`p-6 hover:shadow-md transition-shadow ${featured ? "ring-2 ring-yellow-200 bg-yellow-50" : ""}`}
      >
        {featured && (
          <div className="flex items-center gap-2 mb-4 text-yellow-700">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium">Featured Tab</span>
          </div>
        )}

        {/* User Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
              <AvatarFallback>
                {post.user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{post.user.name}</span>
                {post.user.verified && (
                  <Badge variant="secondary" className="h-4 text-xs">
                    ✓
                  </Badge>
                )}
                <span className="text-sm text-gray-500">@{post.user.username}</span>
              </div>
              <span className="text-sm text-gray-500">{post.timestamp}</span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Bookmark className="mr-2 h-4 w-4" />
                Save Tab
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Report</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Song Info */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Music className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold">{post.song.title}</h4>
                <p className="text-sm text-gray-600">{post.song.artist}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {post.song.key}
                  </Badge>
                  <Badge className={`text-xs ${getDifficultyColor(post.song.difficulty)}`}>
                    {post.song.difficulty}
                  </Badge>
                </div>
              </div>
            </div>
            <Button size="sm">
              <Play className="h-4 w-4 mr-2" />
              Play Tab
            </Button>
          </div>
        </div>

        {/* Content */}
        <p className="text-gray-700 mb-4">{post.content}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs cursor-pointer hover:bg-purple-100">
              #{tag}
            </Badge>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={isLiked ? "text-red-600 hover:text-red-700" : "text-gray-500 hover:text-red-600"}
            >
              <Heart className={`h-4 w-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
              {likeCount}
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600">
              <MessageCircle className="h-4 w-4 mr-2" />
              {post.comments}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowShareModal(true)}
              className="text-gray-500 hover:text-green-600"
            >
              <Share2 className="h-4 w-4 mr-2" />
              {post.shares}
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={isBookmarked ? "text-yellow-600" : "text-gray-500 hover:text-yellow-600"}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
          </Button>
        </div>
      </Card>

      <ShareModal isOpen={showShareModal} onClose={() => setShowShareModal(false)} post={post} />
    </>
  )
}
