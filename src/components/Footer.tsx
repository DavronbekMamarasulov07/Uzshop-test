/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from 'react-router-dom';
import { ShoppingBag, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 text-white">
              <ShoppingBag className="h-6 w-6 text-indigo-400 stroke-2" />
              <span className="font-bold text-xl tracking-tight">
                Uz<span className="text-indigo-400">Shop</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              DummyJSON mahsulotlari asosida yaratilgan, qulay va tezkor e-commerce platformasi. Biz bilan eng yaxshi xaridlarni amalga oshiring.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Sahifalar</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-indigo-400 transition">Bosh sahifa</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-indigo-400 transition">Barcha mahsulotlar</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-indigo-400 transition">Biz haqimizda</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-indigo-400 transition">Savat</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider font-sans">Aloqa</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                <span>O'zbekiston, Toshkent shahri, Amir Temur ko'chasi, 100-uy</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-indigo-400 shrink-0" />
                <a href="tel:+998901234567" className="hover:text-indigo-400 transition">+998 (90) 123-45-67</a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-indigo-400 shrink-0" />
                <a href="mailto:info@uzshop.uz" className="hover:text-indigo-400 transition">info@uzshop.uz</a>
              </li>
            </ul>
          </div>

          {/* Opening Hours or Additional message */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Ish tartibi</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Dushanba — Yakshanba<br />
              Sutkasiga 24 soat davomida online buyurtma qabul qilinadi. Buyurtmalarni yetkazib berish har kuni soat 9:00 dan 20:00 gacha amalga oshiriladi.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} UzShop E-Commerce. Barcha huquqlar himoyalangan. Tashkil etilgan yil: 2026</p>
        </div>
      </div>
    </footer>
  );
}
