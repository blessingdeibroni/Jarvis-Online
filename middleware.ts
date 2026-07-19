import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("jarvis_auth");
  const correctPassword = process.env.SITE_PASSWORD;

  // Already authenticated — let them through
  if (authCookie?.value === correctPassword) {
    return NextResponse.next();
  }

  // Not authenticated — redirect to /login
  const loginUrl = new URL("/login", request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
    matcher: [
      "/((?!login|api/login|api/token|_next/static|_next/image|favicon.ico).*)",
    ],
  };