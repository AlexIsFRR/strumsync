"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Share2, Copy, Mail, Twitter, Facebook, Users, Send } from "lucide-react"

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  post: {
    id: number
    user: {
      name: string
      username: string
      avatar: string
    }
    song: {
      title: string
      artist: string
    }
    content: string
  }
}

export function ShareModal({ isOpen, onClose, post }: ShareModalProps) {
  const [shareMessage, setShareMessage] = useState("")
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [shareLink] = useState(`https://strumsync.app/tab/${post.id}`)

  const [followers] = useState([
    { id: 1, name: "Sarah Mitchell", username: "sarah_guitar", avatar: "/placeholder.svg?height=32&width=32" },
    { id: 2, name: "Mike Rodriguez", username: "bass_master_mike", avatar: "/placeholder.svg?height=32&width=32" },
    { id: 3, name: "Emma Chen", username: "piano_emma", avatar: "/placeholder.svg?height=32&width=32" },
    { id: 4, name: "Alex Thompson", username: "alex_drums", avatar: "/placeholder.svg?height=32&width=32" },
  ])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink)
    // Show toast notification
  }

  const shareToSocial = (platform: string) => {
    const text = `Check out this amazing tab for "${post.song.title}" by ${post.song.artist} on TabSync!`
    const url = shareLink

    switch (platform) {
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`)
        break
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)
        break
      default:
        break
    }
  }

  const toggleUserSelection = (userId: number) => {
    setSelectedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  const sendToUsers = () => {
    // Implement sending to selected users
    console.log("Sending to users:", selectedUsers, "Message:", shareMessage)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Share Tab
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Tab Preview */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
                <AvatarFallback>
                  {post.user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{post.user.name}</p>
                <p className="text-xs text-gray-500">@{post.user.username}</p>
              </div>
            </div>
            <h4 className="font-semibold">{post.song.title}</h4>
            <p className="text-sm text-gray-600">{post.song.artist}</p>
            <p className="text-sm text-gray-700 mt-2 line-clamp-2">{post.content}</p>
          </div>

          {/* Share Link */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Share Link</label>
            <div className="flex gap-2">
              <Input value={shareLink} readOnly className="bg-gray-50" />
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Share on Social Media</label>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => shareToSocial("twitter")} className="flex-1">
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </Button>
              <Button variant="outline" size="sm" onClick={() => shareToSocial("facebook")} className="flex-1">
                <Facebook className="h-4 w-4 mr-2" />
                Facebook
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
            </div>
          </div>

          {/* Send to Followers */}
          <div className="space-y-3">
            <label className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4" />
              Send to Followers
            </label>

            <Textarea
              placeholder="Add a message (optional)..."
              value={shareMessage}
              onChange={(e) => setShareMessage(e.target.value)}
              rows={2}
            />

            <div className="max-h-32 overflow-y-auto space-y-2">
              {followers.map((user) => (
                <div
                  key={user.id}
                  className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                    selectedUsers.includes(user.id) ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"
                  }`}
                  onClick={() => toggleUserSelection(user.id)}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">@{user.username}</p>
                  </div>
                  {selectedUsers.includes(user.id) && (
                    <Badge variant="default" className="h-5 text-xs">
                      Selected
                    </Badge>
                  )}
                </div>
              ))}
            </div>

            {selectedUsers.length > 0 && (
              <Button onClick={sendToUsers} className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Send to {selectedUsers.length} {selectedUsers.length === 1 ? "person" : "people"}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
