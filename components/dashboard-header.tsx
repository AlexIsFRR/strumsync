"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Music, Search, User, Settings, LogOut, Bell, ChevronDown, Users, GitBranch } from "lucide-react"
import Link from "next/link"

export function DashboardHeader() {
  const [searchQuery, setSearchQuery] = useState("")
  const [notificationCount] = useState(3)

  return (
    <header className="bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b sticky top-0 z-50">
      <div className="container mx-auto px-6">
        {/* Main Header Row */}
        <div className="h-16 flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              <Music className="h-8 w-8 text-purple-600" />
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900">StrumSync</span>
              </div>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
              Dashboard
            </Link>
            <Link
              href="/collaborate"
              className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
            >
              <Users className="h-4 w-4" />
              Collaborate
            </Link>
            <Link href="/community" className="text-gray-600 hover:text-gray-900 transition-colors">
              Community
            </Link>
          </nav>

          {/* Search Section - Centered */}
          <div className="flex-1 max-w-md mx-8 hidden lg:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search songs, artists, or albums..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-50 border-0 focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Mobile Search Toggle */}
            <Button variant="ghost" size="sm" className="lg:hidden">
              <Search className="h-4 w-4" />
            </Button>

            {/* Collaboration Quick Access */}
            <Link href="/collaborate">
              <Button variant="ghost" size="sm" className="hidden md:flex">
                <GitBranch className="h-4 w-4 mr-2" />
                Collaborate
              </Button>
            </Link>

            {/* Notifications */}
            <Link href="/profile?tab=notifications">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                {notificationCount > 0 && (
                  <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs">
                    {notificationCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2 hover:bg-gray-100">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-purple-600" />
                  </div>
                  <span className="hidden lg:block text-sm font-medium">John Doe</span>
                  <ChevronDown className="h-3 w-3 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <Link href="/profile">
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                </Link>
                <Link href="/collaborate">
                  <DropdownMenuItem>
                    <Users className="mr-2 h-4 w-4" />
                    My Collaborations
                  </DropdownMenuItem>
                </Link>
                <Link href="/profile?tab=settings">
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Secondary Header Row - Connection Status */}
        <div className="h-12 flex items-center justify-between border-t border-gray-100">
          {/* Connection Status */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-green-50 px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium">Spotify Premium</span>
              <Badge variant="outline" className="text-xs bg-white">
                Connected
              </Badge>
            </div>

            {/* Project Info */}
            <div className="hidden lg:flex items-center gap-2 text-sm text-gray-500">
              <span>•</span>
              <span>Auto-save enabled</span>
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-xs">
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>K
              </kbd>
              <span className="ml-2">Search</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
