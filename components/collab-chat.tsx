"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, Send, Paperclip, Smile } from "lucide-react"

interface CollabProject {
  id: string
}

interface CollabChatProps {
  project: CollabProject
}

interface Message {
  id: string
  userId: string
  userName: string
  userAvatar: string
  content: string
  timestamp: string
  type: "message" | "system"
}

export function CollabChat({ project }: CollabChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      userId: "system",
      userName: "System",
      userAvatar: "",
      content: "Sarah Mitchell joined the collaboration",
      timestamp: "10:30 AM",
      type: "system",
    },
    {
      id: "2",
      userId: "user2",
      userName: "Sarah Mitchell",
      userAvatar: "/placeholder.svg?height=32&width=32",
      content: "Hey! I've added some suggestions for the chord progression. What do you think?",
      timestamp: "10:32 AM",
      type: "message",
    },
    {
      id: "3",
      userId: "user1",
      userName: "John Doe",
      userAvatar: "/placeholder.svg?height=32&width=32",
      content: "Looks great! The capo suggestion really helps with the transitions.",
      timestamp: "10:35 AM",
      type: "message",
    },
    {
      id: "4",
      userId: "user3",
      userName: "Mike Rodriguez",
      userAvatar: "/placeholder.svg?height=32&width=32",
      content: "Should we add a bass line to complement this? I can work on that.",
      timestamp: "10:38 AM",
      type: "message",
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        userId: "user1",
        userName: "John Doe",
        userAvatar: "/placeholder.svg?height=32&width=32",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "message",
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold flex items-center gap-2">
          <MessageCircle className="h-4 w-4" />
          Chat
        </h3>
        <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "Collapse" : "Expand"}
        </Button>
      </div>

      <div className={`space-y-3 overflow-y-auto ${isExpanded ? "h-80" : "h-40"} mb-4`}>
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-2 ${message.type === "system" ? "justify-center" : ""}`}>
            {message.type === "system" ? (
              <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{message.content}</div>
            ) : (
              <>
                <Avatar className="h-6 w-6 flex-shrink-0">
                  <AvatarImage src={message.userAvatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-xs">
                    {message.userName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium">{message.userName}</span>
                    <span className="text-xs text-gray-500">{message.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-700 break-words">{message.content}</p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pr-20"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Paperclip className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Smile className="h-3 w-3" />
            </Button>
          </div>
        </div>
        <Button size="sm" onClick={sendMessage}>
          <Send className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-2 text-xs text-gray-500 text-center">3 people are typing...</div>
    </Card>
  )
}
