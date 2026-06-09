import { createContext } from 'react';

export interface CartContextValue {
  itemCount: number;
  openCart: () => void;
}

export const CartContext = createContext<CartContextValue>({
  itemCount: 0,
  openCart: () => {},
});
