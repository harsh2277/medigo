import { handleCors } from '../_shared/cors.ts';
import { requireAuth } from '../_shared/auth.ts';
import { ok, error, unauthorized } from '../_shared/response.ts';

Deno.serve(async (req: Request) => {
  const cors = handleCors(req);
  if (cors) return cors;

  try {
    const { user, supabase } = await requireAuth(req);
    const url = new URL(req.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    const segment = pathParts[1]; // read | read-all

    // PATCH /notifications/read-all
    if (req.method === 'PATCH' && segment === 'read-all') {
      const { error: err } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('user_id', user.id)
        .eq('read', false);
      if (err) return error(err.message);
      return ok({ success: true });
    }

    // PATCH /notifications/read
    if (req.method === 'PATCH' && segment === 'read') {
      const { id } = await req.json();
      const { data, error: err } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();
      if (err) return error(err.message);
      return ok(data);
    }

    // DELETE /notifications
    if (req.method === 'DELETE') {
      const { id } = await req.json();
      const { error: err } = await supabase
        .from('notifications')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);
      if (err) return error(err.message);
      return ok({ success: true });
    }

    // GET /notifications
    if (req.method === 'GET') {
      const page = parseInt(url.searchParams.get('page') ?? '1');
      const limit = parseInt(url.searchParams.get('limit') ?? '20');
      const offset = (page - 1) * limit;

      const [listResult, countResult] = await Promise.all([
        supabase
          .from('notifications')
          .select('*', { count: 'exact' })
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .range(offset, offset + limit - 1),
        supabase
          .from('notifications')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .eq('read', false),
      ]);

      if (listResult.error) return error(listResult.error.message);
      return ok({
        data: listResult.data,
        total: listResult.count ?? 0,
        page,
        limit,
        unread_count: countResult.count ?? 0,
      });
    }

    return error('Method not allowed', 405);
  } catch (e: unknown) {
    const msg = (e as Error).message;
    if (msg === 'Unauthorized') return unauthorized();
    return error(msg, 500);
  }
});
