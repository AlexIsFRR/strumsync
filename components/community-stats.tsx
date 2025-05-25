"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Music, Heart, TrendingUp } from "lucide-react"

export function CommunityStats() {
  const stats = [
    { label: "Active Musicians", value: "12.5K", icon: Users, color: "text-blue-600" },
    { label: "Tabs Shared", value: "45.2K", icon: Music, color: "text-purple-600" },
    { label: "Likes Given", value: "128K", icon: Heart, color: "text-red-600" },
    { label: "Weekly Growth", value: "+15%", icon: TrendingUp, color: "text-green-600" },
  ]

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Community Stats</h3>
      <div className="space-y-3">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
              <span className="text-sm text-gray-600">{stat.label}</span>
            </div>
            <Badge variant="secondary" className="font-semibold">
              {stat.value}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  )
}
