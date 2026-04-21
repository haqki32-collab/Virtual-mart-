/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Category, Product } from './types';

export const WHATSAPP_NUMBER = '923015634597';
export const JAZZCASH_NUMBER = '03265520658';
export const OWNER_NAME = 'Syed Asim Ali Shah';

export const MIN_ORDER_AMOUNT = 500;
export const DELIVERY_CHARGES = 100;

export const CATEGORIES: Category[] = [
  { id: 'all', name: 'All', icon: 'Store' },
  { id: 'atta', name: 'Atta & Flour', icon: 'Wheat' },
  { id: 'rice', name: 'Rice & Grains', icon: 'Sprout' },
  { id: 'oil', name: 'Cooking Oil', icon: 'Droplets' },
  { id: 'drinks', name: 'Drinks', icon: 'CupSoda' },
  { id: 'snacks', name: 'Snacks', icon: 'Cookie' },
  { id: 'dairy', name: 'Dairy & Eggs', icon: 'Milk' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Sunridge Chakki Atta',
    price: 1450,
    category: 'atta',
    unit: '10kg',
    image: 'https://picsum.photos/seed/atta/400/400',
    description: 'Premium quality whole wheat chakki atta, stone-ground to preserve natural nutrients and fiber. Ideal for soft and healthy rotis.',
  },
  {
    id: '7',
    name: 'Dalda Cooking Oil',
    price: 540,
    category: 'oil',
    unit: '1L Pouch',
    image: 'https://picsum.photos/seed/oil/400/400',
    description: 'Dalda Vitamin enriched cooking oil with VTF. Naturally cholesterol-free and rich in Vitamin A, D, and E.',
  },
  {
    id: '8',
    name: 'Sella Rice (Baanpati)',
    price: 360,
    category: 'rice',
    unit: '1kg',
    image: 'https://picsum.photos/seed/rice2/400/400',
    description: 'Premium quality Sella rice for perfect biryani results every time.',
  },
  {
    id: '2',
    name: 'Basmati Rice (Super Kernal)',
    price: 380,
    category: 'rice',
    unit: '1kg',
    image: 'https://picsum.photos/seed/rice/400/400',
    description: 'Extra long grain Super Kernal Basmati rice. Famous for its exquisite aroma and delicate texture. Perfect for biryani and pulao.',
  },
  {
    id: '3',
    name: 'Coca Cola',
    price: 180,
    category: 'drinks',
    unit: '1.5L',
    image: 'https://picsum.photos/seed/coke/400/400',
    description: 'Refreshing carbonated soft drink. Serve chilled for the best experience. Great with meals or on its own.',
  },
  {
    id: '9',
    name: 'Nestle Everyday Powder',
    price: 1150,
    category: 'dairy',
    unit: '850g Pack',
    image: 'https://picsum.photos/seed/everyday/400/400',
    description: 'The classic dairy whitener for the perfect cup of tea. Tea whitener at its best.',
  },
  {
    id: '4',
    name: 'Lays Masala',
    price: 60,
    category: 'snacks',
    unit: '40g',
    image: 'https://picsum.photos/seed/lays/400/400',
    description: 'Crunchy potato chips seasoned with a spicy masala blend. Pakistan\'s favorite snack for any time of the day.',
  },
  {
    id: '5',
    name: 'Nestle Milkpak',
    price: 280,
    category: 'dairy',
    unit: '1L',
    image: 'https://picsum.photos/seed/milk/400/400',
    description: 'Pure UHT treated milk. Safe and nutritious, enriched with essential vitamins. No preservatives added.',
  },
  {
    id: '6',
    name: 'Organic Farm Eggs',
    price: 320,
    category: 'dairy',
    unit: 'Dozen',
    image: 'https://picsum.photos/seed/eggs/400/400',
    description: 'Fresh farm-raised eggs. High in protein and essential nutrients. Perfect for breakfast or baking.',
  },
];
