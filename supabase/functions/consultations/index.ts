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
    const segment = pathParts[1]; // doctors | slots | book | cancel | :id

    // GET /consultations/doctors
    if (req.method === 'GET' && segment === 'doctors') {
      const spec = url.searchParams.get('specialization');
      const page = parseInt(url.searchParams.get('page') ?? '1');
      const limit = parseInt(url.searchParams.get('limit') ?? '20');
      const offset = (page - 1) * limit;

      let query = supabase
        .from('doctors')
        .select('*', { count: 'exact' });
      if (spec) query = query.eq('specialization', spec);

      const { data, error: err, count } = await query
        .order('rating', { ascending: false })
        .range(offset, offset + limit - 1);
      if (err) return error(err.message);
      return ok({ data, total: count ?? 0, page, limit });
    }

    // GET /consultations/slots
    if (req.method === 'GET' && segment === 'slots') {
      const doctor_id = url.searchParams.get('doctor_id');
      const date = url.searchParams.get('date');
      if (\!doctor_id || \!date) return error('doctor_id and date required');

      const { data, error: err } = await supabase
        .from('time_slots')
        .select('*')
        .eq('doctor_id', doctor_id)
        .eq('date', date)
        .eq('is_available', true)
        .order('start_time');
      if (err) return error(err.message);
      return ok(data);
    }

    // POST /consultations/book
    if (req.method === 'POST' && segment === 'book') {
      const { doctor_id, slot_id, symptoms, payment_method } = await req.json();

      // Fetch slot & doctor
      const { data: slot, error: slotErr } = await supabase
        .from('time_slots')
        .select('*, doctor:doctors(consultation_fee)')
        .eq('id', slot_id)
        .eq('is_available', true)
        .single();
      if (slotErr || \!slot) return error('Slot not available', 400);

      // Mark slot unavailable
      await supabase
        .from('time_slots')
        .update({ is_available: false })
        .eq('id', slot_id);

      // Create consultation
      const { data, error: err } = await supabase
        .from('consultations')
        .insert({
          user_id: user.id,
          doctor_id,
          slot_id,
          status: 'scheduled',
          symptoms,
          fee: slot.doctor.consultation_fee,
          payment_method,
          payment_status: 'pending',
        })
        .select('*, doctor:doctors(*), slot:time_slots(*)')
        .single();

      if (err) return error(err.message);
      return created(data);
    }

    // PATCH /consultations/cancel
    if (req.method === 'PATCH' && segment === 'cancel') {
      const { id } = await req.json();
      const { data, error: err } = await supabase
        .from('consultations')
        .update({ status: 'cancelled' })
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();
      if (err) return error(err.message);

      // Release the slot back
      if (data?.slot_id) {
        await supabase
          .from('time_slots')
          .update({ is_available: true })
          .eq('id', data.slot_id);
      }
      return ok(data);
    }

    // GET /consultations/:id
    if (req.method === 'GET' && segment && \!['doctors', 'slots', 'book', 'cancel'].includes(segment)) {
      const { data, error: err } = await supabase
        .from('consultations')
        .select('*, doctor:doctors(*), slot:time_slots(*)')
        .eq('id', segment)
        .eq('user_id', user.id)
        .single();
      if (err) return error(err.message, 404);
      return ok(data);
    }

    // GET /consultations
    if (req.method === 'GET') {
      const page = parseInt(url.searchParams.get('page') ?? '1');
      const limit = parseInt(url.searchParams.get('limit') ?? '10');
      const offset = (page - 1) * limit;

      const { data, error: err, count } = await supabase
        .from('consultations')
        .select('*, doctor:doctors(full_name, specialization, avatar_url), slot:time_slots(date, start_time)', { count: 'exact' })
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
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
