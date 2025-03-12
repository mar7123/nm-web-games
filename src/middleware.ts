import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const apiRegex = /^\/api(?:\/.*)?$/;
  if (apiRegex.test(url.pathname)) {
    return NextResponse.next();
  }
  if (
    url.pathname.includes("/flutter_service_worker") ||
    request.headers.get("Referer")?.includes("flutter_service_worker") ||
    url.pathname.startsWith("/assets")
  ) {
    url.pathname = "/app" + url.pathname;
    return NextResponse.rewrite(url);
  }
  const fileRegex = /\.[a-zA-Z0-9]+$/;
  if (!fileRegex.test(url.pathname)) {
    url.pathname = "/";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
