// @ts-nocheck
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

export function createSupabaseClient(req: Request) {
  const authHeader = req.headers.get('Authorization');
  return createClient(
    Deno.env.get('SUPABASE_URL'),
    Deno.env.get('SUPABASE_ANON_KEY'),
    {
      global: { headers: { Authorization: authHeader ?? '' } },
    }
  );
}

export function createAdminClient() {
  return createClient(
    Deno.env.get('SUPABASE_URL'),
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  );
}

export async function requireAuth(req: Request) {
  const supabase = createSupabaseClient(req);
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || user) {
    throw new Error('Unauthorized');
  }
  return { user, supabase };
}
