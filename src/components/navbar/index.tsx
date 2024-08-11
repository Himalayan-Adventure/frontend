import Image from "next/image";
import Logo from "../logo";
import Link from "next/link";
import { InfoBar } from "./info-bar";
export const Navbar = () => {
  const navLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Packages",
      href: "/packages",
    },
    {
      name: "About Us",
      href: "/about-us",
    },
    {
      name: "Blog",
      href: "/blog",
    },
    {
      name: "Services",
      href: "/services",
    },
    {
      name: "Shop",
      href: "/shop",
    },
    {
      name: "Our Team",
      href: "/our-team",
    },
  ];
  return (
    <div className="sticky top-0 bg-black py-2.5">
      <div className="container flex flex-col">
        <InfoBar />
        <nav className="flex gap-x-4 text-white">
          {navLinks.map((navLink) => (
            <Link key={`nav-link-${navLink.name}`} href={navLink.href}>
              {navLink.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};
