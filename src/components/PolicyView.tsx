/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowLeft, ScrollText, ShieldAlert, RefreshCcw } from 'lucide-react';
import { motion } from 'motion/react';

interface PolicyViewProps {
  type: 'terms' | 'privacy' | 'refunds';
  onBack: () => void;
}

export default function PolicyView({ type, onBack }: PolicyViewProps) {
  const isTerms = type === 'terms';
  const isPrivacy = type === 'privacy';
  const isRefunds = type === 'refunds';

  const getIcon = () => {
    if (isTerms) return <ScrollText className="w-8 h-8" />;
    if (isPrivacy) return <ShieldAlert className="w-8 h-8" />;
    return <RefreshCcw className="w-8 h-8" />;
  };

  const getTitle = () => {
    if (isTerms) return 'Terms of Service';
    if (isPrivacy) return 'Privacy Policy';
    return 'Return & Refund Policy';
  };

  const getBgColor = () => {
    if (isTerms) return "p-4 bg-blue-50 text-blue-600 rounded-2xl";
    if (isPrivacy) return "p-4 bg-purple-50 text-purple-600 rounded-2xl";
    return "p-4 bg-red-50 text-red-600 rounded-2xl";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-500 hover:text-green-600 transition-colors mb-8 group font-bold px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-100"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>

        <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-xl border border-gray-100"
>
  <div className="flex items-center gap-4 mb-8">
    <div className={getBgColor()}>
      {getIcon()}
    </div>
    <div>
      <h1 className="text-3xl font-black text-gray-900 font-display">
        {getTitle()}
      </h1>
      <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mt-1">Last Updated: April 2026</p>
    </div>
  </div>

  <div className="prose prose-green max-w-none space-y-6 text-gray-600 leading-relaxed">
    {isTerms && (
      <>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">1. Acceptance of Terms</h2>
          <p>By accessing and using Virtual Mart, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">2. Delivery Zones</h2>
          <p>Our services are strictly limited to Ghazikot, Township, Mattan Wali Ziarat, and a 1km surrounding radius. Orders outside these zones may be cancelled.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">3. Payments</h2>
          <p>We accept Cash on Delivery and JazzCash. For JazzCash, a screenshot of the transaction must be shared via WhatsApp for order confirmation.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">4. Quality Guarantee</h2>
          <p>We strive to deliver the freshest products. If you receive damaged or expired items, please contact us immediately during delivery.</p>
        </section>
      </>
    )}
    
    {isPrivacy && (
      <>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">1. Data Collection</h2>
          <p>We collect your Name, Phone Number, and Address solely to facilitate the delivery of your grocery orders.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">2. WhatsApp Integration</h2>
          <p>Our store operates via WhatsApp. Your order details are shared with us through an encrypted WhatsApp message triggered by your actions.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">3. Third Parties</h2>
          <p>We do not sell or share your personal data with any third-party marketing agencies. Your information stays with Virtual Mart.</p>
        </section>
      </>
    )}

    {isRefunds && (
      <>
        <section className="bg-red-50 p-6 rounded-3xl border border-red-100">
          <h2 className="text-2xl font-black text-red-600 mb-4 font-display uppercase tracking-tight">Important Notice: No Return & No Refund Policy</h2>
          <p className="text-red-800 font-bold leading-relaxed">
            Please note that Virtual Mart does NOT offer any returns or refunds. 
          </p>
          <p className="mt-4 text-red-700/80">
            Once an order is confirmed and processed, it cannot be returned, exchanged, or refunded under any circumstances. 
            We strictly maintain a <span className="font-black underline">"Firm Sale"</span> policy. 
            Customers are advised to carefully review their cart and delivery details before confirming on WhatsApp.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Order Inspection</h2>
          <p>
            We highly recommend inspecting your items upon delivery. 
            Since we do not offer refunds, ensure you are satisfied with the quality of the products when our delivery partner reaches your location.
          </p>
        </section>
      </>
    )}
  </div>
</motion.div>
      </div>
    </div>
  );
}
