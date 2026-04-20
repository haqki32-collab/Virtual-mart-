/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Plus, Minus, ShoppingCart, Heart, Star, MapPin } from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface ProductCardProps {
  product: Product;
  quantityInCart: number;
  onAdd: (product: Product) => void;
  onRemove: (productId: string) => void;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, quantityInCart, onAdd, onRemove, onClick }) => {
  // Mocking discount for visual match with screenshot
  const hasDiscount = true;
  const discountPercent = 10;
  const originalPrice = Math.round(product.price * 1.1);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={() => onClick(product)}
      className="bg-white rounded-[1.5rem] shadow-sm hover:shadow-lg transition-all duration-300 border border-orange-100 group flex flex-col h-full overflow-hidden cursor-pointer"
    >
      {/* Image Container - Flush with borders */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        
        {/* Floating Tags */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          <div className="bg-[#FFD700] px-1.5 py-0.5 rounded flex items-center gap-0.5 shadow-sm">
            <Star className="w-2.5 h-2.5 fill-black text-black" />
            <span className="text-[9px] font-black text-black uppercase tracking-tight">Featured</span>
          </div>
          {hasDiscount && (
            <div className="bg-[#FF4D4D] px-1.5 py-0.5 rounded w-fit shadow-sm">
              <span className="text-[9px] font-black text-white">-{discountPercent}%</span>
            </div>
          )}
        </div>

        <div className="absolute bottom-2 left-2 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded">
          <span className="text-[8px] font-black text-white uppercase tracking-widest">{product.category}</span>
        </div>
      </div>

      <div className="p-1.5 pt-0.5 flex flex-col flex-grow">
        {/* Header: Price and Heart */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-gray-900 font-black text-sm md:text-base font-display leading-none">
                {formatPrice(product.price)}
              </span>
            </div>
            {hasDiscount && (
              <span className="text-[8px] md:text-[9px] text-gray-400 font-bold line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
          <button className="p-0.5 text-gray-300 hover:text-red-500 transition-colors">
            <Heart className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Title */}
        <h3 className="text-gray-700 font-bold mb-1 line-clamp-1 text-[10px] md:text-[11px] leading-tight">
          {product.name}
        </h3>

        {/* Bottom Meta */}
        <div className="flex items-center justify-between mt-auto mb-1 text-[8px] md:text-[9px]">
          <div className="flex items-center gap-0.5 text-gray-400 font-bold">
            <Star className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
            <span>New</span>
          </div>
          <div className="flex items-center gap-0.5 text-gray-400 font-bold">
            <MapPin className="w-2.5 h-2.5 text-gray-300" />
            <span>Sargodha</span>
          </div>
        </div>
        
        {/* Add to Cart Actions */}
        <div className="mt-auto">
          <AnimatePresence mode="wait">
            {quantityInCart > 0 ? (
              <motion.div
                key="controls"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center justify-between bg-green-50 rounded-md p-0.5"
              >
                <button
                  onClick={(e) => { e.stopPropagation(); onRemove(product.id); }}
                  className="p-0.5 px-1 bg-white rounded text-green-600 hover:bg-green-600 hover:text-white transition-colors shadow-sm"
                >
                  <Minus className="w-2.5 h-2.5" />
                </button>
                <span className="text-[10px] font-bold text-green-700">{quantityInCart}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); onAdd(product); }}
                  className="p-0.5 px-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors shadow-sm"
                >
                  <Plus className="w-2.5 h-2.5" />
                </button>
              </motion.div>
            ) : (
              <motion.button
                key="add"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); onAdd(product); }}
                className="w-full py-1 bg-green-600 text-white rounded-md text-[9px] font-black hover:bg-green-700 transition-all flex items-center justify-center gap-1 shadow-sm shadow-green-100"
              >
                <ShoppingCart className="w-2.5 h-2.5" />
                Add to Cart
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
