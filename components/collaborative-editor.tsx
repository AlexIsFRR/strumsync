"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { TabDisplay } from "@/components/tab-display"
import { SyncAudioPlayer } from "@/components/sync-audio-player"
import { Edit3, MessageSquare, CheckCircle, AlertCircle, Clock, Undo, Redo, Save, Radio } from "lucide-react"

interface CollabProject {
  id: string
  title: string
  artist: string
  key: string
  tempo: number
  instrument: string
  collaborators: Array<{
    id: string
    name: string
    username: string
    avatar: string
    role: "owner" | "editor" | "viewer"
    isOnline: boolean
    isListening?: boolean
  }>
}

interface CollaborativeEditorProps {
  project: CollabProject
}

interface Comment {
  id: string
  userId: string
  userName: string
  userAvatar: string
  content: string
  timestamp: string
  position: { x: number; y: number }
  resolved: boolean
}

interface Edit {
  id: string
  userId: string
  userName: string
  userAvatar: string
  type: "add" | "modify" | "delete"
  content: string
  timestamp: string
  position: string
}

export function CollaborativeEditor({ project }: CollaborativeEditorProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      userId: "user2",
      userName: "Sarah Mitchell",
      userAvatar: "/placeholder.svg?height=32&width=32",
      content: "Should we add a capo here? It might make the transition easier.",
      timestamp: "2 minutes ago",
      position: { x: 200, y: 150 },
      resolved: false,
    },
    {
      id: "2",
      userId: "user3",
      userName: "Mike Rodriguez",
      userAvatar: "/placeholder.svg?height=32&width=32",
      content: "The timing on measure 3 feels off. Maybe we should adjust?",
      timestamp: "5 minutes ago",
      position: { x: 400, y: 200 },
      resolved: true,
    },
  ])

  const [recentEdits] = useState<Edit[]>([
    {
      id: "1",
      userId: "user2",
      userName: "Sarah Mitchell",
      userAvatar: "/placeholder.svg?height=24&width=24",
      type: "modify",
      content: "Changed chord progression in measure 2",
      timestamp: "1 minute ago",
      position: "Measure 2",
    },
    {
      id: "2",
      userId: "user1",
      userName: "John Doe",
      userAvatar: "/placeholder.svg?height=24&width=24",
      type: "add",
      content: "Added fingerpicking pattern",
      timestamp: "3 minutes ago",
      position: "Intro",
    },
  ])

  const [newComment, setNewComment] = useState("")
  const [showCommentBox, setShowCommentBox] = useState(false)
  const [commentPosition, setCommentPosition] = useState({ x: 0, y: 0 })
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const editorRef = useRef<HTMLDivElement>(null)

  // Mock song data
  const song = {
    title: project.title,
    artist: project.artist,
    duration: 258,
    key: project.key,
    tempo: project.tempo,
  }

  // Enhanced collaborators with listening status
  const collaboratorsWithListening = project.collaborators.map((collab) => ({
    ...collab,
    isListening: Math.random() > 0.3, // Simulate some users listening
  }))

  const handleTabClick = (event: React.MouseEvent) => {
    if (isEditing) {
      const rect = editorRef.current?.getBoundingClientRect()
      if (rect) {
        setCommentPosition({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        })
        setShowCommentBox(true)
      }
    }
  }

  const addComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        userId: "user1",
        userName: "John Doe",
        userAvatar: "/placeholder.svg?height=32&width=32",
        content: newComment,
        timestamp: "now",
        position: commentPosition,
        resolved: false,
      }
      setComments([...comments, comment])
      setNewComment("")
      setShowCommentBox(false)
    }
  }

  const resolveComment = (commentId: string) => {
    setComments(comments.map((comment) => (comment.id === commentId ? { ...comment, resolved: true } : comment)))
  }

  const getEditTypeIcon = (type: string) => {
    switch (type) {
      case "add":
        return <CheckCircle className="h-3 w-3 text-green-600" />
      case "modify":
        return <Edit3 className="h-3 w-3 text-blue-600" />
      case "delete":
        return <AlertCircle className="h-3 w-3 text-red-600" />
      default:
        return <Edit3 className="h-3 w-3 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Synchronized Audio Player */}
      <SyncAudioPlayer
        song={song}
        collaborators={collaboratorsWithListening}
        isHost={true} // In real app, this would be determined by user role
        projectId={project.id}
      />

      {/* Editor Controls */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant={isEditing ? "default" : "outline"} size="sm" onClick={() => setIsEditing(!isEditing)}>
              <Edit3 className="h-4 w-4 mr-2" />
              {isEditing ? "Exit Edit Mode" : "Edit Mode"}
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Undo className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Redo className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Save className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Live Listening Indicator */}
            <div className="flex items-center gap-2">
              <Radio className="h-4 w-4 text-green-600" />
              <span className="text-sm text-gray-600">
                {collaboratorsWithListening.filter((c) => c.isListening && c.isOnline).length} listening live
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Auto-save enabled</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              <MessageSquare className="h-4 w-4 inline mr-2" />
              Click anywhere on the tab to add a comment or suggestion. Audio playback is synchronized for all
              listeners.
            </p>
          </div>
        )}
      </Card>

      {/* Collaborative Tab Editor with Audio Sync */}
      <Card className="p-6 relative" ref={editorRef} onClick={handleTabClick}>
        <TabDisplay
          instrument={project.instrument}
          currentTime={currentPlaybackTime}
          isPlaying={isAudioPlaying}
          tuningSettings={{ tuning: "standard", capo: 0 }}
          songKey={project.key}
        />

        {/* Comments Overlay */}
        {comments.map((comment) => (
          <div
            key={comment.id}
            className={`absolute z-10 ${comment.resolved ? "opacity-50" : ""}`}
            style={{
              left: comment.position.x,
              top: comment.position.y,
              transform: "translate(-50%, -100%)",
            }}
          >
            <div className="bg-white border rounded-lg shadow-lg p-3 max-w-xs">
              <div className="flex items-start gap-2 mb-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={comment.userAvatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-xs">
                    {comment.userName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-xs font-medium">{comment.userName}</p>
                  <p className="text-xs text-gray-500">{comment.timestamp}</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-2">{comment.content}</p>
              {!comment.resolved && (
                <Button size="sm" variant="outline" className="text-xs h-6" onClick={() => resolveComment(comment.id)}>
                  Resolve
                </Button>
              )}
              {comment.resolved && (
                <Badge variant="secondary" className="text-xs">
                  Resolved
                </Badge>
              )}
            </div>
            <div className="w-3 h-3 bg-white border-r border-b transform rotate-45 mx-auto -mt-1.5"></div>
          </div>
        ))}

        {/* Comment Input Box */}
        {showCommentBox && (
          <div
            className="absolute z-20 bg-white border rounded-lg shadow-lg p-3 w-64"
            style={{
              left: commentPosition.x,
              top: commentPosition.y,
              transform: "translate(-50%, -100%)",
            }}
          >
            <Textarea
              placeholder="Add a comment or suggestion..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="mb-2"
              rows={2}
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={addComment}>
                Add Comment
              </Button>
              <Button size="sm" variant="outline" onClick={() => setShowCommentBox(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Audio Sync Overlay */}
        {isAudioPlaying && (
          <div className="absolute top-4 right-4 bg-green-100 border border-green-200 rounded-lg p-2">
            <div className="flex items-center gap-2 text-green-700">
              <Radio className="h-4 w-4 animate-pulse" />
              <span className="text-sm font-medium">Live Audio Sync</span>
            </div>
          </div>
        )}
      </Card>

      {/* Recent Activity with Audio Events */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Recent Changes & Audio Events
        </h3>
        <div className="space-y-3">
          {/* Audio sync events */}
          <div className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
              <Radio className="h-3 w-3 text-green-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Audio Sync Session</span>
                <span className="text-xs text-gray-500">1 minute ago</span>
              </div>
              <p className="text-sm text-gray-700">Sarah Mitchell started synchronized playback</p>
              <p className="text-xs text-gray-500">3 collaborators joined the listening session</p>
            </div>
          </div>

          {recentEdits.map((edit) => (
            <div key={edit.id} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded">
              <Avatar className="h-6 w-6">
                <AvatarImage src={edit.userAvatar || "/placeholder.svg"} />
                <AvatarFallback className="text-xs">
                  {edit.userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {getEditTypeIcon(edit.type)}
                  <span className="text-sm font-medium">{edit.userName}</span>
                  <span className="text-xs text-gray-500">{edit.timestamp}</span>
                </div>
                <p className="text-sm text-gray-700">{edit.content}</p>
                <p className="text-xs text-gray-500">at {edit.position}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
