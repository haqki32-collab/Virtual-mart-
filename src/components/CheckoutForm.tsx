/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShoppingBag, Truck, CreditCard, ArrowLeft, Phone, User, Home, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { OrderDetails, PaymentMethod, CartItem } from '../types';
import { JAZZCASH_NUMBER, WHATSAPP_NUMBER, OWNER_NAME } from '../constants';
import { cn, formatPrice } from '../lib/utils';

interface CheckoutFormProps {
  onBack: () => void;
  cartItems: CartItem[];
  onConfirmed?: () => void;
}

export default function CheckoutForm({ onBack, cartItems, onConfirmed }: CheckoutFormProps) {
  const [formData, setFormData] = useState<OrderDetails>({
    customerName: '',
    phoneNumber: '',
    address: '',
    deliveryTime: 'As soon as possible',
    paymentMethod: 'COD',
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 100;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct WhatsApp message
    const itemsList = cartItems.map(item => `• ${item.name} x ${item.quantity} (${formatPrice(item.price * item.quantity)})`).join('\n');
    
    const message = `Assalam o Alaikum,

I want to place an order:

🛒 *Order Details:*
${itemsList}

💰 *Subtotal:* ${formatPrice(subtotal)}
🚚 *Delivery:* ${formatPrice(deliveryFee)}
💵 *Total:* ${formatPrice(total)}

📍 *Address:* ${formData.address}
⏰ *Delivery Time:* ${formData.deliveryTime}
👤 *Name:* ${formData.customerName}
📞 *Phone:* ${formData.phoneNumber}

💳 *Payment Method:* ${formData.paymentMethod}
${formData.paymentMethod !== 'COD' ? `(Will send payment to ${JAZZCASH_NUMBER})\n⚠️ *Note:* Payment screenshot send krna must ha.` : ''}

Please confirm my order.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    
    // Trigger onConfirmed to clear cart
    if (onConfirmed) {
      onConfirmed();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-green-600 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Shopping
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                  <User className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 font-display">Delivery Information</h2>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">Customer Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <input
                      required
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all"
                      value={formData.customerName}
                      onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <input
                      required
                      type="tel"
                      placeholder="e.g. 0300 0000000"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all"
                      value={formData.phoneNumber}
                      onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">Delivery Address</label>
                  <p className="text-[10px] text-green-600 font-bold px-1 mb-1 italic">Note: Only for Ghazikot, Township, Mattan Wali Ziarat & 1km radius.</p>
                  <div className="relative">
                    <Home className="absolute left-3 top-3 w-4 h-4 text-gray-300" />
                    <textarea
                      required
                      placeholder="Flat/House No, Street, Area Name..."
                      rows={3}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all resize-none"
                      value={formData.address}
                      onChange={e => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">Delivery Time</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <select
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all appearance-none"
                      value={formData.deliveryTime}
                      onChange={e => setFormData({ ...formData, deliveryTime: e.target.value })}
                    >
                      <option>As soon as possible</option>
                      <option>10:00 AM - 12:00 PM</option>
                      <option>12:00 PM - 02:00 PM</option>
                      <option>02:00 PM - 04:00 PM</option>
                      <option>04:00 PM - 06:00 PM</option>
                      <option>06:00 PM - 08:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                  <CreditCard className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 font-display">Payment Method</h2>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {(['COD', 'JazzCash'] as PaymentMethod[]).map((method) => (
                  <label
                    key={method}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer",
                      formData.paymentMethod === method
                        ? "border-green-500 bg-green-50"
                        : "border-gray-100 bg-gray-50 hover:border-gray-200"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        className="w-4 h-4 text-green-600 focus:ring-green-500"
                        checked={formData.paymentMethod === method}
                        onChange={() => setFormData({ ...formData, paymentMethod: method })}
                      />
                      <span className="font-bold text-gray-900">
                        {method === 'COD' ? 'Cash on Delivery (COD)' : method}
                      </span>
                    </div>
                    {method !== 'COD' && (
                        <div className="bg-white px-2 py-1 rounded text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Mobile Account</div>
                    )}
                  </label>
                ))}
              </div>

              {formData.paymentMethod !== 'COD' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-orange-50 border border-orange-100 rounded-2xl"
                >
                  <p className="text-sm text-orange-800 font-medium leading-relaxed">
                    Please send payment to this number: <br />
                    <span className="text-lg font-black tracking-wider">
                      {JAZZCASH_NUMBER}
                    </span>
                    <br />
                    <span className="text-xs opacity-70">Account Name: {OWNER_NAME}</span>
                    <br />
                    <span className="text-sm font-bold text-red-600 mt-2 block">
                      ⚠️ Note: Payment krny k baad screenshot send krna lazmi ha.
                    </span>
                  </p>
                </motion.div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-5 bg-green-600 text-white rounded-3xl font-black text-lg shadow-xl shadow-green-500/20 hover:bg-green-700 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              Confirm Order on WhatsApp
              <Truck className="w-6 h-6" />
            </button>
          </form>

          {/* Summary - Desktop Sticky */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gray-100 text-gray-600 rounded-lg">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
              </div>

              <div className="max-h-[300px] overflow-y-auto mb-6 space-y-4 pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-start text-sm">
                    <div className="flex-1 min-w-0 pr-4">
                      <p className="font-bold text-gray-900 truncate">{item.name}</p>
                      <p className="text-gray-500">{item.quantity} x {formatPrice(item.price)}</p>
                    </div>
                    <span className="font-bold text-gray-900 whitespace-nowrap">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-dashed border-gray-100">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>{formatPrice(deliveryFee)}</span>
                </div>
                <div className="flex justify-between text-xl font-black text-gray-900 pt-3">
                  <span>Total</span>
                  <span className="text-green-600">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
