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

    // PATCH /orders/cancel
    if (req.method === 'PATCH' && segment === 'cancel') {
      const { id, reason } = await req.json();
      const { data, error: err } = await supabase
        .from('orders')
        .update({ status: 'cancelled', cancellation_reason: reason, updated_at: new Date().toISOString() })
        .eq('id', id)
        .eq('user_id', user.id)
        .in('status', ['pending', 'confirmed'])
        .select()
        .single();
      if (err) return error(err.message);
      return ok(data);
    }

    // GET /orders/:id
    if (req.method === 'GET' && segment) {
      const { data, error: err } = await supabase
        .from('orders')
        .select('*, items:order_items(*, medicine:medicines(*))')
        .eq('id', segment)
        .eq('user_id', user.id)
        .single();
      if (err) return error(err.message, 404);
      return ok(data);
    }

    // GET /orders
    if (req.method === 'GET') {
      const page = parseInt(url.searchParams.get('page') ?? '1');
      const limit = parseInt(url.searchParams.get('limit') ?? '10');
      const offset = (page - 1) * limit;

      const { data, error: err, count } = await supabase
        .from('orders')
        .select('*, items:order_items(*, medicine:medicines(name, image_url))', { count: 'exact' })
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (err) return error(err.message);
      return ok({ data, total: count ?? 0, page, limit });
    }

    // POST /orders  (create order)
    if (req.method === 'POST') {
      const { items, address_id, payment_method, coupon_code, prescription_id } = await req.json();

      // Fetch medicines to compute pricing
      const medicineIds = items.map((i: { medicine_id: string }) => i.medicine_id);
      const { data: medicines, error: medErr } = await supabase
        .from('medicines')
        .select('id, price, discounted_price, prescription_required, in_stock')
        .in('id', medicineIds);

      if (medErr) return error(medErr.message);

      // Validate stock & prescription
      for (const item of items) {
        const med = medicines?.find((m: { id: string }) => m.id === item.medicine_id);
        if (\!med) return error(`Medicine ${item.medicine_id} not found`, 404);
        if (\!med.in_stock) return error(`${item.medicine_id} is out of stock`);
        if (med.prescription_required && \!prescription_id)
          return error('Prescription required for one or more medicines');
      }

      // Compute totals
      const orderItems = items.map((item: { medicine_id: string; quantity: number }) => {
        const med = medicines\!.find((m: { id: string }) => m.id === item.medicine_id)\!;
        return {
          medicine_id: item.medicine_id,
          quantity: item.quantity,
          unit_price: med.discounted_price,
          total_price: med.discounted_price * item.quantity,
        };
      });

      const subtotal = orderItems.reduce(
        (s: number, i: { total_price: number }) => s + i.total_price, 0
      );
      const delivery_fee = subtotal >= 500 ? 0 : 50;
      const total = subtotal + delivery_fee;

      // Insert order
      const { data: order, error: orderErr } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          address_id,
          status: 'pending',
          payment_method,
          payment_status: 'pending',
          subtotal,
          discount: 0,
          delivery_fee,
          total,
          prescription_id,
        })
        .select()
        .single();

      if (orderErr) return error(orderErr.message);

      // Insert order items
      const { error: itemsErr } = await supabase
        .from('order_items')
        .insert(orderItems.map((i: object) => ({ ...i, order_id: order.id })));

      if (itemsErr) return error(itemsErr.message);

      return created(order);
    }

    return error('Method not allowed', 405);
  } catch (e: unknown) {
    const msg = (e as Error).message;
    if (msg === 'Unauthorized') return unauthorized();
    return error(msg, 500);
  }
});
