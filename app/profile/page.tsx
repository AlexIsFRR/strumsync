"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardHeader } from "@/components/dashboard-header"
import {
  User,
  Settings,
  Bell,
  Music,
  Heart,
  Star,
  Clock,
  Download,
  Share2,
  Edit,
  Camera,
  Save,
  Smartphone,
  Mail,
  Lock,
  CreditCard,
  Trash2,
} from "lucide-react"

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Passionate guitarist and music enthusiast. Love learning new songs and sharing tabs with the community.",
    location: "San Francisco, CA",
    website: "https://johndoe.music",
    favoriteGenres: ["Rock", "Blues", "Folk"],
    primaryInstrument: "guitar",
    skillLevel: "intermediate",
    joinDate: "March 2024",
  })

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklyDigest: true,
    communityUpdates: false,
    practiceReminders: true,
    autoPlay: true,
    defaultInstrument: "guitar",
    defaultTuning: "standard",
    theme: "light",
    language: "en",
  })

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "like",
      message: "Sarah M. liked your tab for 'Wonderwall'",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "follow",
      message: "Mike R. started following you",
      time: "5 hours ago",
      read: false,
    },
    {
      id: 3,
      type: "achievement",
      message: "You've learned 10 songs this month! 🎉",
      time: "1 day ago",
      read: true,
    },
    {
      id: 4,
      type: "update",
      message: "New bass tablature feature is now available",
      time: "2 days ago",
      read: true,
    },
    {
      id: 5,
      type: "reminder",
      message: "Time for your daily practice session",
      time: "3 days ago",
      read: true,
    },
  ])

  const [stats] = useState({
    songsLearned: 47,
    practiceHours: 156,
    tabsShared: 12,
    followers: 89,
    following: 34,
    favoriteCount: 23,
  })

  const handleProfileUpdate = () => {
    // Simulate profile update
    console.log("Profile updated:", profile)
  }

  const handleSettingsUpdate = () => {
    // Simulate settings update
    console.log("Settings updated:", settings)
  }

  const markNotificationAsRead = (id: number) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="h-4 w-4 text-red-500" />
      case "follow":
        return <User className="h-4 w-4 text-blue-500" />
      case "achievement":
        return <Star className="h-4 w-4 text-yellow-500" />
      case "update":
        return <Bell className="h-4 w-4 text-purple-500" />
      case "reminder":
        return <Clock className="h-4 w-4 text-green-500" />
      default:
        return <Bell className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <DashboardHeader />

      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile & Settings</h1>
          <p className="text-gray-600">Manage your account, preferences, and notifications</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="notifications">
              Notifications
              {notifications.filter((n) => !n.read).length > 0 && (
                <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs">
                  {notifications.filter((n) => !n.read).length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Info */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src="/placeholder.svg?height=80&width=80" />
                        <AvatarFallback className="text-2xl">
                          {profile.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <Button size="sm" variant="outline" className="absolute -bottom-2 -right-2 h-8 w-8 p-0">
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{profile.name}</h2>
                      <p className="text-gray-600">{profile.email}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">{profile.primaryInstrument}</Badge>
                        <Badge variant="outline">{profile.skillLevel}</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={profile.location}
                          onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          value={profile.website}
                          onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="instrument">Primary Instrument</Label>
                        <Select
                          value={profile.primaryInstrument}
                          onValueChange={(value) => setProfile({ ...profile, primaryInstrument: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="guitar">Guitar</SelectItem>
                            <SelectItem value="piano">Piano</SelectItem>
                            <SelectItem value="bass">Bass</SelectItem>
                            <SelectItem value="ukulele">Ukulele</SelectItem>
                            <SelectItem value="drums">Drums</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="skill">Skill Level</Label>
                        <Select
                          value={profile.skillLevel}
                          onValueChange={(value) => setProfile({ ...profile, skillLevel: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                            <SelectItem value="expert">Expert</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button onClick={handleProfileUpdate} className="w-full">
                      <Save className="h-4 w-4 mr-2" />
                      Save Profile
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Quick Stats */}
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Songs Learned</span>
                      <span className="font-semibold">{stats.songsLearned}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Practice Hours</span>
                      <span className="font-semibold">{stats.practiceHours}h</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Tabs Shared</span>
                      <span className="font-semibold">{stats.tabsShared}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Followers</span>
                      <span className="font-semibold">{stats.followers}</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Favorite Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.favoriteGenres.map((genre) => (
                      <Badge key={genre} variant="secondary">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Genres
                  </Button>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Notifications Settings */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notif">Email Notifications</Label>
                      <p className="text-sm text-gray-500">Receive notifications via email</p>
                    </div>
                    <Switch
                      id="email-notif"
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-notif">Push Notifications</Label>
                      <p className="text-sm text-gray-500">Receive push notifications</p>
                    </div>
                    <Switch
                      id="push-notif"
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => setSettings({ ...settings, pushNotifications: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="weekly-digest">Weekly Digest</Label>
                      <p className="text-sm text-gray-500">Weekly summary of your activity</p>
                    </div>
                    <Switch
                      id="weekly-digest"
                      checked={settings.weeklyDigest}
                      onCheckedChange={(checked) => setSettings({ ...settings, weeklyDigest: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="community-updates">Community Updates</Label>
                      <p className="text-sm text-gray-500">Updates from the TabSync community</p>
                    </div>
                    <Switch
                      id="community-updates"
                      checked={settings.communityUpdates}
                      onCheckedChange={(checked) => setSettings({ ...settings, communityUpdates: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="practice-reminders">Practice Reminders</Label>
                      <p className="text-sm text-gray-500">Daily practice reminders</p>
                    </div>
                    <Switch
                      id="practice-reminders"
                      checked={settings.practiceReminders}
                      onCheckedChange={(checked) => setSettings({ ...settings, practiceReminders: checked })}
                    />
                  </div>
                </div>
              </Card>

              {/* App Settings */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  App Settings
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-play">Auto-play Songs</Label>
                      <p className="text-sm text-gray-500">Automatically play songs when loaded</p>
                    </div>
                    <Switch
                      id="auto-play"
                      checked={settings.autoPlay}
                      onCheckedChange={(checked) => setSettings({ ...settings, autoPlay: checked })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="default-instrument">Default Instrument</Label>
                    <Select
                      value={settings.defaultInstrument}
                      onValueChange={(value) => setSettings({ ...settings, defaultInstrument: value })}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="guitar">Guitar</SelectItem>
                        <SelectItem value="piano">Piano</SelectItem>
                        <SelectItem value="bass">Bass</SelectItem>
                        <SelectItem value="ukulele">Ukulele</SelectItem>
                        <SelectItem value="drums">Drums</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="default-tuning">Default Tuning</Label>
                    <Select
                      value={settings.defaultTuning}
                      onValueChange={(value) => setSettings({ ...settings, defaultTuning: value })}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="drop-d">Drop D</SelectItem>
                        <SelectItem value="open-g">Open G</SelectItem>
                        <SelectItem value="dadgad">DADGAD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="theme">Theme</Label>
                    <Select
                      value={settings.theme}
                      onValueChange={(value) => setSettings({ ...settings, theme: value })}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="language">Language</Label>
                    <Select
                      value={settings.language}
                      onValueChange={(value) => setSettings({ ...settings, language: value })}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>

              {/* Account Settings */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Account & Security
                </h3>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Lock className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="h-4 w-4 mr-2" />
                    Update Email
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Smartphone className="h-4 w-4 mr-2" />
                    Two-Factor Authentication
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Download My Data
                  </Button>
                </div>
              </Card>

              {/* Billing Settings */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Billing & Subscription
                </h3>
                <div className="space-y-4">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-green-800">TabSync Pro</p>
                        <p className="text-sm text-green-600">$5.00/month • Next billing: Jan 15, 2025</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full justify-start">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Update Payment Method
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Download Invoices
                  </Button>
                  <Button variant="destructive" className="w-full justify-start">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Cancel Subscription
                  </Button>
                </div>
              </Card>
            </div>

            <div className="mt-6">
              <Button onClick={handleSettingsUpdate} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </Button>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold">Recent Notifications</h3>
                <Button variant="outline" size="sm" onClick={markAllAsRead}>
                  Mark All as Read
                </Button>
              </div>

              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      notification.read ? "bg-gray-50" : "bg-blue-50 border-blue-200"
                    }`}
                    onClick={() => markNotificationAsRead(notification.id)}
                  >
                    <div className="flex items-start gap-3">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1">
                        <p className={`text-sm ${notification.read ? "text-gray-600" : "text-gray-900 font-medium"}`}>
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                      {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                    </div>
                  </div>
                ))}
              </div>

              {notifications.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No notifications yet</p>
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Stats Tab */}
          <TabsContent value="stats">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <Card className="p-6 text-center">
                <Music className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold">{stats.songsLearned}</div>
                <div className="text-sm text-gray-600">Songs Learned</div>
              </Card>
              <Card className="p-6 text-center">
                <Clock className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold">{stats.practiceHours}h</div>
                <div className="text-sm text-gray-600">Practice Time</div>
              </Card>
              <Card className="p-6 text-center">
                <Share2 className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold">{stats.tabsShared}</div>
                <div className="text-sm text-gray-600">Tabs Shared</div>
              </Card>
              <Card className="p-6 text-center">
                <Heart className="h-8 w-8 mx-auto mb-2 text-red-600" />
                <div className="text-2xl font-bold">{stats.favoriteCount}</div>
                <div className="text-sm text-gray-600">Favorites</div>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Practice Streak</h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-600 mb-2">7</div>
                  <div className="text-sm text-gray-600">Days in a row</div>
                  <div className="mt-4 text-xs text-gray-500">Keep it up! You're on fire 🔥</div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-4">Recent Achievements</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <div>
                      <div className="text-sm font-medium">First Week Complete</div>
                      <div className="text-xs text-gray-500">Practiced for 7 days straight</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Music className="h-5 w-5 text-purple-500" />
                    <div>
                      <div className="text-sm font-medium">Song Master</div>
                      <div className="text-xs text-gray-500">Learned 10 songs</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Heart className="h-5 w-5 text-red-500" />
                    <div>
                      <div className="text-sm font-medium">Community Favorite</div>
                      <div className="text-xs text-gray-500">Received 50 likes</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
