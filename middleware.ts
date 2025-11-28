// middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const PUBLIC_FILE = /\.(.*)$/
const SUPPORTED = ["en", "ar", "tr"] as const
type Lang = (typeof SUPPORTED)[number]

function pickLang(req: NextRequest): Lang {
  const cookie = req.cookies.get("NEXT_LOCALE")?.value as Lang | undefined
  if (cookie && SUPPORTED.includes(cookie)) return cookie
  const header = req.headers.get("accept-language") || ""
  for (const lang of header.split(",").map(s => s.split(";")[0].slice(0,2))) {
    if (SUPPORTED.includes(lang as Lang)) return lang as Lang
  }
  return "en"
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (PUBLIC_FILE.test(pathname) || pathname.startsWith("/_next") || pathname.startsWith("/api")) {
    return NextResponse.next()
  }

  if (SUPPORTED.some(l => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) {
    return NextResponse.next()
  }

  const lang = pickLang(req)
  const url = req.nextUrl.clone()
  url.pathname = `/${lang}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ["/((?!_next|.*\\..*|api).*)"],
}
