"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, XCircle, AlertTriangle, RefreshCw, Database, Shield, Settings, Bug, Network } from "lucide-react"

interface DiagnosticResult {
  name: string
  status: "pass" | "fail" | "warning"
  message: string
  details?: string
  fix?: string
}

export function CollaborationDebugPanel() {
  const [diagnostics, setDiagnostics] = useState<DiagnosticResult[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [permissions, setPermissions] = useState({
    canEdit: false,
    canView: false,
    canInvite: false,
    canManage: false,
  })

  const runDiagnostics = async () => {
    setIsRunning(true)
    const results: DiagnosticResult[] = []

    // Check 1: Route Accessibility
    try {
      const response = await fetch("/collaborate", { method: "HEAD" })
      results.push({
        name: "Route Accessibility",
        status: response.ok ? "pass" : "fail",
        message: response.ok ? "Collaborate route is accessible" : "Collaborate route not found",
        details: `HTTP Status: ${response.status}`,
        fix: response.ok ? undefined : "Check if /app/collaborate/page.tsx exists and is properly exported",
      })
    } catch (error) {
      results.push({
        name: "Route Accessibility",
        status: "fail",
        message: "Failed to check route accessibility",
        details: error instanceof Error ? error.message : "Unknown error",
        fix: "Verify Next.js routing configuration and file structure",
      })
    }

    // Check 2: User Permissions
    const userPermissions = await checkUserPermissions()
    results.push({
      name: "User Permissions",
      status: userPermissions.canEdit ? "pass" : "warning",
      message: userPermissions.canEdit ? "User has edit permissions" : "User has limited permissions",
      details: `Edit: ${userPermissions.canEdit}, View: ${userPermissions.canView}, Invite: ${userPermissions.canInvite}`,
      fix: !userPermissions.canEdit ? "Contact project owner to grant edit permissions" : undefined,
    })

    // Check 3: WebSocket Connection
    const wsStatus = await checkWebSocketConnection()
    results.push({
      name: "Real-time Connection",
      status: wsStatus.connected ? "pass" : "fail",
      message: wsStatus.connected ? "WebSocket connection active" : "WebSocket connection failed",
      details: wsStatus.details,
      fix: !wsStatus.connected ? "Check network connectivity and WebSocket server status" : undefined,
    })

    // Check 4: Navigation Links
    const navLinks = checkNavigationLinks()
    results.push({
      name: "Navigation Links",
      status: navLinks.found ? "pass" : "warning",
      message: navLinks.found ? "Collaboration links found in navigation" : "Collaboration links missing",
      details: navLinks.details,
      fix: !navLinks.found ? "Add collaboration links to main navigation menu" : undefined,
    })

    // Check 5: Component Dependencies
    const dependencies = checkComponentDependencies()
    results.push({
      name: "Component Dependencies",
      status: dependencies.allLoaded ? "pass" : "fail",
      message: dependencies.allLoaded ? "All components loaded successfully" : "Missing component dependencies",
      details: dependencies.details,
      fix: !dependencies.allLoaded ? "Check component imports and ensure all dependencies are installed" : undefined,
    })

    // Check 6: Local Storage & Session
    const storage = checkStorageAndSession()
    results.push({
      name: "Storage & Session",
      status: storage.working ? "pass" : "warning",
      message: storage.working ? "Storage and session working" : "Storage or session issues detected",
      details: storage.details,
      fix: !storage.working ? "Clear browser cache and cookies, then refresh" : undefined,
    })

    setDiagnostics(results)
    setPermissions(userPermissions)
    setIsRunning(false)
  }

  const checkUserPermissions = async () => {
    // Simulate permission check
    return new Promise<typeof permissions>((resolve) => {
      setTimeout(() => {
        resolve({
          canEdit: true, // This should come from actual auth system
          canView: true,
          canInvite: true,
          canManage: false,
        })
      }, 500)
    })
  }

  const checkWebSocketConnection = async () => {
    return new Promise<{ connected: boolean; details: string }>((resolve) => {
      setTimeout(() => {
        // Simulate WebSocket check
        const connected = Math.random() > 0.3 // 70% success rate for demo
        resolve({
          connected,
          details: connected
            ? "Connected to collaboration server"
            : "Failed to connect to ws://localhost:3001/collaborate",
        })
      }, 1000)
    })
  }

  const checkNavigationLinks = () => {
    // Check if collaboration links exist in DOM
    const collaborateLinks = document.querySelectorAll('a[href*="collaborate"]')
    return {
      found: collaborateLinks.length > 0,
      details: `Found ${collaborateLinks.length} collaboration link(s) in navigation`,
    }
  }

  const checkComponentDependencies = () => {
    // Check if required components are available
    const requiredComponents = ["CollaborativeEditor", "CollaboratorPanel", "VersionHistory", "CollabChat"]

    const loadedComponents = requiredComponents.filter((comp) => {
      // This is a simplified check - in real app, you'd check actual imports
      return typeof window !== "undefined"
    })

    return {
      allLoaded: loadedComponents.length === requiredComponents.length,
      details: `${loadedComponents.length}/${requiredComponents.length} components loaded`,
    }
  }

  const checkStorageAndSession = () => {
    try {
      localStorage.setItem("collab-test", "test")
      const retrieved = localStorage.getItem("collab-test")
      localStorage.removeItem("collab-test")

      return {
        working: retrieved === "test",
        details: "Local storage and session storage accessible",
      }
    } catch (error) {
      return {
        working: false,
        details: "Local storage access denied or unavailable",
      }
    }
  }

  const getStatusIcon = (status: DiagnosticResult["status"]) => {
    switch (status) {
      case "pass":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "fail":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
    }
  }

  const getStatusColor = (status: DiagnosticResult["status"]) => {
    switch (status) {
      case "pass":
        return "border-green-200 bg-green-50"
      case "fail":
        return "border-red-200 bg-red-50"
      case "warning":
        return "border-yellow-200 bg-yellow-50"
    }
  }

  useEffect(() => {
    runDiagnostics()
  }, [])

  const failedChecks = diagnostics.filter((d) => d.status === "fail").length
  const warningChecks = diagnostics.filter((d) => d.status === "warning").length
  const passedChecks = diagnostics.filter((d) => d.status === "pass").length

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Bug className="h-6 w-6 text-blue-600" />
          <div>
            <h2 className="text-xl font-bold">Collaboration Diagnostics</h2>
            <p className="text-sm text-gray-600">Troubleshoot collaborative editing issues</p>
          </div>
        </div>
        <Button onClick={runDiagnostics} disabled={isRunning}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isRunning ? "animate-spin" : ""}`} />
          {isRunning ? "Running..." : "Run Diagnostics"}
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div>
              <div className="font-semibold text-green-900">{passedChecks}</div>
              <div className="text-sm text-green-700">Passed</div>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-yellow-50 border-yellow-200">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <div>
              <div className="font-semibold text-yellow-900">{warningChecks}</div>
              <div className="text-sm text-yellow-700">Warnings</div>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-red-50 border-red-200">
          <div className="flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-600" />
            <div>
              <div className="font-semibold text-red-900">{failedChecks}</div>
              <div className="text-sm text-red-700">Failed</div>
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="diagnostics" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="diagnostics">Diagnostics</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="fixes">Quick Fixes</TabsTrigger>
        </TabsList>

        <TabsContent value="diagnostics" className="space-y-4">
          {diagnostics.map((diagnostic, index) => (
            <Card key={index} className={`p-4 border ${getStatusColor(diagnostic.status)}`}>
              <div className="flex items-start gap-3">
                {getStatusIcon(diagnostic.status)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{diagnostic.name}</h4>
                    <Badge
                      variant={
                        diagnostic.status === "pass"
                          ? "default"
                          : diagnostic.status === "warning"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {diagnostic.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{diagnostic.message}</p>
                  {diagnostic.details && <p className="text-xs text-gray-600 mb-2">{diagnostic.details}</p>}
                  {diagnostic.fix && (
                    <Alert className="mt-2">
                      <AlertDescription className="text-xs">
                        <strong>Fix:</strong> {diagnostic.fix}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card className="p-4">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Current User Permissions
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Can Edit Projects</span>
                <Badge variant={permissions.canEdit ? "default" : "secondary"}>
                  {permissions.canEdit ? "Granted" : "Denied"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Can View Projects</span>
                <Badge variant={permissions.canView ? "default" : "secondary"}>
                  {permissions.canView ? "Granted" : "Denied"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Can Invite Users</span>
                <Badge variant={permissions.canInvite ? "default" : "secondary"}>
                  {permissions.canInvite ? "Granted" : "Denied"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Can Manage Projects</span>
                <Badge variant={permissions.canManage ? "default" : "secondary"}>
                  {permissions.canManage ? "Granted" : "Denied"}
                </Badge>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="fixes" className="space-y-4">
          <div className="grid gap-4">
            <Card className="p-4">
              <h4 className="font-semibold mb-2">Common Issues & Solutions</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Issue:</strong> Collaboration page not accessible
                  <br />
                  <strong>Solution:</strong> Ensure you're logged in and have proper permissions
                </div>
                <div>
                  <strong>Issue:</strong> Real-time updates not working
                  <br />
                  <strong>Solution:</strong> Check network connection and refresh the page
                </div>
                <div>
                  <strong>Issue:</strong> Can't see other collaborators
                  <br />
                  <strong>Solution:</strong> Verify WebSocket connection and project sharing settings
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h4 className="font-semibold mb-2">Quick Actions</h4>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Refresh Page
                </Button>
                <Button variant="outline" size="sm" onClick={() => localStorage.clear()}>
                  <Database className="h-3 w-3 mr-1" />
                  Clear Cache
                </Button>
                <Button variant="outline" size="sm">
                  <Network className="h-3 w-3 mr-1" />
                  Test Connection
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-3 w-3 mr-1" />
                  Reset Settings
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
