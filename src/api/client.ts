import { supabase } from '../services/supabase';
import { ApiResponse } from '../types';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface InvokeOptions {
  method?: HttpMethod;
  body?: Record<string, unknown>;
  query?: Record<string, string | number | boolean>;
}

/**
 * Calls a Supabase Edge Function (serverless API).
 * All business logic lives in the Edge Function on Supabase's infrastructure —
 * the client never talks to the database directly.
 */
export async function invoke<T>(
  functionName: string,
  options: InvokeOptions = {}
): Promise<ApiResponse<T>> {
  const { method = 'POST', body, query } = options;

  // Append query params to function name when needed (GET requests)
  let fn = functionName;
  if (query && Object.keys(query).length > 0) {
    const params = new URLSearchParams(
      Object.entries(query).reduce((acc, [k, v]) => ({ ...acc, [k]: String(v) }), {})
    ).toString();
    fn = `${functionName}?${params}`;
  }

  const { data, error } = await supabase.functions.invoke<ApiResponse<T>>(fn, {
    method,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (error) {
    throw new Error(error.message || 'An unexpected error occurred');
  }

  if (!data) {
    throw new Error('Empty response from server');
  }

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
}

/** Convenience wrappers */
export const api = {
  get: <T>(fn: string, query?: InvokeOptions['query']) =>
    invoke<T>(fn, { method: 'GET', query }),

  post: <T>(fn: string, body?: Record<string, unknown>) =>
    invoke<T>(fn, { method: 'POST', body }),

  put: <T>(fn: string, body?: Record<string, unknown>) =>
    invoke<T>(fn, { method: 'PUT', body }),

  patch: <T>(fn: string, body?: Record<string, unknown>) =>
    invoke<T>(fn, { method: 'PATCH', body }),

  delete: <T>(fn: string, body?: Record<string, unknown>) =>
    invoke<T>(fn, { method: 'DELETE', body }),
};
