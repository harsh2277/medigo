export type LabTestStatus = 'booked' | 'sample_collected' | 'processing' | 'report_ready' | 'cancelled';

export interface LabTest {
  id: string;
  name: string;
  description?: string;
  price: number;
  discount_percent: number;
  discounted_price: number;
  category: string;
  turnaround_hours: number; // hours to get report
  sample_type: string; // blood, urine, etc.
  fasting_required: boolean;
  home_collection: boolean;
  image_url?: string;
}

export interface LabTestBooking {
  id: string;
  user_id: string;
  test_id: string;
  test?: LabTest;
  status: LabTestStatus;
  collection_date: string;
  collection_slot: string;
  address_id?: string;
  address?: import('./order.types').Address;
  sample_collected_at?: string;
  report_url?: string;
  report_ready_at?: string;
  fee: number;
  payment_status: 'pending' | 'paid' | 'refunded';
  created_at: string;
}

export interface BookLabTestPayload {
  test_id: string;
  collection_date: string;
  collection_slot: string;
  address_id?: string;
  payment_method: string;
}
