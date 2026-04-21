/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShoppingCart, Search, Menu, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onMenuClick: () => void;
  onSearchChange: (query: string) => void;
  onNavigate: (view: 'home' | 'checkout' | 'terms' | 'privacy' | 'refunds') => void;
}

export default function Header({ cartCount, onCartClick, onMenuClick, onSearchChange, onNavigate }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-bottom border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12 sm:h-14">
          {/* Logo */}
          <div 
            onClick={() => onNavigate('home')} 
            className="flex items-center gap-1.5 group cursor-pointer"
          >
            <div className="bg-green-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform duration-300">
              <ShoppingCart className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight font-display">
              Rizqdaan<span className="text-green-600">Grocery</span>
            </span>
          </div>

          {/* Search - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xs mx-4">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 w-3 h-3" />
              <input
                type="text"
                placeholder="Search..."
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-8 pr-3 py-1 text-xs bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-green-500 transition-all"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onCartClick}
              className="relative p-1.5 text-gray-600 hover:text-green-600 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 bg-green-600 text-white text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
            <button 
              onClick={onMenuClick}
              className="p-1.5 text-gray-600 hover:text-green-600 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search - Mobile */}
        <div className="md:hidden pb-2">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 w-3 h-3" />
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-8 pr-3 py-1 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500/50"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
