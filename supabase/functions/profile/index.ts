import { handleCors } from '../_shared/cors.ts';
import { requireAuth } from '../_shared/auth.ts';
import { ok, created, error, unauthorized } from '../_shared/response.ts';

Deno.serve(async (req: Request) => {
  const cors = handleCors(req);
  if (cors) return cors;

  try {
    const { user, supabase } = await requireAuth(req);
    const url = new URL(req.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const segment = pathParts[1]; // addresses

    // ── Addresses ──────────────────────────────────────────────────────────────
    if (segment === 'addresses') {
      const subSegment = pathParts[2]; // default

      if (req.method === 'GET') {
        const { data, error: err } = await supabase
          .from('addresses')
          .select('*')
          .eq('user_id', user.id)
          .order('is_default', { ascending: false });
        if (err) return error(err.message);
        return ok(data);
      }

      if (req.method === 'POST') {
        const body = await req.json();
        const { data, error: err } = await supabase
          .from('addresses')
          .insert({ ...body, user_id: user.id })
          .select()
          .single();
        if (err) return error(err.message);
        return created(data);
      }

      if (req.method === 'PATCH' && subSegment === 'default') {
        const { id } = await req.json();
        // Clear existing defaults then set new
        await supabase.from('addresses').update({ is_default: false }).eq('user_id', user.id);
        const { data, error: err } = await supabase
          .from('addresses')
          .update({ is_default: true })
          .eq('id', id)
          .eq('user_id', user.id)
          .select()
          .single();
        if (err) return error(err.message);
        return ok(data);
      }

      if (req.method === 'PATCH') {
        const { id, ...fields } = await req.json();
        const { data, error: err } = await supabase
          .from('addresses')
          .update(fields)
          .eq('id', id)
          .eq('user_id', user.id)
          .select()
          .single();
        if (err) return error(err.message);
        return ok(data);
      }

      if (req.method === 'DELETE') {
        const { id } = await req.json();
        const { error: err } = await supabase
          .from('addresses')
          .delete()
          .eq('id', id)
          .eq('user_id', user.id);
        if (err) return error(err.message);
        return ok({ success: true });
      }
    }

    // ── Profile ────────────────────────────────────────────────────────────────
    if (req.method === 'GET') {
      const { data, error: err } = await supabase
        .from('profiles')
        .select('*, addresses(*)')
        .eq('user_id', user.id)
        .single();
      if (err) return error(err.message);
      return ok(data);
    }

    if (req.method === 'PATCH') {
      const body = await req.json();
      const { data, error: err } = await supabase
        .from('profiles')
        .update({ ...body, updated_at: new Date().toISOString() })
        .eq('user_id', user.id)
        .select()
        .single();
      if (err) return error(err.message);
      return ok(data);
    }

    return error('Method not allowed', 405);
  } catch (e: unknown) {
    const msg = (e as Error).message;
    if (msg === 'Unauthorized') return unauthorized();
    return error(msg, 500);
  }
});
