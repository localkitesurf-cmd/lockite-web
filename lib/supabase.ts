'use client';
import { createBrowserClient } from '@supabase/ssr';

let _browser: ReturnType<typeof createBrowserClient> | null = null;

export function supabaseBrowser() {
  if (_browser) return _browser;
  _browser = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  return _browser;
}

export async function getSession() {
  const sb = supabaseBrowser();
  const { data: { session } } = await sb.auth.getSession();
  return session;
}
