// src/middleware.js
import { NextResponse } from 'next/server'

export function middleware(req) {
  const cookie = req.cookies.get('__session')?.value

  if (!cookie) {
    const loginUrl = req.nextUrl.clone()
    loginUrl.pathname = '/login'
    loginUrl.searchParams.set('from', req.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard',
    '/profile',
    '/internships',
    '/find-internships',
    '/internship/:path*',
    '/applications',
  ],
}
