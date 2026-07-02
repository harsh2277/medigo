import { corsHeaders } from './cors.ts';

export function ok<T>(data: T, message?: string): Response {
  return new Response(JSON.stringify({ data, message }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

export function created<T>(data: T): Response {
  return new Response(JSON.stringify({ data }), {
    status: 201,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

export function error(message: string, status = 400): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

export function unauthorized(): Response {
  return error('Unauthorized', 401);
}
