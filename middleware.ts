import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // 관리자 페이지 보호
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // 실제 운영에서는 더 강력한 인증 로직 필요
    const isAuthenticated = request.cookies.get("admin_authenticated")

    if (!isAuthenticated && !request.nextUrl.pathname.includes("/admin/login")) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  // 보안 헤더 추가
  const response = NextResponse.next()
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("Referrer-Policy", "origin-when-cross-origin")

  return response
}

export const config = {
  matcher: ["/admin/:path*", "/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
