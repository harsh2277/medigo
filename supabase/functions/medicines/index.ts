import { handleCors, corsHeaders } from '../_shared/cors.ts';
import { requireAuth } from '../_shared/auth.ts';
import { ok, error, unauthorized } from '../_shared/response.ts';

Deno.serve(async (req: Request) => {
  const cors = handleCors(req);
  if (cors) return cors;

  try {
    const { user, supabase } = await requireAuth(req);
    const url = new URL(req.url);
    const pathParts = url.pathname.split('/').filter(Boolean);
    // pathParts: ['medicines'] or ['medicines', 'categories'] or ['medicines', ':id']

    const segment = pathParts[1]; // after 'medicines'

    // GET /medicines/categories
    if (req.method === 'GET' && segment === 'categories') {
      const { data, error: err } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      if (err) return error(err.message);
      return ok(data);
    }

    // GET /medicines/featured
    if (req.method === 'GET' && segment === 'featured') {
      const { data, error: err } = await supabase
        .from('medicines')
        .select('*, category:categories(*)')
        .eq('is_featured', true)
        .eq('in_stock', true)
        .limit(10);
      if (err) return error(err.message);
      return ok(data);
    }

    // GET /medicines/:id
    if (req.method === 'GET' && segment && segment \!== 'categories' && segment \!== 'featured') {
      const { data, error: err } = await supabase
        .from('medicines')
        .select('*, category:categories(*)')
        .eq('id', segment)
        .single();
      if (err) return error(err.message, 404);
      return ok(data);
    }

    // GET /medicines  (list with filters)
    if (req.method === 'GET') {
      const search = url.searchParams.get('search');
      const categoryId = url.searchParams.get('category_id');
      const inStock = url.searchParams.get('in_stock');
      const prescriptionRequired = url.searchParams.get('prescription_required');
      const minPrice = url.searchParams.get('min_price');
      const maxPrice = url.searchParams.get('max_price');
      const page = parseInt(url.searchParams.get('page') ?? '1');
      const limit = parseInt(url.searchParams.get('limit') ?? '20');
      const offset = (page - 1) * limit;

      let query = supabase
        .from('medicines')
        .select('*, category:categories(*)', { count: 'exact' });

      if (search) query = query.ilike('name', `%${search}%`);
      if (categoryId) query = query.eq('category_id', categoryId);
      if (inStock \!== null) query = query.eq('in_stock', inStock === 'true');
      if (prescriptionRequired \!== null)
        query = query.eq('prescription_required', prescriptionRequired === 'true');
      if (minPrice) query = query.gte('discounted_price', parseFloat(minPrice));
      if (maxPrice) query = query.lte('discounted_price', parseFloat(maxPrice));

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
