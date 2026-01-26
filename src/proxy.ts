import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/infrastructure/auth/jwt';

const PUBLIC_PATHS = ['/login', '/setup-account', '/accept-invitation', '/api/auth/login', '/api/setup-account'];

export default async function (request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Check for token in cookies
  const token = request.cookies.get('accessToken')?.value;
  const isPublicPath = PUBLIC_PATHS.some(path => pathname.startsWith(path));

  // 2. Fetch user session
  const decoded = token ? await verifyToken(token) : null;

  // 3. Authenticated user checks
  if (decoded) {
    // 3a. Prevent Role-Bypass (Example: Dashboard Admin protection)
    if (pathname.startsWith('/dashboard/admin') && decoded.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // 3b. Authenticated user on a public PAGE -> Redirect to dashboard
    if (isPublicPath && !pathname.startsWith('/api') && request.method === 'GET') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // 4. Unauthenticated user on a private path -> Redirect to login
  if (!decoded && !isPublicPath) {
    if (pathname.startsWith('/api')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 5. Allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
