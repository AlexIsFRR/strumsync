"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Users, Lock, AlertTriangle, CheckCircle, ExternalLink, UserPlus, Settings, Eye, Edit3 } from "lucide-react"
import Link from "next/link"

interface AccessStatus {
  hasAccess: boolean
  role: "owner" | "editor" | "viewer" | "none"
  reason?: string
  canRequest: boolean
  projectId?: string
}

export function CollaborationAccessChecker() {
  const [accessStatus, setAccessStatus] = useState<AccessStatus>({
    hasAccess: false,
    role: "none",
    canRequest: false,
  })
  const [isChecking, setIsChecking] = useState(true)
  const [requestSent, setRequestSent] = useState(false)

  useEffect(() => {
    checkAccess()
  }, [])

  const checkAccess = async () => {
    setIsChecking(true)

    // Simulate access check
    setTimeout(() => {
      // Mock different scenarios for testing
      const scenarios = [
        { hasAccess: true, role: "owner" as const, reason: "You own this project" },
        { hasAccess: true, role: "editor" as const, reason: "You have edit permissions" },
        { hasAccess: true, role: "viewer" as const, reason: "You have view-only access" },
        { hasAccess: false, role: "none" as const, reason: "No access to collaboration features", canRequest: true },
        { hasAccess: false, role: "none" as const, reason: "Account not verified", canRequest: false },
      ]

      const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)]
      setAccessStatus({
        ...randomScenario,
        projectId: "wonderwall-123",
      })
      setIsChecking(false)
    }, 2000)
  }

  const requestAccess = async () => {
    setRequestSent(true)
    // Simulate request
    setTimeout(() => {
      setAccessStatus((prev) => ({
        ...prev,
        reason: "Access request sent to project owner",
      }))
    }, 1000)
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "owner":
        return <Settings className="h-4 w-4 text-purple-600" />
      case "editor":
        return <Edit3 className="h-4 w-4 text-blue-600" />
      case "viewer":
        return <Eye className="h-4 w-4 text-green-600" />
      default:
        return <Lock className="h-4 w-4 text-gray-600" />
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "owner":
        return "bg-purple-100 text-purple-700"
      case "editor":
        return "bg-blue-100 text-blue-700"
      case "viewer":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  if (isChecking) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Users className="h-6 w-6 text-blue-600" />
          <h3 className="text-lg font-semibold">Checking Collaboration Access</h3>
        </div>
        <div className="space-y-3">
          <Progress value={66} className="w-full" />
          <p className="text-sm text-gray-600">Verifying your permissions...</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <Users className="h-6 w-6 text-blue-600" />
        <h3 className="text-lg font-semibold">Collaboration Access Status</h3>
      </div>

      {accessStatus.hasAccess ? (
        <div className="space-y-4">
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <div className="flex items-center justify-between">
                <span>You have access to collaborative editing!</span>
                <Badge className={getRoleColor(accessStatus.role)}>
                  {getRoleIcon(accessStatus.role)}
                  {accessStatus.role}
                </Badge>
              </div>
            </AlertDescription>
          </Alert>

          <div className="grid gap-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">Access Level</span>
              <Badge className={getRoleColor(accessStatus.role)}>
                {accessStatus.role.charAt(0).toUpperCase() + accessStatus.role.slice(1)}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">Permissions</span>
              <div className="flex gap-2">
                {accessStatus.role !== "none" && (
                  <Badge variant="outline" className="text-xs">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Badge>
                )}
                {(accessStatus.role === "editor" || accessStatus.role === "owner") && (
                  <Badge variant="outline" className="text-xs">
                    <Edit3 className="h-3 w-3 mr-1" />
                    Edit
                  </Badge>
                )}
                {accessStatus.role === "owner" && (
                  <Badge variant="outline" className="text-xs">
                    <UserPlus className="h-3 w-3 mr-1" />
                    Manage
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Link href="/collaborate" className="flex-1">
              <Button className="w-full">
                <Users className="h-4 w-4 mr-2" />
                Open Collaboration
              </Button>
            </Link>
            <Button variant="outline" onClick={checkAccess}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Refresh Status
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {accessStatus.reason || "You don't have access to collaborative editing features."}
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <h4 className="font-medium text-sm">To access collaboration features:</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Ensure you're logged in to your account
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Verify your email address
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Get invited to a collaborative project
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Upgrade to a plan that includes collaboration
              </li>
            </ul>
          </div>

          <div className="flex gap-2">
            {accessStatus.canRequest && !requestSent && (
              <Button onClick={requestAccess} className="flex-1">
                <UserPlus className="h-4 w-4 mr-2" />
                Request Access
              </Button>
            )}
            {requestSent && (
              <Button disabled className="flex-1">
                <CheckCircle className="h-4 w-4 mr-2" />
                Request Sent
              </Button>
            )}
            <Button variant="outline" asChild>
              <Link href="/profile?tab=settings">
                <Settings className="h-4 w-4 mr-2" />
                Account Settings
              </Link>
            </Button>
          </div>
        </div>
      )}

      {/* Quick Links */}
      <div className="mt-6 pt-4 border-t">
        <h4 className="font-medium text-sm mb-3">Quick Links</h4>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/collaborate">
              <ExternalLink className="h-3 w-3 mr-1" />
              Collaboration Hub
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href="/community">
              <Users className="h-3 w-3 mr-1" />
              Community
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  )
}
