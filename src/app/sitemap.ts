import { siteConfig } from "@/config/site-config";
import type { MetadataRoute } from "next";
export default async function sitemap() {
  // For static routes, we can manually define them
  const staticRoutes = [
    "/home",
    "/packages",
    "/projects",
    "/about-us",
    "/blog",
    "/services",
    "/my-cart",
    "/profile",
    "/plan-with-us",
    "/our-team",
    "/dashboard",
    "/shop",
    "/terms-and-conditions",
    "/visa-info",
    "/faq",
    "/gears-and-equipments",
    "/privacy-policy",
    "/mountaineering-royalty",
    "/open-peak-for-climbing",
    "/travel-insurance",
    "/trekking-permit-fee",
  ].map((route) => ({
    url: `${siteConfig.siteUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...staticRoutes];
}
