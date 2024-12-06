import next from "next";
import { NextResponse, type NextRequest } from "next/server";

import { getCurrentUserData } from "./server/auth/get-me";
import { toast } from "sonner";

const protectedRoutes = ["/profile", "/dashboard"];
const guideOnlyRoutes = ["/dashboard/calendar"];
export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get("host");
  const searchParams = request.nextUrl.searchParams.toString();
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

  if (guideOnlyRoutes.some((route) => url.pathname.startsWith(route))) {
    const currentUser = request.cookies.get("jwt")?.value;

    const user = await getCurrentUserData();

    if (!user || !currentUser || user.userType !== "merchant") {
      toast.error("You need to login first to access this page.");
      return NextResponse.redirect(new URL(`/`, request.url));
    } else if (user.userType !== "merchant") {
      toast.error("Your roles are not enough to access this page");
      return NextResponse.redirect(new URL(`/`, request.url));
    }
  }

  const allowedDomains = ["localhost:3000", "vercel.app"];

  // checking if the request is coming from allowed domain or not
  const isAllowedDomain = allowedDomains.some((domain) =>
    hostname?.includes(domain),
  );
}

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
