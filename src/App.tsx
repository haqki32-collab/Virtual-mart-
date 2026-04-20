/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import CheckoutForm from './components/CheckoutForm';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import MenuDrawer from './components/MenuDrawer';
import ProductDetailView from './components/ProductDetailView';
import { PRODUCTS } from './constants';
import { CartItem, Product } from './types';
import { motion, AnimatePresence } from 'motion/react';

import PolicyView from './components/PolicyView';

export default function App() {
  const [view, setView] = useState<'home' | 'checkout' | 'terms' | 'privacy' | 'refunds' | 'product-detail'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Clear cart when returning from WhatsApp checkout
  const handleOrderConfirmed = () => {
    setCartItems([]);
    setView('home');
    window.scrollTo(0, 0);
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeOneFromCart = (productId: string) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing && existing.quantity > 1) {
        return prev.map(item => 
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prev.filter(item => item.id !== productId);
    });
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(item => item.quantity > 0);
    });
  };

  const removeItemCompletely = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  if (view === 'terms' || view === 'privacy' || view === 'refunds') {
    return (
      <PolicyView 
        type={view} 
        onBack={() => setView('home')} 
      />
    );
  }

  if (view === 'checkout') {
    return (
      <CheckoutForm 
        onBack={() => setView('home')} 
        cartItems={cartItems}
        onConfirmed={handleOrderConfirmed}
      />
    );
  }

  if (view === 'product-detail' && selectedProduct) {
    return (
      <ProductDetailView 
        product={selectedProduct}
        quantityInCart={cartItems.find(i => i.id === selectedProduct.id)?.quantity || 0}
        onBack={() => setView('home')}
        onAddToCart={addToCart}
        onRemoveFromCart={removeOneFromCart}
        onOrderNow={() => {
          if (!cartItems.find(i => i.id === selectedProduct.id)) {
            addToCart(selectedProduct);
          }
          setView('checkout');
          window.scrollTo(0, 0);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header 
        cartCount={cartItems.reduce((sum, i) => sum + i.quantity, 0)}
        onCartClick={() => setCartOpen(true)}
        onMenuClick={() => setMenuOpen(true)}
        onSearchChange={setSearchQuery}
        onNavigate={setView}
      />

      <main className="pt-2 space-y-0">
        <CategoryFilter 
          selectedCategory={selectedCategory} 
          onSelect={setSelectedCategory} 
        />

        <section className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-2">
          <div className="flex items-center justify-between mb-2 px-2">
            <h2 className="text-sm md:text-base font-black text-gray-900 font-display flex items-center gap-1.5">
              <span role="img" aria-label="fire">🔥</span> Featured Listings
            </h2>
            <button className="text-[10px] font-bold text-gray-400 hover:text-green-600 transition-colors uppercase tracking-wider">See All</button>
          </div>

          {searchQuery && (
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-400">
                Results for "{searchQuery}"
              </h3>
            </div>
          )}

          {filteredProducts.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    quantityInCart={cartItems.find(i => i.id === product.id)?.quantity || 0}
                    onAdd={addToCart}
                    onRemove={removeOneFromCart}
                    onClick={(p) => {
                      setSelectedProduct(p);
                      setView('product-detail');
                      window.scrollTo(0, 0);
                    }}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-[2rem] border border-dashed border-gray-200">
              <p className="text-gray-500 font-bold mb-4">No products found.</p>
              <button 
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                className="text-green-600 font-black uppercase text-xs tracking-widest hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer onNavigate={setView} />
      
      <FloatingWhatsApp />

      <MenuDrawer 
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigate={(newView) => {
          setMenuOpen(false);
          setView(newView);
          window.scrollTo(0, 0);
        }}
      />
      
      <CartDrawer 
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeItemCompletely}
        onCheckout={() => {
          setCartOpen(false);
          setView('checkout');
          window.scrollTo(0, 0);
        }}
      />
    </div>
  );
}
