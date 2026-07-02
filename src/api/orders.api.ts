import { api } from './client';
import type { Order, CreateOrderPayload, Address } from '../types';

export const ordersApi = {
  create: (payload: CreateOrderPayload) =>
    api.post<Order>('orders', payload as unknown as Record<string, unknown>),

  list: (page = 1, limit = 10) =>
    api.get<{ data: Order[]; total: number }>('orders', { page, limit }),

  getById: (id: string) =>
    api.get<Order>(`orders/${id}`),

  cancel: (id: string, reason?: string) =>
    api.patch<Order>('orders/cancel', { id, reason }),

  // Addresses
  getAddresses: () =>
    api.get<Address[]>('profile/addresses'),

  createAddress: (address: Omit<Address, 'id' | 'user_id'>) =>
    api.post<Address>('profile/addresses', address as unknown as Record<string, unknown>),

  updateAddress: (id: string, address: Partial<Omit<Address, 'id' | 'user_id'>>) =>
    api.patch<Address>('profile/addresses', { id, ...address }),

  deleteAddress: (id: string) =>
    api.delete<{ success: boolean }>('profile/addresses', { id }),

  setDefaultAddress: (id: string) =>
    api.patch<Address>('profile/addresses/default', { id }),
};
