import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      items: [],

      addItem: (dish) =>
        set((state) => {
          const found = state.items.find((item) => item.id === dish.id);

          if (found) {
            return {
              items: state.items.map((item) =>
                item.id === dish.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          return { items: [...state.items, { ...dish, quantity: 1 }] };
        }),

      remove: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      decrease: (id) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.id === id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),

      clear: () => set({ items: [] }),
    }),
    { name: "addis-eats-cart" }
  )
);
