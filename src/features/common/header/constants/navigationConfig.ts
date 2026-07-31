/**
 * Navigation Configuration.
 * Defines the navigation items and their properties for the sidebar menu.
 */
import { 
  LayoutDashboard, BookOpen, CalendarDays, ClipboardEdit, 
  Award, Users, MessageSquare, Bell, Video, Shield, UserCog, Key
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
    id: "instructor-directory",
    translationKey: "MENU_INSTRUCTOR_DIRECTORY",
    icon: Users,
  },
  {
    id: "role",
    translationKey: "MENU_ROLES",
    icon: Shield,
  },
  {
    id: "user",
    translationKey: "MENU_USERS",
    icon: UserCog,
  },
  {
    id: "permission",
    translationKey: "MENU_PERMISSIONS",
    icon: Key,
  },
];
