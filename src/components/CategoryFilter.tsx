/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Icons from 'lucide-react';
import { CATEGORIES } from '../constants';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelect: (id: string) => void;
}

export default function CategoryFilter({ selectedCategory, onSelect }: CategoryFilterProps) {
  return (
    <div className="py-2 bg-white overflow-x-auto no-scrollbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-black text-gray-900 font-display">Categories</h2>
          <button className="text-[10px] font-bold text-gray-400 hover:text-green-600 transition-colors uppercase tracking-wider">View All</button>
        </div>
        
        <div className="grid grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-1.5">
          {CATEGORIES.map((category) => {
            const Icon = (Icons as any)[category.icon] || Icons.Store;
            const isSelected = selectedCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => onSelect(category.id)}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 p-1.5 rounded-lg border transition-all duration-300",
                  isSelected 
                    ? "bg-green-50 border-green-500" 
                    : "bg-white border-gray-100"
                )}
              >
                <div className={cn(
                  "transition-colors",
                  isSelected ? "text-green-600" : "text-gray-900"
                )}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className={cn(
                  "text-[8px] sm:text-[10px] font-bold text-center leading-none truncate w-full",
                  isSelected ? "text-green-700" : "text-gray-500"
                )}>
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
