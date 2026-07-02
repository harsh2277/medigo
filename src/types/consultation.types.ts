export type ConsultationStatus = 'scheduled' | 'ongoing' | 'completed' | 'cancelled';

export interface Doctor {
  id: string;
  full_name: string;
  specialization: string;
  qualification: string;
  experience_years: number;
  avatar_url?: string;
  rating: number;
  review_count: number;
  consultation_fee: number;
  languages: string[];
  available_slots?: TimeSlot[];
}

export interface TimeSlot {
  id: string;
  doctor_id: string;
  date: string; // ISO date string
  start_time: string;
  end_time: string;
  is_available: boolean;
}

export interface Consultation {
  id: string;
  user_id: string;
  doctor_id: string;
  doctor?: Doctor;
  slot_id: string;
  slot?: TimeSlot;
  status: ConsultationStatus;
  symptoms?: string;
  notes?: string;
  prescription_id?: string;
  session_url?: string;
  fee: number;
  payment_status: 'pending' | 'paid' | 'refunded';
  created_at: string;
}

export interface BookConsultationPayload {
  doctor_id: string;
  slot_id: string;
  symptoms?: string;
  payment_method: string;
}
