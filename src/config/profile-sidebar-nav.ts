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
  merchantOnly?: boolean;
  customerOnly?: boolean;
};
export const navigations: TNavigation[] = [
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: CircleUser,
  },

  {
    name: "Blog",
    href: "/dashboard/blog",
    icon: Pencil,
  },

  {
    name: "Work",
    href: "/dashboard/work",
    icon: GitPullRequest,
  },
  {
    name: "Services",
    href: "/dashboard/services",
    icon: Workflow,
    merchantOnly:true,
  },

  {
    name: "Services",
    href: "/dashboard/services-requested",
    icon: Workflow,
    customerOnly:true,
  },

  {
    name: "Appointments",
    href: "/dashboard/appointments",
    icon: HandHelping,
  },
  {
    name: "Calendar",
    href: "/dashboard/calendar",
    icon: CalendarX,
    merchantOnly: true,
  },
];
