"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Download,
  Share2,
  Heart,
  Bookmark,
  Copy,
  FileText,
  ImageIcon,
  Music,
  Link,
  Mail,
  MessageCircle,
  MoreHorizontal,
  Printer,
  Save,
  Settings,
  Star,
  Users,
  Zap,
} from "lucide-react"

interface TabActionsToolbarProps {
  song: {
    title: string
    artist: string
    key: string
    tempo: number
  }
  instrument: string
  tuningSettings: {
    tuning: string
    capo: number
  }
  onExport: () => void
  onShare: () => void
}

export function TabActionsToolbar({ song, instrument, tuningSettings, onExport, onShare }: TabActionsToolbarProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [shareCount, setShareCount] = useState(12)
  const [likeCount, setLikeCount] = useState(24)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleQuickShare = (platform: string) => {
    console.log(`Sharing to ${platform}`)
    setShareCount((prev) => prev + 1)
  }

  return (
    <Card className="p-4 bg-white/80 backdrop-blur-sm border-0 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Left Section - Song Info & Quick Actions */}
        <div className="flex items-center gap-4">
          {/* Song Metadata */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg flex items-center justify-center">
              <Music className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">{song.title}</h3>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>{song.artist}</span>
                <span>•</span>
                <Badge variant="outline" className="text-xs">
                  {song.key}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {instrument}
                </Badge>
              </div>
            </div>
          </div>

          <Separator orientation="vertical" className="h-8" />

          {/* Quick Engagement Actions */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`flex items-center gap-1 ${isLiked ? "text-red-600 hover:text-red-700" : "text-gray-500 hover:text-red-600"}`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
              <span className="text-xs">{likeCount}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleBookmark}
              className={`${isBookmarked ? "text-yellow-600 hover:text-yellow-700" : "text-gray-500 hover:text-yellow-600"}`}
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
            </Button>

            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600">
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs ml-1">3</span>
            </Button>
          </div>
        </div>

        {/* Right Section - Export & Share Actions */}
        <div className="flex items-center gap-2">
          {/* Quick Share Buttons */}
          <div className="hidden md:flex items-center gap-1">
            <Button variant="outline" size="sm" onClick={() => handleQuickShare("copy")}>
              <Copy className="h-4 w-4 mr-1" />
              Copy Link
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                  <span className="ml-1 text-xs text-gray-500">({shareCount})</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => handleQuickShare("link")}>
                  <Link className="mr-2 h-4 w-4" />
                  Copy Share Link
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleQuickShare("email")}>
                  <Mail className="mr-2 h-4 w-4" />
                  Share via Email
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleQuickShare("collaborate")}>
                  <Users className="mr-2 h-4 w-4" />
                  Invite Collaborators
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onShare}>
                  <Settings className="mr-2 h-4 w-4" />
                  Advanced Sharing
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Separator orientation="vertical" className="h-6 hidden md:block" />

          {/* Export Actions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                Export as PDF
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ImageIcon className="mr-2 h-4 w-4" />
                Export as Image
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Music className="mr-2 h-4 w-4" />
                Export as MIDI
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                Export as Text
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Printer className="mr-2 h-4 w-4" />
                Print Tab
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onExport}>
                <Settings className="mr-2 h-4 w-4" />
                Export Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile More Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => handleQuickShare("copy")}>
                <Copy className="mr-2 h-4 w-4" />
                Copy Link
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Share Tab
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Save className="mr-2 h-4 w-4" />
                Save to Library
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Star className="mr-2 h-4 w-4" />
                Add to Favorites
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Secondary Actions Bar - Contextual Tools */}
      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          {/* Left - Tab Tools */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-xs">
              <Zap className="h-3 w-3 mr-1" />
              AI Suggest
            </Button>
            <Button variant="ghost" size="sm" className="text-xs">
              <Settings className="h-3 w-3 mr-1" />
              Tuning
            </Button>
            {tuningSettings.capo > 0 && (
              <Badge variant="outline" className="text-xs">
                Capo {tuningSettings.capo}
              </Badge>
            )}
          </div>

          {/* Right - Status & Info */}
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <span>Auto-saved</span>
            </div>
            <span>•</span>
            <span>Last modified 2 min ago</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
