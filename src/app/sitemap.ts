import { siteConfig } from "@/config/site-config";

export default async function sitemap() {
  // For static routes, we can manually define them
  const staticRoutes = [
    "/home",
    "/packages",
    "/projects",
    "/dashboard",
    "/about-us",
    "/blog",
    "/services",
    "/my-cart",
    "/shop",
    "/terms-and-conditions",
    "/visa-info",
    "/profile",
    "/faq",
    "/gears-and-equipments",
    "/privacy-policy",
    "/mountaineering-royalty",
    "/open-peak-for-climbing",
    "/plan-with-us",
    "/our-team",
    "/travel-insurance",
    "/trekking-permit-fee",
  ].map((route) => ({
    url: `${siteConfig.siteUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...staticRoutes];
}
