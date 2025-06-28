
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SelectedProduct {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  brand?: string;
  price: number;
  unit: string;
  description: string;
  inStock: boolean;
  promotion?: number;
  isPopular?: boolean;
  quantity: number;
}

interface ProductContextType {
  selectedProducts: SelectedProduct[];
  addProduct: (product: Omit<SelectedProduct, 'quantity'>) => void;
  removeProduct: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearProducts: () => void;
  getTotalPrice: () => number;
  getTotalQuantity: () => number;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);

  const addProduct = (product: Omit<SelectedProduct, 'quantity'>) => {
    setSelectedProducts(prev => {
      const existingProduct = prev.find(p => p.id === product.id);
      if (existingProduct) {
        return prev.map(p =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const removeProduct = (productId: string) => {
    setSelectedProducts(prev => {
      const existingProduct = prev.find(p => p.id === productId);
      if (existingProduct && existingProduct.quantity > 1) {
        return prev.map(p =>
          p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
        );
      } else {
        return prev.filter(p => p.id !== productId);
      }
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setSelectedProducts(prev => prev.filter(p => p.id !== productId));
    } else {
      setSelectedProducts(prev =>
        prev.map(p => p.id === productId ? { ...p, quantity } : p)
      );
    }
  };

  const clearProducts = () => {
    setSelectedProducts([]);
  };

  const getTotalPrice = () => {
    return selectedProducts.reduce((total, product) => {
      const price = product.promotion 
        ? product.price * (1 - product.promotion / 100)
        : product.price;
      return total + (price * product.quantity);
    }, 0);
  };

  const getTotalQuantity = () => {
    return selectedProducts.reduce((total, product) => total + product.quantity, 0);
  };

  const value: ProductContextType = {
    selectedProducts,
    addProduct,
    removeProduct,
    updateQuantity,
    clearProducts,
    getTotalPrice,
    getTotalQuantity,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};
