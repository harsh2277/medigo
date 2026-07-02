import { api } from './client';
import { supabase } from '../services/supabase';
import type { Prescription } from '../types';

export const prescriptionsApi = {
  list: (page = 1, limit = 10) =>
    api.get<{ data: Prescription[]; total: number }>('prescriptions', { page, limit }),

  getById: (id: string) =>
    api.get<Prescription>(`prescriptions/${id}`),

  upload: async (uri: string, fileName: string): Promise<Prescription> => {
    // 1. Upload image to Supabase Storage
    const response = await fetch(uri);
    const blob = await response.blob();
    const filePath = `prescriptions/${Date.now()}_${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('prescriptions')
      .upload(filePath, blob, { contentType: 'image/jpeg' });

    if (uploadError) throw new Error(uploadError.message);

    const { data: urlData } = supabase.storage
      .from('prescriptions')
      .getPublicUrl(filePath);

    // 2. Create prescription record via Edge Function
    const result = await api.post<Prescription>('prescriptions', {
      image_url: urlData.publicUrl,
      file_path: filePath,
    });

    return result.data;
  },

  delete: (id: string) =>
    api.delete<{ success: boolean }>('prescriptions', { id }),
};
