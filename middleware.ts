import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const PROTECTED = ['/dashboard', '/profile', '/favorites'];
const AUTH_ONLY = ['/auth/login', '/auth/register'];

export async function middleware(req: NextRequest) {
  const res = NextResponse.next({ request: req });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get:    (n) => req.cookies.get(n)?.value,
        set:    (n, v, o) => { req.cookies.set(n, v); res.cookies.set(n, v, o); },
        remove: (n, o)    => { req.cookies.set(n, ''); res.cookies.set(n, '', o); },
      },
    },
  );

  const { data: { session } } = await supabase.auth.getSession();
  const { pathname } = req.nextUrl;

  if (PROTECTED.some(p => pathname.startsWith(p)) && !session) {
    const url = req.nextUrl.clone();
    url.pathname = '/auth/login';
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  if (AUTH_ONLY.some(p => pathname.startsWith(p)) && session) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/).*)'],
};
