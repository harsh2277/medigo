import { useCartStore } from '../store/cartStore';

export const useCart = () => {
  const store = useCartStore();
  return {
    items: store.items,
    totalItems: store.totalItems(),
    totalPrice: store.totalPrice(),
    isInCart: store.isInCart,
    getQuantity: store.getQuantity,
    addItem: store.addItem,
    removeItem: store.removeItem,
    updateQuantity: store.updateQuantity,
    clearCart: store.clearCart,
  };
};
