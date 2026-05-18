import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Product, CartItem } from '../types';

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  checkoutDialogOpen: boolean;
  setCheckoutDialogOpen: (open: boolean) => void;
  itemToRemove: number | null;
  setItemToRemove: (id: number | null) => void;
  addToCart: (product: Product) => void;
  handleQuantityChange: (productId: number, quantity: number) => void;
  confirmRemoveItem: () => void;
  cancelRemoveItem: () => void;
  attemptCheckout: () => void;
  confirmCheckout: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children, addToast }: { children: ReactNode, addToast: (msg: string) => void }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutDialogOpen, setCheckoutDialogOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<number | null>(null);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(item => item.product.id === product.id);
      if (existingItemIndex !== -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex] = {
          ...newCart[existingItemIndex],
          quantity: newCart[existingItemIndex].quantity + 1
        };
        return newCart;
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
    addToast(`已加入購物車: ${product.name}`);
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setItemToRemove(productId);
      return;
    }
    setCart(prevCart => {
      const newCart = [...prevCart];
      const index = newCart.findIndex(item => item.product.id === productId);
      if (index !== -1) {
        newCart[index] = {
          ...newCart[index],
          quantity: newQuantity
        };
      }
      return newCart;
    });
  };

  const confirmRemoveItem = () => {
    if (itemToRemove !== null) {
      setCart(prev => prev.filter(item => item.product.id !== itemToRemove));
      setItemToRemove(null);
    }
  };

  const cancelRemoveItem = () => {
    setItemToRemove(null);
  };

  const attemptCheckout = () => {
    if (cart.length === 0) {
      alert('購物車是空的！');
      return;
    }
    setCheckoutDialogOpen(true);
  };

  const confirmCheckout = () => {
    setCart([]);
    setIsCartOpen(false);
    setCheckoutDialogOpen(false);
    addToast('結帳成功！感謝您的購買。');
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cart, isCartOpen, setIsCartOpen, checkoutDialogOpen, setCheckoutDialogOpen,
      itemToRemove, setItemToRemove, addToCart, handleQuantityChange,
      confirmRemoveItem, cancelRemoveItem, attemptCheckout, confirmCheckout,
      totalItems, totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
