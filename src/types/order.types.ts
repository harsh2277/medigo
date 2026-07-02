export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'returned';

export interface OrderItem {
  id: string;
  order_id: string;
  medicine_id: string;
  medicine?: import('./medicine.types').Medicine;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface Address {
  id: string;
  user_id: string;
  label: string; // Home, Work, Other
  full_name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  is_default: boolean;
}

export interface Order {
  id: string;
  user_id: string;
  items: OrderItem[];
  status: OrderStatus;
  address: Address;
  subtotal: number;
  discount: number;
  delivery_fee: number;
  total: number;
  payment_method: string;
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  prescription_id?: string;
  estimated_delivery?: string;
  delivered_at?: string;
  tracking_url?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateOrderPayload {
  items: { medicine_id: string; quantity: number }[];
  address_id: string;
  payment_method: string;
  coupon_code?: string;
  prescription_id?: string;
}

export interface CartItem {
  medicine_id: string;
  medicine: import('./medicine.types').Medicine;
  quantity: number;
}
