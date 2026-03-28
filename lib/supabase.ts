// ── Browser client (Client Components) ───────────────────────
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

// ── Server client (Server Components, Route Handlers, Actions) ─
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function supabaseServer() {
  const store = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get:    (n) => store.get(n)?.value,
        set:    (n, v, o) => { try { store.set(n, v, o); } catch {} },
        remove: (n, o)    => { try { store.set(n, '', o); } catch {} },
      },
    },
  );
}

// ── Get current session (server-side) ─────────────────────────
export async function getSession() {
  const sb = supabaseServer();
  const { data: { session } } = await sb.auth.getSession();
  return session;
}
