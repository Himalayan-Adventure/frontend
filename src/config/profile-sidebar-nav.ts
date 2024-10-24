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
  //  icon: React.FC;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string;
};
export const navigations: TNavigation[] = [
  {
    name: "Profile",
    href: "/profile/profile",
    icon: CircleUser,
  },

  {
    name: "Blog",
    href: "/profile/blog",
    icon: Pencil,
  },

  {
    name: "Work",
    href: "/profile/work",
    icon: GitPullRequest,
  },
  {
    name: "Services",
    href: "/profile/services",
    icon: Workflow,
  },

  // {
  //   name: "Appointments",
  //   href: "/profile/appointments",
  //   icon: HandHelping,
  // },
  // {
  //   name: "Calendar",
  //   href: "/profile/calendar",
  //   icon: CalendarX,
  // },
];
