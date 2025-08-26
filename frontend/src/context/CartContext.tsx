import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

interface CartItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  totalAmount: number;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => void;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

const API_URL = 'http://localhost:5000/api';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user, token } = useAuth();

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    if (user && token) {
      fetchCart();
    } else {
      setItems([]);
      setTotalAmount(0);
    }
  }, [user, token]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/cart`);
      setItems(response.data.items || []);
      setTotalAmount(response.data.totalAmount || 0);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: string, quantity = 1) => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/cart`, {
        productId,
        quantity,
      });
      setItems(response.data.items);
      setTotalAmount(response.data.totalAmount);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to add to cart');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      setLoading(true);
      const response = await axios.put(`${API_URL}/cart/${itemId}`, {
        quantity,
      });
      setItems(response.data.items);
      setTotalAmount(response.data.totalAmount);
    } catch (error) {
      console.error('Error updating cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      setLoading(true);
      const response = await axios.delete(`${API_URL}/cart/${itemId}`);
      setItems(response.data.items);
      setTotalAmount(response.data.totalAmount);
    } catch (error) {
      console.error('Error removing from cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = () => {
    setItems([]);
    setTotalAmount(0);
  };

  const value = {
    items,
    itemCount,
    totalAmount,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    loading,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};