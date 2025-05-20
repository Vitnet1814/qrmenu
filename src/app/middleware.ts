// middleware.ts
import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

export async function middleware() {
  // Тут можна додати логіку middleware, наприклад, перевірку авторизації.  middleware(request: NextRequest) {
  // const token = request.cookies.get('authToken');
  // if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
  //   return NextResponse.redirect(new URL('/auth/login', request.url));
  // }
  return NextResponse.next();
}

// Конфігурація для middleware, щоб вказати, для яких роутів він буде запускатися
export const config = {
  matcher: '/dashboard/:path*',
};