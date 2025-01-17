import { HandHelping, Home, Info, Newspaper, Package, ShoppingCart, Trees, Users } from "lucide-react";

export const navLinks = [
  {
    name: "Home",
    href: "/home",
    icon: <Home className="size-6" />,
  },
  {
    name: "Packages",
    href: "/packages",
    icon: <Package className="size-6" />,
  },

  {
    name: "Projects",
    href: "/projects",
    icon: <Trees className="size-6" />,
  },
  {
    name: "About Us",
    href: "/about-us",
    icon:<Info className="size-6" />,
  },
  {
    name: "Blog",
    href: "/blog",
    icon:<Newspaper className="size-6" />,
  },
  {
    name: "Services",
    href: "/services",
    icon:<HandHelping className="size-6" />,
  },
  {
    name: "Shop",
    href: "/shop",
    icon:<ShoppingCart className="size-6" />,
  },
  {
    name: "Our Team",
    href: "/our-team",
    icon:<Users className="size-6" />,
  },
];
