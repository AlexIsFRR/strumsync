"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GitBranch, Clock, Download, Eye, RotateCcw } from "lucide-react"

interface CollabProject {
  id: string
  version: string
}

interface VersionHistoryProps {
  project: CollabProject
}

interface Version {
  id: string
  version: string
  author: {
    name: string
    avatar: string
  }
  timestamp: string
  changes: string[]
  isCurrent: boolean
}

export function VersionHistory({ project }: VersionHistoryProps) {
  const [versions] = useState<Version[]>([
    {
      id: "v1.3",
      version: "v1.3",
      author: {
        name: "Sarah Mitchell",
        avatar: "/placeholder.svg?height=24&width=24",
      },
      timestamp: "2 hours ago",
      changes: ["Added capo suggestion for measure 2", "Fixed timing in chorus section", "Updated chord progression"],
      isCurrent: true,
    },
    {
      id: "v1.2",
      version: "v1.2",
      author: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=24&width=24",
      },
      timestamp: "1 day ago",
      changes: ["Added fingerpicking pattern", "Improved intro section", "Added performance notes"],
      isCurrent: false,
    },
    {
      id: "v1.1",
      version: "v1.1",
      author: {
        name: "Mike Rodriguez",
        avatar: "/placeholder.svg?height=24&width=24",
      },
      timestamp: "2 days ago",
      changes: ["Initial bass line arrangement", "Set basic chord structure", "Added tempo markings"],
      isCurrent: false,
    },
    {
      id: "v1.0",
      version: "v1.0",
      author: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=24&width=24",
      },
      timestamp: "3 days ago",
      changes: ["Initial project creation", "Basic chord layout", "Song structure outline"],
      isCurrent: false,
    },
  ])

  const [selectedVersion, setSelectedVersion] = useState<string | null>(null)

  const handleVersionSelect = (versionId: string) => {
    setSelectedVersion(versionId === selectedVersion ? null : versionId)
  }

  const revertToVersion = (versionId: string) => {
    console.log("Reverting to version:", versionId)
    // Implement version revert logic
  }

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <GitBranch className="h-4 w-4" />
        Version History
      </h3>

      <div className="space-y-3">
        {versions.map((version) => (
          <div key={version.id} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Badge variant={version.isCurrent ? "default" : "secondary"} className="text-xs">
                  {version.version}
                </Badge>
                {version.isCurrent && (
                  <Badge variant="outline" className="text-xs">
                    Current
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" onClick={() => handleVersionSelect(version.id)}>
                  <Eye className="h-3 w-3" />
                </Button>
                {!version.isCurrent && (
                  <Button variant="ghost" size="sm" onClick={() => revertToVersion(version.id)}>
                    <RotateCcw className="h-3 w-3" />
                  </Button>
                )}
                <Button variant="ghost" size="sm">
                  <Download className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <Avatar className="h-5 w-5">
                <AvatarImage src={version.author.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-xs">
                  {version.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs font-medium">{version.author.name}</span>
              <span className="text-xs text-gray-500">{version.timestamp}</span>
            </div>

            {selectedVersion === version.id && (
              <div className="mt-3 pt-3 border-t">
                <h4 className="text-xs font-medium mb-2">Changes:</h4>
                <ul className="space-y-1">
                  {version.changes.map((change, index) => (
                    <li key={index} className="text-xs text-gray-600 flex items-start gap-2">
                      <span className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 flex-shrink-0"></span>
                      {change}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t">
        <Button variant="outline" size="sm" className="w-full">
          <Clock className="h-4 w-4 mr-2" />
          View Full History
        </Button>
      </div>
    </Card>
  )
}
