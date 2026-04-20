/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Facebook, Instagram, Twitter, Phone, Mail, MapPin, User, ExternalLink } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';

interface FooterProps {
  onNavigate: (view: 'home' | 'checkout' | 'terms' | 'privacy' | 'refunds') => void;
}

export default function Footer() {
  return (
    <footer className="bg-gray-50 py-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-gray-400 text-[10px] tracking-widest font-black uppercase mb-1">
          © 2026 VIRTUAL MART. ALL RIGHTS RESERVED.
        </p>
        <p className="text-[9px] text-gray-300 font-bold uppercase">
          Serving with quality in Ghazikot, Township & Mattan Wali Ziarat
        </p>
      </div>
    </footer>
  );
}
