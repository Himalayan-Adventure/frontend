import {
  CalendarX,
  Cctv,
  CircleUser,
  Edit,
  GitPullRequest,
  HandHelping,
  LogOut,
  Pencil,
  Plus,
  User,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export type TNavigation = {
  name: string;
  icon: React.FC;
  href: string;
};
export const navigations: TNavigation[] = [
  {
    name: "Profile",
    href: "/profile",
    icon: CircleUser,
  },

  {
    name: "Blog",
    href: "/profile/blog",
    icon: Pencil,
  },
  {
    name: "Services",
    href: "/profile/services",
    icon: Workflow,
  },

  {
    name: "Appointments",
    href: "/profile/appointments",
    icon: HandHelping,
  },
  {
    name: "Work",
    href: "/profile/work",
    icon: GitPullRequest,
  },
  {
    name: "Calendar",
    href: "/profile/calendar",
    icon: CalendarX,
  },
];
