import { supabase } from '../services/supabase';
import type { LoginPayload, RegisterPayload, ForgotPasswordPayload, Session } from '../types';

/** Auth uses Supabase Auth directly (not Edge Functions) for security */
export const authApi = {
  signIn: async (payload: LoginPayload): Promise<Session> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: payload.email,
      password: payload.password,
    });
    if (error) throw new Error(error.message);
    return data.session as unknown as Session;
  },

  signUp: async (payload: RegisterPayload): Promise<Session> => {
    const { data, error } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
      options: {
        data: { full_name: payload.full_name, phone: payload.phone },
      },
    });
    if (error) throw new Error(error.message);
    return data.session as unknown as Session;
  },

  signOut: async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  },

  forgotPassword: async (payload: ForgotPasswordPayload): Promise<void> => {
    const { error } = await supabase.auth.resetPasswordForEmail(payload.email);
    if (error) throw new Error(error.message);
  },

  getSession: async (): Promise<Session | null> => {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw new Error(error.message);
    return data.session as unknown as Session | null;
  },

  onAuthStateChange: (callback: (session: Session | null) => void) => {
    return supabase.auth.onAuthStateChange((_event, session) => {
      callback(session as unknown as Session | null);
    });
  },
};
