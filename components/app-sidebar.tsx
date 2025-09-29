"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Home,
  Settings,
  User,
  MessageSquare,
  Users,
  ChevronDown,
  ChevronRight,
  Palette,
} from "lucide-react"
import { useState } from "react"

// Discussion items with avatars and names
const discussions = [
  {
    id: 1,
    name: "Alice Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    initials: "AJ",
  },
  {
    id: 2,
    name: "Bob Smith",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    initials: "BS",
  },
  {
    id: 3,
    name: "Carol Williams",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    initials: "CW",
  },
  {
    id: 4,
    name: "David Brown",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    initials: "DB",
  },
]

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Messages",
    url: "/messages",
    icon: MessageSquare,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

// Background options for chat customization
const backgroundOptions = [
  { id: "default", name: "Default", color: "bg-background" },
  { id: "gradient1", name: "Sunset", color: "bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600" },
  { id: "gradient2", name: "Ocean", color: "bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-600" },
  { id: "gradient3", name: "Forest", color: "bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600" },
  { id: "gradient4", name: "Galaxy", color: "bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900" },
  { id: "gradient5", name: "Warm", color: "bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500" },
  { id: "solid1", name: "Light Blue", color: "bg-blue-50 dark:bg-blue-950" },
  { id: "solid2", name: "Light Green", color: "bg-green-50 dark:bg-green-950" },
  { id: "solid3", name: "Light Purple", color: "bg-purple-50 dark:bg-purple-950" },
]

export function AppSidebar({ onUserSelect, onBackgroundChange }: {
  onUserSelect: (user: any) => void;
  onBackgroundChange?: (background: string) => void;
}) {
  const [isDiscussionsOpen, setIsDiscussionsOpen] = useState(false)
  const [isBackgroundOpen, setIsBackgroundOpen] = useState(false)
  const [selectedDiscussion, setSelectedDiscussion] = useState(1)
  const [selectedBackground, setSelectedBackground] = useState("default")

  const handleBackgroundSelect = (backgroundId: string) => {
    setSelectedBackground(backgroundId)
    onBackgroundChange?.(backgroundId)
  }

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <div className="flex items-center justify-between px-2 py-2">
          <div className="flex items-center gap-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <MessageSquare className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">Chat App</span>
              <span className="truncate text-xs">Your conversations</span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Discussions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenuButton
              className="w-full justify-between"
              onClick={() => setIsDiscussionsOpen(!isDiscussionsOpen)}
            >
              <div className="flex items-center gap-2">
                <Users className="size-4" />
                <span>Discussions</span>
              </div>
              {isDiscussionsOpen ? (
                <ChevronDown className="size-4" />
              ) : (
                <ChevronRight className="size-4" />
              )}
            </SidebarMenuButton>

            {isDiscussionsOpen && (
              <div className="mt-2 space-y-1 discussions-container max-h-48 overflow-y-auto">
                {discussions.map((discussion) => (
                  <div
                    key={discussion.id}
                    className={`flex items-center gap-2 px-2 py-1 rounded-md cursor-pointer hover:bg-accent transition-colors ${
                      selectedDiscussion === discussion.id ? 'bg-accent' : ''
                    }`}
                    onClick={() => {
                      setSelectedDiscussion(discussion.id);
                      onUserSelect({
                        name: discussion.name,
                        avatar: discussion.avatar,
                        status: "Online",
                        isOnline: true,
                      });
                    }}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={discussion.avatar} alt={discussion.name} />
                      <AvatarFallback className="text-xs">{discussion.initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{discussion.name}</span>
                  </div>
                ))}
              </div>
            )}
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Background</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenuButton
              className="w-full justify-between"
              onClick={() => setIsBackgroundOpen(!isBackgroundOpen)}
            >
              <div className="flex items-center gap-2">
                <Palette className="size-4" />
                <span>Chat Background</span>
              </div>
              {isBackgroundOpen ? (
                <ChevronDown className="size-4" />
              ) : (
                <ChevronRight className="size-4" />
              )}
            </SidebarMenuButton>

            {isBackgroundOpen && (
              <div className="mt-2 space-y-1 discussions-container max-h-48 overflow-y-auto">
                {backgroundOptions.map((bg) => (
                  <div
                    key={bg.id}
                    className={`flex items-center gap-2 px-2 py-1 rounded-md cursor-pointer hover:bg-accent transition-colors ${
                      selectedBackground === bg.id ? 'bg-accent' : ''
                    }`}
                    onClick={() => handleBackgroundSelect(bg.id)}
                  >
                    <div className={`w-4 h-4 rounded ${bg.color}`} />
                    <span className="text-sm">{bg.name}</span>
                  </div>
                ))}
              </div>
            )}
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-2 p-2">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face" alt="Current User" />
                <AvatarFallback className="text-xs">YU</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></div>
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">You</span>
              <span className="truncate text-xs text-muted-foreground">Online</span>
            </div>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
