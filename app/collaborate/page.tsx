"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DashboardHeader } from "@/components/dashboard-header"
import { CollaborativeEditor } from "@/components/collaborative-editor"
import { CollaboratorPanel } from "@/components/collaborator-panel"
import { VersionHistory } from "@/components/version-history"
import { CollabChat } from "@/components/collab-chat"
import { Plus, Search, Filter, Music, Share2, Play, Save, AlertTriangle, CheckCircle, Users } from "lucide-react"

interface CollabProject {
  id: string
  title: string
  artist: string
  key: string
  tempo: number
  instrument: string
  difficulty: string
  owner: {
    id: string
    name: string
    username: string
    avatar: string
  }
  collaborators: Array<{
    id: string
    name: string
    username: string
    avatar: string
    role: "owner" | "editor" | "viewer"
    isOnline: boolean
    lastSeen: string
  }>
  lastModified: string
  status: "draft" | "review" | "published"
  version: string
  isPublic: boolean
}

export default function CollaboratePage() {
  const [activeTab, setActiveTab] = useState("my-projects")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProject, setSelectedProject] = useState<CollabProject | null>(null)
  const [hasAccess, setHasAccess] = useState(true) // This should come from auth system

  const [myProjects] = useState<CollabProject[]>([
    {
      id: "1",
      title: "Wonderwall",
      artist: "Oasis",
      key: "F#m",
      tempo: 87,
      instrument: "guitar",
      difficulty: "Beginner",
      owner: {
        id: "user1",
        name: "John Doe",
        username: "john_guitar",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      collaborators: [
        {
          id: "user2",
          name: "Sarah Mitchell",
          username: "sarah_guitar",
          avatar: "/placeholder.svg?height=32&width=32",
          role: "editor",
          isOnline: true,
          lastSeen: "now",
        },
        {
          id: "user3",
          name: "Mike Rodriguez",
          username: "bass_mike",
          avatar: "/placeholder.svg?height=32&width=32",
          role: "viewer",
          isOnline: false,
          lastSeen: "2 hours ago",
        },
      ],
      lastModified: "2 hours ago",
      status: "draft",
      version: "v1.3",
      isPublic: false,
    },
    {
      id: "2",
      title: "Hotel California",
      artist: "Eagles",
      key: "Bm",
      tempo: 75,
      instrument: "guitar",
      difficulty: "Advanced",
      owner: {
        id: "user1",
        name: "John Doe",
        username: "john_guitar",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      collaborators: [
        {
          id: "user4",
          name: "Emma Chen",
          username: "piano_emma",
          avatar: "/placeholder.svg?height=32&width=32",
          role: "editor",
          isOnline: true,
          lastSeen: "now",
        },
      ],
      lastModified: "1 day ago",
      status: "review",
      version: "v2.1",
      isPublic: true,
    },
  ])

  const [invitedProjects] = useState<CollabProject[]>([
    {
      id: "3",
      title: "Blackbird",
      artist: "The Beatles",
      key: "G",
      tempo: 96,
      instrument: "guitar",
      difficulty: "Intermediate",
      owner: {
        id: "user2",
        name: "Sarah Mitchell",
        username: "sarah_guitar",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      collaborators: [
        {
          id: "user1",
          name: "John Doe",
          username: "john_guitar",
          avatar: "/placeholder.svg?height=32&width=32",
          role: "editor",
          isOnline: true,
          lastSeen: "now",
        },
      ],
      lastModified: "30 minutes ago",
      status: "draft",
      version: "v1.0",
      isPublic: false,
    },
  ])

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-700"
      case "review":
        return "bg-blue-100 text-blue-700"
      case "published":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const ProjectCard = ({ project }: { project: CollabProject }) => (
    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedProject(project)}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold">{project.title}</h4>
            <Badge className={getStatusColor(project.status)} variant="secondary">
              {project.status}
            </Badge>
            {project.isPublic && (
              <Badge variant="outline" className="text-xs">
                Public
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-600">{project.artist}</p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className="text-xs">
              {project.key}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {project.tempo} BPM
            </Badge>
            <Badge className={`text-xs ${getDifficultyColor(project.difficulty)}`}>{project.difficulty}</Badge>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">{project.version}</p>
          <p className="text-xs text-gray-500">{project.lastModified}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            <Avatar className="h-6 w-6 border-2 border-white">
              <AvatarImage src={project.owner.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-xs">
                {project.owner.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            {project.collaborators.slice(0, 3).map((collab) => (
              <Avatar key={collab.id} className="h-6 w-6 border-2 border-white">
                <AvatarImage src={collab.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-xs">
                  {collab.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            ))}
            {project.collaborators.length > 3 && (
              <div className="h-6 w-6 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-xs text-gray-600">+{project.collaborators.length - 3}</span>
              </div>
            )}
          </div>
          <span className="text-xs text-gray-500">{project.collaborators.filter((c) => c.isOnline).length} online</span>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm">
            <Play className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </Card>
  )

  // Access Control Check
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <DashboardHeader />
        <div className="container mx-auto p-6">
          <Card className="p-8 text-center max-w-md mx-auto">
            <AlertTriangle className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Access Required</h2>
            <p className="text-gray-600 mb-4">
              You need collaboration permissions to access this feature. Please contact your administrator or upgrade
              your account.
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => window.history.back()}>
                Go Back
              </Button>
              <Button>Request Access</Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  if (selectedProject) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <DashboardHeader />
        <div className="container mx-auto p-6">
          {/* Project Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => setSelectedProject(null)}>
                ← Back to Projects
              </Button>
              <div>
                <h1 className="text-2xl font-bold">{selectedProject.title}</h1>
                <p className="text-gray-600">{selectedProject.artist}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(selectedProject.status)}>{selectedProject.status}</Badge>
              <Badge variant="outline">{selectedProject.version}</Badge>
              <Button variant="outline" size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Publish
              </Button>
            </div>
          </div>

          {/* Collaboration Status */}
          <Alert className="mb-6">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <div className="flex items-center justify-between">
                <span>
                  Collaborative editing is active. {selectedProject.collaborators.filter((c) => c.isOnline).length}{" "}
                  users online.
                </span>
                <Badge variant="outline" className="ml-2">
                  <Users className="h-3 w-3 mr-1" />
                  Live Session
                </Badge>
              </div>
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <CollaborativeEditor project={selectedProject} />
            </div>
            <div className="space-y-6">
              <CollaboratorPanel project={selectedProject} />
              <VersionHistory project={selectedProject} />
              <CollabChat project={selectedProject} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <DashboardHeader />

      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Collaborative Tabs</h1>
          <p className="text-gray-600">Work together with other musicians to create amazing tabs</p>
        </div>

        {/* Feature Status Alert */}
        <Alert className="mb-6">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Collaborative editing is now available! Create projects, invite collaborators, and work together in
            real-time.
          </AlertDescription>
        </Alert>

        <div className="flex items-center justify-between mb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="my-projects">My Projects</TabsTrigger>
              <TabsTrigger value="invited">Invited</TabsTrigger>
              <TabsTrigger value="public">Public</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="my-projects" className="space-y-4">
            <div className="grid gap-4">
              {myProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="invited" className="space-y-4">
            <div className="grid gap-4">
              {invitedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="public" className="space-y-4">
            <div className="text-center py-12 text-gray-500">
              <Music className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Discover public collaborative projects</p>
              <Button className="mt-4">Browse Public Projects</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
