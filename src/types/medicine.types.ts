export interface Medicine {
  id: string;
  name: string;
  generic_name: string;
  brand: string;
  category_id: string;
  category?: Category;
  description: string;
  price: number;
  discount_percent: number;
  discounted_price: number;
  image_url?: string;
  manufacturer: string;
  composition: string;
  dosage_form: string; // tablet, syrup, injection, etc.
  pack_size: string;
  prescription_required: boolean;
  in_stock: boolean;
  stock_quantity: number;
  rating: number;
  review_count: number;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  icon_url?: string;
  slug: string;
}

export interface MedicineFilters {
  category_id?: string;
  search?: string;
  prescription_required?: boolean;
  min_price?: number;
  max_price?: number;
  in_stock?: boolean;
  page?: number;
  limit?: number;
}

export interface MedicinesResponse {
  data: Medicine[];
  total: number;
  page: number;
  limit: number;
}
