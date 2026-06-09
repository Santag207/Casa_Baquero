import type { ReactNode } from 'react';
import { CartContext } from './CartContextValue';

export function CartProvider({ children }: { children: ReactNode }) {
  return (
    <CartContext.Provider value={{ itemCount: 0, openCart: () => {} }}>
      {children}
    </CartContext.Provider>
  );
}
