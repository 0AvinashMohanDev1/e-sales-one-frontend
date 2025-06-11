import { create } from "zustand";

type CartItem = {
  _id: string;
  title: string;
  image: string;
  price: number;
  currency: string;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
};

type CartStore = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (_id: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  cartItems: [],
  addToCart: (item) =>
    set((state) => {
      const existing = state.cartItems.find(
        (p) =>
          p._id === item._id &&
          p.selectedColor === item.selectedColor &&
          p.selectedSize === item.selectedSize
      );

      if (existing) {
        return {
          cartItems: state.cartItems.map((p) =>
            p._id === item._id &&
            p.selectedColor === item.selectedColor &&
            p.selectedSize === item.selectedSize
              ? { ...p, quantity: p.quantity + item.quantity }
              : p
          ),
        };
      }

      return {
        cartItems: [...state.cartItems, item],
      };
    }),
  removeFromCart: (_id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item._id !== _id),
    })),
  clearCart: () => set({ cartItems: [] }),
}));
