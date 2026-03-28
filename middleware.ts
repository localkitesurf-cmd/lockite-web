import createMiddleware from 'next-intl/middleware';
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { locales, defaultLocale } from './i18n';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localeDetection: true, // auto-detect from browser
});

const PROTECTED = ['/dashboard', '/profile', '/favorites'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Let next-intl handle locale routing first
  const intlResponse = intlMiddleware(req);

  // Auth guard for protected routes (check after locale prefix)
  const pathWithoutLocale = pathname.replace(/^\/(de|en|fr|es|nl)/, '') || '/';
  const isProtected = PROTECTED.some(p => pathWithoutLocale.startsWith(p));

  if (isProtected) {
    const res = NextResponse.next({ request: req });
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get:    (name: string) => req.cookies.get(name)?.value,
          set:    (name: string, value: string, options: any) => { req.cookies.set(name, value); res.cookies.set(name, value, options); },
          remove: (name: string, options: any) => { req.cookies.set(name, ''); res.cookies.set(name, '', options); },
        },
      },
    );
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      const url = req.nextUrl.clone();
      url.pathname = `/${defaultLocale}/auth/login`;
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }
  }

  return intlResponse;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/).*)'],
};
