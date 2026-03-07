// src/contexts/CartContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface CartItem {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  size: string; // This corresponds to the "1G", "2G" selection
  purity: string;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: any, quantityIndex: number, amount: number, bulkPricing: any[]) => void;
  removeFromCart: (id: number, size: string) => void;
  updateQuantity: (id: number, size: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  // Load cart from local storage on start
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // Save to local storage whenever items change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: any, quantityIndex: number, amount: number, bulkPricing: any[]) => {
    const selectedTier = bulkPricing[quantityIndex];
    // Calculate price per unit for this specific bulk tier
    const pricePerUnit = (product.price * selectedTier.multiplier); 

    const newItem: CartItem = {
      id: product.id,
      name: product.name,
      category: product.category,
      price: pricePerUnit, 
      quantity: amount,
      size: selectedTier.quantity, // e.g., "1G"
      purity: product.purity,
      image: product.image,
    };

    setItems((prevItems) => {
      // Check if same product with same size already exists
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === newItem.id && item.size === newItem.size
      );

      if (existingItemIndex > -1) {
        // Update quantity if exists
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += amount;
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, newItem];
      }
    });

    toast({
      title: "Added to Cart",
      description: `${amount}x ${product.name} (${selectedTier.quantity}) added to your cart.`,
    });
  };

  const removeFromCart = (id: number, size: string) => {
    setItems((prev) => prev.filter((item) => !(item.id === id && item.size === size)));
  };

  const updateQuantity = (id: number, size: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id && item.size === size) {
          return { ...item, quantity: Math.max(1, item.quantity + delta) };
        }
        return item;
      })
    );
  };

  const clearCart = () => setItems([]);

  const cartTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
