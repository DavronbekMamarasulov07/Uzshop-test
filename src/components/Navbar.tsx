/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const totalItems = useCartStore((state) => state.getTotalItems());

  const navLinks = [
    { name: 'Bosh sahifa', path: '/' },
    { name: 'Mahsulotlar', path: '/products' },
    { name: 'Biz haqimizda', path: '/about' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 transition">
            <ShoppingBag className="h-7 w-7 stroke-2" />
            <span className="font-bold text-xl tracking-tight text-gray-900">
              Uz<span className="text-indigo-600">Shop</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition duration-200 ${
                  isActive(link.path)
                    ? 'text-indigo-600 border-b-2 border-indigo-600 pb-1 pt-1'
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Cart & Menu toggle */}
          <div className="flex items-center space-x-4">
            <Link
              to="/cart"
              className="relative p-2 text-gray-600 hover:text-indigo-600 transition"
              aria-label="Savat"
              id="cart-nav-button"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white font-semibold text-xs h-5 w-5 rounded-full flex items-center justify-center animate-pulse">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-indigo-600 transition"
              aria-label="Menuni ochish"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-4 space-y-1 shadow-inner">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-lg text-base font-medium transition ${
                isActive(link.path)
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/cart"
            onClick={() => setIsOpen(false)}
            className={`block px-3 py-2 rounded-lg text-base font-medium transition ${
              isActive('/cart')
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600'
            }`}
          >
            Savat ({totalItems} ta mahsulot)
          </Link>
        </div>
      )}
    </nav>
  );
}
