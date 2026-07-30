/**
 * Navigation Configuration.
 * Defines the navigation items and their properties for the sidebar menu.
 */
import { 
  LayoutDashboard, BookOpen, CalendarDays, ClipboardEdit, 
  Award, Users, MessageSquare, Bell, Video 
} from "lucide-react";

export type NavigationItem = {
  id: string;
  translationKey: keyof typeof import("./index").HEADER_STRINGS.en;
  icon: React.ElementType;
  badge?: string;
  hasRedDot?: boolean;
};

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: "dashboard",
    translationKey: "MENU_DASHBOARD",
    icon: LayoutDashboard,
  },
  {
    id: "courses",
    translationKey: "MENU_COURSES",
    icon: BookOpen,
    badge: "2",
  },
  {
    id: "routine",
    translationKey: "MENU_ROUTINE",
    icon: CalendarDays,
  },
  {
    id: "exam",
    translationKey: "MENU_EXAM",
    icon: ClipboardEdit,
  },
  {
    id: "results",
    translationKey: "MENU_RESULTS",
    icon: Award,
  },
  {
    id: "students",
    translationKey: "MENU_STUDENTS",
    icon: Users,
  },
  {
    id: "message",
    translationKey: "MENU_MESSAGE",
    icon: MessageSquare,
  },
  {
    id: "notice-board",
    translationKey: "MENU_NOTICE_BOARD",
    icon: Bell,
  },
  {
    id: "live-class",
    translationKey: "MENU_LIVE_CLASS",
    icon: Video,
    hasRedDot: true,
  },
];
