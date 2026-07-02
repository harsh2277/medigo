export * from './auth.types';
export * from './medicine.types';
export * from './order.types';
export * from './consultation.types';
export * from './labtest.types';

export interface Prescription {
  id: string;
  user_id: string;
  image_url: string;
  doctor_name?: string;
  issued_date?: string;
  expiry_date?: string;
  status: 'pending_review' | 'approved' | 'rejected' | 'expired';
  notes?: string;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  body: string;
  type: 'order' | 'consultation' | 'lab_test' | 'promotion' | 'system';
  data?: Record<string, unknown>;
  read: boolean;
  created_at: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone?: string;
  date_of_birth?: string;
  gender?: 'male' | 'female' | 'other';
  avatar_url?: string;
  addresses: import('./order.types').Address[];
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}
