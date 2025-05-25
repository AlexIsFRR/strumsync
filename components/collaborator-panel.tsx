"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserPlus, Settings, Crown, Edit3, Eye, MoreHorizontal, Mail, Copy, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface CollabProject {
  id: string
  collaborators: Array<{
    id: string
    name: string
    username: string
    avatar: string
    role: "owner" | "editor" | "viewer"
    isOnline: boolean
    lastSeen: string
  }>
}

interface CollaboratorPanelProps {
  project: CollabProject
}

export function CollaboratorPanel({ project }: CollaboratorPanelProps) {
  const [showInviteForm, setShowInviteForm] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState("editor")
  const [collaborators, setCollaborators] = useState(project.collaborators)

  const handleInvite = () => {
    // Simulate sending invite
    console.log("Inviting:", inviteEmail, "as", inviteRole)
    setInviteEmail("")
    setShowInviteForm(false)
  }

  const updateRole = (userId: string, newRole: string) => {
    setCollaborators(
      collaborators.map((collab) =>
        collab.id === userId ? { ...collab, role: newRole as "owner" | "editor" | "viewer" } : collab,
      ),
    )
  }

  const removeCollaborator = (userId: string) => {
    setCollaborators(collaborators.filter((collab) => collab.id !== userId))
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "owner":
        return <Crown className="h-3 w-3 text-yellow-600" />
      case "editor":
        return <Edit3 className="h-3 w-3 text-blue-600" />
      case "viewer":
        return <Eye className="h-3 w-3 text-gray-600" />
      default:
        return <Eye className="h-3 w-3 text-gray-600" />
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "owner":
        return "bg-yellow-100 text-yellow-700"
      case "editor":
        return "bg-blue-100 text-blue-700"
      case "viewer":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Collaborators ({collaborators.length})</h3>
        <Button size="sm" onClick={() => setShowInviteForm(!showInviteForm)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Invite
        </Button>
      </div>

      {showInviteForm && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg space-y-3">
          <Input
            placeholder="Enter email address"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
          />
          <Select value={inviteRole} onValueChange={setInviteRole}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="viewer">Viewer - Can view only</SelectItem>
              <SelectItem value="editor">Editor - Can edit and comment</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Button size="sm" onClick={handleInvite}>
              Send Invite
            </Button>
            <Button size="sm" variant="outline" onClick={() => setShowInviteForm(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {collaborators.map((collaborator) => (
          <div key={collaborator.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
            <div className="relative">
              <Avatar className="h-8 w-8">
                <AvatarImage src={collaborator.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-xs">
                  {collaborator.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {collaborator.isOnline && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium truncate">{collaborator.name}</p>
                <Badge className={`text-xs ${getRoleColor(collaborator.role)}`} variant="secondary">
                  {getRoleIcon(collaborator.role)}
                  {collaborator.role}
                </Badge>
              </div>
              <p className="text-xs text-gray-500">
                {collaborator.isOnline ? "Online now" : `Last seen ${collaborator.lastSeen}`}
              </p>
            </div>

            {collaborator.role !== "owner" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => updateRole(collaborator.id, "editor")}>
                    <Edit3 className="mr-2 h-4 w-4" />
                    Make Editor
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => updateRole(collaborator.id, "viewer")}>
                    <Eye className="mr-2 h-4 w-4" />
                    Make Viewer
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Mail className="mr-2 h-4 w-4" />
                    Send Message
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600" onClick={() => removeCollaborator(collaborator.id)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        ))}
      </div>

      {/* Sharing Settings */}
      <div className="mt-4 pt-4 border-t">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Share Link</span>
          <Button variant="ghost" size="sm">
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-2">
          <Input value="https://tabsync.app/collab/wonderwall-abc123" readOnly className="text-xs bg-gray-50" />
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-1">Anyone with this link can view the project</p>
      </div>
    </Card>
  )
}
