"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { CollaborationDebugPanel } from "@/components/collaboration-debug-panel"
import { CollaborationAccessChecker } from "@/components/collaboration-access-checker"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bug, Users, Settings, ExternalLink, AlertTriangle, CheckCircle, Info } from "lucide-react"
import Link from "next/link"

export default function DebugPage() {
  const troubleshootingSteps = [
    {
      step: 1,
      title: "Check Navigation Access",
      description: "Verify that collaboration links are visible in the main navigation",
      action: "Look for 'Collaborate' in the header navigation",
      status: "check",
    },
    {
      step: 2,
      title: "Verify User Permissions",
      description: "Ensure your account has the necessary permissions for collaboration",
      action: "Run the access checker below",
      status: "check",
    },
    {
      step: 3,
      title: "Test Route Accessibility",
      description: "Confirm that the collaboration page loads correctly",
      action: "Navigate to /collaborate directly",
      status: "check",
    },
    {
      step: 4,
      title: "Check Real-time Connection",
      description: "Verify WebSocket connection for real-time collaboration",
      action: "Run full diagnostics",
      status: "check",
    },
  ]

  const commonIssues = [
    {
      issue: "Collaboration menu not visible",
      cause: "User not logged in or insufficient permissions",
      solution: "Log in with a verified account and check subscription status",
    },
    {
      issue: "Cannot access /collaborate page",
      cause: "Route not properly configured or permission denied",
      solution: "Check if the page exists and user has access rights",
    },
    {
      issue: "Real-time updates not working",
      cause: "WebSocket connection failed or network issues",
      solution: "Check network connectivity and refresh the page",
    },
    {
      issue: "Cannot see other collaborators",
      cause: "Project not shared or sync issues",
      solution: "Verify project sharing settings and WebSocket status",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <DashboardHeader />

      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Collaboration Troubleshooting</h1>
            <p className="text-gray-600">Diagnose and fix collaborative editing issues</p>
          </div>
          <div className="flex gap-2">
            <Link href="/collaborate">
              <Button variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Try Collaborate
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button>
                <ExternalLink className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Status */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            This debug page helps identify and resolve issues with the collaborative editing feature. Run the
            diagnostics below to check your system status.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="diagnostics" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="diagnostics">Diagnostics</TabsTrigger>
            <TabsTrigger value="access">Access Check</TabsTrigger>
            <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
            <TabsTrigger value="issues">Common Issues</TabsTrigger>
          </TabsList>

          <TabsContent value="diagnostics">
            <CollaborationDebugPanel />
          </TabsContent>

          <TabsContent value="access">
            <CollaborationAccessChecker />
          </TabsContent>

          <TabsContent value="troubleshooting" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Step-by-Step Troubleshooting</h3>
              <div className="space-y-4">
                {troubleshootingSteps.map((step) => (
                  <div key={step.step} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-semibold text-blue-600">{step.step}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{step.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{step.description}</p>
                      <p className="text-sm font-medium text-blue-600">{step.action}</p>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Manual Checks</h3>
              <div className="grid gap-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm">Navigation links visible</span>
                  <Badge variant="outline">Check manually</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm">User logged in</span>
                  <Badge variant="outline">Check manually</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm">Account verified</span>
                  <Badge variant="outline">Check manually</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm">Subscription active</span>
                  <Badge variant="outline">Check manually</Badge>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="issues" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Common Issues & Solutions</h3>
              <div className="space-y-4">
                {commonIssues.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-red-900 mb-1">{item.issue}</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          <strong>Cause:</strong> {item.cause}
                        </p>
                        <p className="text-sm text-green-700">
                          <strong>Solution:</strong> {item.solution}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Emergency Fixes</h3>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" onClick={() => window.location.reload()}>
                  <Settings className="h-4 w-4 mr-2" />
                  Refresh Page
                </Button>
                <Button variant="outline" onClick={() => localStorage.clear()}>
                  <Bug className="h-4 w-4 mr-2" />
                  Clear Cache
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/profile?tab=settings">
                    <Settings className="h-4 w-4 mr-2" />
                    Account Settings
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/collaborate">
                    <Users className="h-4 w-4 mr-2" />
                    Try Collaborate
                  </Link>
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
