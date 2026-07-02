import { create } from 'zustand';
import type { CartItem, Medicine } from '../types';

interface CartStore {
  items: CartItem[];

  // Computed
  totalItems: () => number;
  totalPrice: () => number;
  isInCart: (medicine_id: string) => boolean;
  getQuantity: (medicine_id: string) => number;

  // Actions
  addItem: (medicine: Medicine, quantity?: number) => void;
  removeItem: (medicine_id: string) => void;
  updateQuantity: (medicine_id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  totalItems: () =>
    get().items.reduce((sum, item) => sum + item.quantity, 0),

  totalPrice: () =>
    get().items.reduce(
      (sum, item) => sum + item.medicine.discounted_price * item.quantity,
      0
    ),

  isInCart: (medicine_id) =>
    get().items.some((item) => item.medicine_id === medicine_id),

  getQuantity: (medicine_id) =>
    get().items.find((item) => item.medicine_id === medicine_id)?.quantity ?? 0,

  addItem: (medicine, quantity = 1) => {
    set((state) => {
      const existing = state.items.find((i) => i.medicine_id === medicine.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.medicine_id === medicine.id
              ? { ...i, quantity: i.quantity + quantity }
              : i
          ),
        };
      }
      return {
        items: [...state.items, { medicine_id: medicine.id, medicine, quantity }],
      };
    });
  },

  removeItem: (medicine_id) =>
    set((state) => ({
      items: state.items.filter((i) => i.medicine_id !== medicine_id),
    })),

  updateQuantity: (medicine_id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(medicine_id);
      return;
    }
    set((state) => ({
      items: state.items.map((i) =>
        i.medicine_id === medicine_id ? { ...i, quantity } : i
      ),
    }));
  },

  clearCart: () => set({ items: [] }),
}));
