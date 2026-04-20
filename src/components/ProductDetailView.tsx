/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowLeft, ShoppingBag, Truck, ShieldCheck, Clock, Plus, Minus } from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../lib/utils';
import { motion } from 'motion/react';

interface ProductDetailViewProps {
  product: Product;
  quantityInCart: number;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
  onRemoveFromCart: (productId: string) => void;
  onOrderNow: () => void;
}

export default function ProductDetailView({ 
  product, 
  quantityInCart, 
  onBack, 
  onAddToCart, 
  onRemoveFromCart,
  onOrderNow
}: ProductDetailViewProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 h-12 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="p-1.5 hover:bg-gray-100 rounded-full transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:-translate-x-1 transition-transform" />
        </button>
        <span className="font-black text-gray-900 uppercase tracking-widest text-[10px]">Product Details</span>
        <div className="w-8" />
      </header>

      <main className="max-w-4xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-square rounded-[1.5rem] overflow-hidden bg-gray-50 border border-gray-100"
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Info Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="mb-4">
              <span className="inline-block px-2 py-0.5 bg-green-50 text-green-600 text-[9px] font-black uppercase tracking-widest rounded-full mb-2">
                {product.category}
              </span>
              <h1 className="text-xl md:text-2xl font-black text-gray-900 mb-1 leading-tight">
                {product.name}
              </h1>
              <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">
                {product.unit} pack
              </p>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl md:text-3xl font-black text-green-600 font-display">
                  {formatPrice(product.price)}
                </span>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Description</h3>
                <p className="text-gray-600 leading-snug text-xs font-medium">
                  {product.description || 'Quality product sourced carefully for your daily needs. Fresh and authentic guaranteed.'}
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-1.5">
                <TrustBadge icon={<Truck className="w-3.5 h-3.5" />} label="Fast Delivery" />
                <TrustBadge icon={<ShieldCheck className="w-3.5 h-3.5" />} label="Pure Quality" />
                <TrustBadge icon={<Clock className="w-3.5 h-3.5" />} label="30 Min" />
              </div>
            </div>

            {/* Actions */}
            <div className="mt-auto space-y-2">
              <div className="flex items-center gap-2">
                {quantityInCart > 0 ? (
                  <div className="flex-1 flex items-center justify-between bg-gray-100 rounded-xl p-1 h-12">
                    <button 
                      onClick={() => onRemoveFromCart(product.id)}
                      className="w-10 h-full flex items-center justify-center bg-white rounded-lg shadow-sm hover:text-red-500 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-black text-base text-gray-900">{quantityInCart}</span>
                    <button 
                      onClick={() => onAddToCart(product)}
                      className="w-10 h-full flex items-center justify-center bg-white rounded-lg shadow-sm hover:text-green-600 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => onAddToCart(product)}
                    className="flex-1 h-12 flex items-center justify-center gap-2 bg-white border-2 border-green-600 text-green-600 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-green-50 transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart
                  </button>
                )}
              </div>
              
              <button 
                onClick={onOrderNow}
                className="w-full h-14 bg-green-600 text-white rounded-xl font-black uppercase text-sm tracking-[0.15em] shadow-lg shadow-green-100 hover:bg-green-700 transition-all active:scale-[0.98]"
              >
                Order Now
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

function TrustBadge({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 p-3 bg-white border border-gray-100 rounded-2xl text-center">
      <div className="text-green-600">{icon}</div>
      <span className="text-[9px] font-black text-gray-400 uppercase leading-tight">{label}</span>
    </div>
  );
}
