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
    const segment = pathParts[1];

    // GET /prescriptions/:id
    if (req.method === 'GET' && segment) {
      const { data, error: err } = await supabase
        .from('prescriptions')
        .select('*')
        .eq('id', segment)
        .eq('user_id', user.id)
        .single();
      if (err) return error(err.message, 404);
      return ok(data);
    }

    // GET /prescriptions
    if (req.method === 'GET') {
      const page = parseInt(url.searchParams.get('page') ?? '1');
      const limit = parseInt(url.searchParams.get('limit') ?? '10');
      const offset = (page - 1) * limit;

      const { data, error: err, count } = await supabase
        .from('prescriptions')
        .select('*', { count: 'exact' })
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);
      if (err) return error(err.message);
      return ok({ data, total: count ?? 0, page, limit });
    }

    // POST /prescriptions
    if (req.method === 'POST') {
      const { image_url, file_path } = await req.json();
      const { data, error: err } = await supabase
        .from('prescriptions')
        .insert({ user_id: user.id, image_url, file_path, status: 'pending_review' })
        .select()
        .single();
      if (err) return error(err.message);
      return created(data);
    }

    // DELETE /prescriptions
    if (req.method === 'DELETE') {
      const { id } = await req.json();
      const { data: presc } = await supabase
        .from('prescriptions')
        .select('file_path')
        .eq('id', id)
        .eq('user_id', user.id)
        .single();

      if (presc?.file_path) {
        await supabase.storage.from('prescriptions').remove([presc.file_path]);
      }

      const { error: err } = await supabase
        .from('prescriptions')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);
      if (err) return error(err.message);
      return ok({ success: true });
    }

    return error('Method not allowed', 405);
  } catch (e: unknown) {
    const msg = (e as Error).message;
    if (msg === 'Unauthorized') return unauthorized();
    return error(msg, 500);
  }
});
