import { api } from './client';
import { supabase } from '../services/supabase';
import type { UserProfile } from '../types';

export const profileApi = {
  get: () =>
    api.get<UserProfile>('profile'),

  update: (payload: Partial<Omit<UserProfile, 'id' | 'user_id' | 'addresses'>>) =>
    api.patch<UserProfile>('profile', payload as Record<string, unknown>),

  uploadAvatar: async (uri: string): Promise<string> => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const filePath = `avatars/${Date.now()}.jpg`;

    const { error } = await supabase.storage
      .from('avatars')
      .upload(filePath, blob, { upsert: true, contentType: 'image/jpeg' });

    if (error) throw new Error(error.message);

    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
    return data.publicUrl;
  },
};
