/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '../types';

// Savatchani boshqarish uchun Zustand do'koni
interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      // Savatdagi mahsulotlar ro'yxati
      items: [],

      // Mahsulot qo'shish (agar allaqachon mavjud bo'lsa, sonini oshirish)
      addItem: (product: Product, quantity = 1) => {
        const { items } = get();
        const existingItem = items.find((item) => item.product.id === product.id);

        if (existingItem) {
          // Mavjud bo'lsa, sonini yangilaymiz
          set({
            items: items.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          // Yangi bo'lsa, qo'shamiz
          set({ items: [...items, { product, quantity }] });
        }
      },

      // Mahsulotni savatdan o'chirish
      removeItem: (productId: number) => {
        const { items } = get();
        set({
          items: items.filter((item) => item.product.id !== productId),
        });
      },

      // Mahsulot miqdorini yangilash
      updateQuantity: (productId: number, quantity: number) => {
        const { items } = get();
        if (quantity <= 0) {
          // Agar soni 0 yoki undan kam bo'lsa, savatdan o'chiramiz
          set({
            items: items.filter((item) => item.product.id !== productId),
          });
          return;
        }

        set({
          items: items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        });
      },

      // Savatni to'liq tozalash
      clearCart: () => set({ items: [] }),

      // Umumiy narxni hisoblash
      getTotalPrice: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          // Chegirmali narxni hisobga olsak ham osonroq bo'ladi
          const price = item.product.price;
          return total + price * item.quantity;
        }, 0);
      },

      // Savatdagi barcha mahsulotlar sonini hisoblash
      getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      // LocalStorage kalit nomi
      name: 'shopping-cart-storage',
    }
  )
);
