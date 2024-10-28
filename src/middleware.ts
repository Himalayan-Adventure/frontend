import next from "next";
import { NextResponse, type NextRequest } from "next/server";

import { getCurrentUserData } from "./server/auth/get-me";
import { toast } from "sonner";

const protectedRoutes = ["/profile"];

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get("host");
  const searchParams = request.nextUrl.searchParams.toString();
  // Appending the whole pathname & searchParams . Eg: /news/this-is-a-slug?tag=popular
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;

  // If the pathname is in the protectedRoutes array, then we check if the user is logged in or not. If not, then we redirect to /login
  if (protectedRoutes.some((route) => url.pathname.startsWith(route))) {
    const currentUser = request.cookies.get("jwt")?.value;

    const user = await getCurrentUserData();

    if (!user || !currentUser) {
      toast.error("You need to login first to access this page.");
      return NextResponse.redirect(new URL(`/`, request.url));
    }
  }

  const allowedDomains = ["localhost:3000", "vercel.app"];

  // checking if the request is coming from allowed domain or not
  const isAllowedDomain = allowedDomains.some((domain) =>
    hostname?.includes(domain),
  );
}

//   // taking the first word of hostname . Eg: if hostname is news.nepsetrading.com, then we take only the 'news' from it.
//   const subdomain = hostname?.split(".")[0];

//   // Everything added here is dynamic. Like, lets say we need a subdomain for route /blog. If we were to add 'blog' here, then we it would show blogs on blog.nepsetrading.com. We can add another object here as well.
//   const subdomains = [{ subdomain: "news" }, { subdomain: "charts" }];

//   if (isAllowedDomain && !subdomains?.some((d) => d.subdomain === subdomain)) {
//     return NextResponse.next();
//   }

//   // Grabbing the subdomain . for eg: news
//   const subdomainData = subdomains.find((d) => d.subdomain === subdomain);

//   if (subdomainData) {
//     // Rewrite the URL in the dynamic route based in the subdomain
//     return NextResponse.rewrite(new URL(`/${subdomain}${path}`, request.url));
//   }

//   return new Response(null, { status: 404 });
// }

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
