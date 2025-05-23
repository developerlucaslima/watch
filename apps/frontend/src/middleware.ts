import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '@constants/routes'
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('access_token')?.value
  console.log('Token middleware:', token)

  const isPrivateRoutes = PRIVATE_ROUTES.some((path) =>
    pathname.startsWith(path),
  )
  const isPublicOnlyRoutes = PUBLIC_ROUTES.some((path) =>
    pathname.startsWith(path),
  )

  if (isPublicOnlyRoutes && token) {
    const url = new URL('/videos', request.url)
    return NextResponse.redirect(url)
  }

  if (isPrivateRoutes && !token) {
    const url = new URL('/sign-in', request.url)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
