/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Facebook, Instagram, Twitter, Phone, User, ExternalLink, Home, ShieldCheck, RefreshCcw, MapPin, Mail, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WHATSAPP_NUMBER, OWNER_NAME } from '../constants';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: 'home' | 'checkout' | 'terms' | 'privacy' | 'refunds') => void;
}

export default function MenuDrawer({ isOpen, onClose, onNavigate }: MenuDrawerProps) {
  const trackOrder = () => {
    const message = encodeURIComponent("Assalam o Alaikum, I want to track my order status.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-[85%] sm:w-[400px] bg-white z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-green-600 p-1.5 rounded-lg">
                  <ShoppingBag className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-black text-gray-900 tracking-tight font-display">
                  Store <span className="text-green-600">Menu</span>
                </span>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Navigation Links */}
              <div className="space-y-3">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Main Navigation</h3>
                <div className="grid gap-2">
                  <MenuButton icon={<Home className="w-5 h-5" />} label="Home" onClick={() => onNavigate('home')} />
                  <MenuButton icon={<ShieldCheck className="w-5 h-5" />} label="Privacy Policy" onClick={() => onNavigate('privacy')} />
                  <MenuButton icon={<RefreshCcw className="w-5 h-5" />} label="Return & Refund" onClick={() => onNavigate('refunds')} />
                  <MenuButton icon={<User className="w-5 h-5" />} label="Terms of Service" onClick={() => onNavigate('terms')} />
                </div>
              </div>

              {/* Order Tracking */}
              <div className="space-y-3">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Order Support</h3>
                <button 
                  onClick={trackOrder}
                  className="w-full flex items-center justify-between p-4 bg-green-50 rounded-2xl border border-green-100 group"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-green-600" />
                    <span className="font-bold text-green-900">Track Your Order</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-green-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Store Info</h3>
                <div className="bg-gray-50 rounded-3xl p-6 space-y-4 border border-gray-100">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-green-600 mt-1" />
                    <p className="text-sm text-gray-600 leading-relaxed font-medium">
                      Delivering to Ghazikot, Township, and Mattan Wali Ziarat areas.
                    </p>
                  </div>
                  <div className="flex items-center gap-4 border-t border-gray-200/50 pt-4">
                    <Mail className="w-5 h-5 text-green-600" />
                    <p className="text-sm font-bold text-gray-900">info@virtualmart.pk</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <User className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase uppercase">Proprietor</p>
                      <p className="text-sm font-bold text-gray-900">{OWNER_NAME}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-6 pt-4">
                <SocialIcon icon={<Facebook className="w-5 h-5" />} />
                <SocialIcon icon={<Instagram className="w-5 h-5" />} />
                <SocialIcon icon={<Twitter className="w-5 h-5" />} />
              </div>
            </div>

            <div className="p-8 border-t border-gray-100 text-center">
              <p className="text-gray-400 text-[10px] font-black tracking-widest uppercase mb-1">
                © 2026 Virtual Mart
              </p>
              <p className="text-[9px] text-gray-300 font-bold">ALL RIGHTS RESERVED</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function MenuButton({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all text-gray-700 hover:text-green-600 border border-transparent hover:border-gray-100"
    >
      <div className="p-2 bg-gray-50 rounded-xl group-hover:bg-white transition-colors">
        {icon}
      </div>
      <span className="font-bold">{label}</span>
    </button>
  );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <a href="#" className="p-3 bg-gray-50 text-gray-400 rounded-2xl hover:bg-green-600 hover:text-white transition-all shadow-sm">
      {icon}
    </a>
  );
}
