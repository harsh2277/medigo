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
    const segment = pathParts[1]; // bookings | book | cancel | :id

    // GET /lab-tests/bookings
    if (req.method === 'GET' && segment === 'bookings') {
      const subSegment = pathParts[2]; // :booking_id
      if (subSegment) {
        const { data, error: err } = await supabase
          .from('lab_test_bookings')
          .select('*, test:lab_tests(*)')
          .eq('id', subSegment)
          .eq('user_id', user.id)
          .single();
        if (err) return error(err.message, 404);
        return ok(data);
      }

      const page = parseInt(url.searchParams.get('page') ?? '1');
      const limit = parseInt(url.searchParams.get('limit') ?? '10');
      const offset = (page - 1) * limit;

      const { data, error: err, count } = await supabase
        .from('lab_test_bookings')
        .select('*, test:lab_tests(name, category)', { count: 'exact' })
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);
      if (err) return error(err.message);
      return ok({ data, total: count ?? 0, page, limit });
    }

    // POST /lab-tests/book
    if (req.method === 'POST' && segment === 'book') {
      const { test_id, collection_date, collection_slot, address_id, payment_method } = await req.json();

      const { data: test, error: testErr } = await supabase
        .from('lab_tests')
        .select('discounted_price')
        .eq('id', test_id)
        .single();
      if (testErr || \!test) return error('Lab test not found', 404);

      const { data, error: err } = await supabase
        .from('lab_test_bookings')
        .insert({
          user_id: user.id,
          test_id,
          status: 'booked',
          collection_date,
          collection_slot,
          address_id,
          payment_method,
          fee: test.discounted_price,
          payment_status: 'pending',
        })
        .select('*, test:lab_tests(*)')
        .single();

      if (err) return error(err.message);
      return created(data);
    }

    // PATCH /lab-tests/cancel
    if (req.method === 'PATCH' && segment === 'cancel') {
      const { id } = await req.json();
      const { data, error: err } = await supabase
        .from('lab_test_bookings')
        .update({ status: 'cancelled' })
        .eq('id', id)
        .eq('user_id', user.id)
        .in('status', ['booked'])
        .select()
        .single();
      if (err) return error(err.message);
      return ok(data);
    }

    // GET /lab-tests/:id
    if (req.method === 'GET' && segment) {
      const { data, error: err } = await supabase
        .from('lab_tests')
        .select('*')
        .eq('id', segment)
        .single();
      if (err) return error(err.message, 404);
      return ok(data);
    }

    // GET /lab-tests (list)
    if (req.method === 'GET') {
      const category = url.searchParams.get('category');
      const page = parseInt(url.searchParams.get('page') ?? '1');
      const limit = parseInt(url.searchParams.get('limit') ?? '20');
      const offset = (page - 1) * limit;

      let query = supabase.from('lab_tests').select('*', { count: 'exact' });
      if (category) query = query.eq('category', category);

      const { data, error: err, count } = await query
        .order('name')
        .range(offset, offset + limit - 1);
      if (err) return error(err.message);
      return ok({ data, total: count ?? 0, page, limit });
    }

    return error('Method not allowed', 405);
  } catch (e: unknown) {
    const msg = (e as Error).message;
    if (msg === 'Unauthorized') return unauthorized();
    return error(msg, 500);
  }
});
