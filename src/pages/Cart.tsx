/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, Plus, Minus, ArrowRight, CheckCircle2, User, Phone } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

export default function Cart() {
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice } = useCartStore();

  // Buyurtma formasi holati
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [isOrdered, setIsOrdered] = useState(false);
  const [orderId, setOrderId] = useState<string>('');

  const totalPrice = getTotalPrice();

  const handlePlus = (productId: number, currentQty: number) => {
    updateQuantity(productId, currentQty + 1);
  };

  const handleMinus = (productId: number, currentQty: number) => {
    updateQuantity(productId, currentQty - 1);
  };

  const handlePlaceOrder = (e: FormEvent) => {
    e.preventDefault();
    if (!userName || !userPhone) {
      alert("Iltimos, ismingiz va telefon raqamingizni kiriting!");
      return;
    }

    // Buyurtma raqamini generatsiya qilish
    const generatedId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);
    setIsOrdered(true);

    // Savatchani tozalash
    clearCart();
  };

  // Agar buyurtma muvaffaqiyatli amalga oshirilsa, tabrik oynasi
  if (isOrdered) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-6">
        <div className="flex justify-center">
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-full animate-bounce">
            <CheckCircle2 className="h-16 w-16" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Buyurtmangiz Qabul Qilindi!</h1>
          <p className="text-sm font-semibold text-indigo-600">Buyurtma ID: {orderId}</p>
          <p className="text-sm text-gray-500 leading-relaxed font-sans">
            Rahmat, hurmatli <span className="font-bold text-gray-800">{userName}</span>. Sizning buyurtmangiz navbatga qo'shildi. Yaqin daqiqalarda operatorlarimiz siz ko'rsatgan <span className="font-bold text-gray-800">{userPhone}</span> raqami bilan bog'lanishadi.
          </p>
        </div>
        <div className="pt-4">
          <Link
            to="/"
            onClick={() => {
              setIsOrdered(false);
              setUserName('');
              setUserPhone('');
            }}
            className="inline-flex w-full items-center justify-center px-6 py-3 border border-transparent text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition"
          >
            Bosh sahifaga qaytish
          </Link>
        </div>
      </div>
    );
  }

  // Agar savat bo'sh bo'lsa
  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center space-y-6">
        <div className="flex justify-center">
          <div className="p-4 bg-gray-50 text-gray-400 rounded-full">
            <ShoppingBag className="h-14 w-14" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Savatchangiz bo'sh</h2>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Hozircha savatchangizga hech qanday mahsulot qo'shmadingiz. Mahsulotlar katalogimizga o'tib, o'zingizga ma'qulini tanlang.
          </p>
        </div>
        <div>
          <Link
            to="/products"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition shadow-md"
          >
            Sotib olishni boshlash
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 pb-24">
      
      {/* Sarlavha */}
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Savatcha</h1>
        <p className="text-xs text-gray-500">Tanlagan mahsulotlaringizni tekshiring va buyurtmani rasmiylashtiring.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Chap ustun — Mahsulotlar jadvali */}
        <div className="lg:col-span-2 space-y-4">
          
          <div className="overflow-x-auto bg-white border border-gray-100 rounded-2xl shadow-sm">
            <table className="w-full text-left border-collapse min-w-[600px] text-sm font-sans">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                  <th className="px-6 py-4">Mahsulot</th>
                  <th className="px-6 py-4">Narxi</th>
                  <th className="px-6 py-4 text-center">Soni</th>
                  <th className="px-6 py-4">Umumiysi</th>
                  <th className="px-6 py-4 text-center">Boshqarish</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {items.map((item) => (
                  <tr key={item.product.id} className="hover:bg-gray-50/50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.product.thumbnail}
                          alt={item.product.title}
                          className="h-12 w-12 rounded-lg bg-gray-50 border border-gray-100 object-contain p-1"
                        />
                        <div>
                          <Link
                            to={`/products/${item.product.id}`}
                            className="font-bold text-gray-900 hover:text-indigo-600 transition block text-sm max-w-[200px] truncate"
                          >
                            {item.product.title}
                          </Link>
                          {item.product.brand && (
                            <span className="text-xs text-gray-400 font-sans">{item.product.brand}</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      ${item.product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleMinus(item.product.id, item.quantity)}
                          className="p-1 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-500 transition"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="font-bold text-gray-900 w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => handlePlus(item.product.id, item.quantity)}
                          className="p-1 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-500 transition"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-950">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition"
                        title="Savatchadan o'chirish"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
            <button
              onClick={clearCart}
              className="text-xs font-semibold text-rose-600 hover:text-rose-800 transition py-1 px-3 bg-rose-50 hover:bg-rose-100 rounded-lg"
            >
              Mavjud savatchani butunlay tozalash
            </button>
            <Link to="/products" className="text-xs font-semibold text-indigo-600 hover:underline">
              Xarid qilishda davom etish
            </Link>
          </div>
        </div>

        {/* O'ng ustun — Buyurtma berish formasi */}
        <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm space-y-6">
          <h3 className="font-bold text-gray-900 text-lg">Xarid Tafsilotlari</h3>
          
          <div className="divide-y divide-gray-100 text-sm">
            <div className="flex justify-between pb-3">
              <span className="text-gray-500">Mahsulotlar soni:</span>
              <span className="font-bold text-gray-900">
                {items.reduce((total, i) => total + i.quantity, 0)} ta
              </span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-gray-500">Yetkazib berish:</span>
              <span className="font-bold text-emerald-600">Bepul (Aksiya)</span>
            </div>
            <div className="flex justify-between pt-3 text-base">
              <span className="font-bold text-gray-900">Umumiy summa:</span>
              <span className="font-extrabold text-indigo-600">${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout Form */}
          <form onSubmit={handlePlaceOrder} className="border-t border-gray-100 pt-6 space-y-4">
            <h4 className="font-bold text-gray-900 text-sm">Buyurtmani rasmiylashtirish</h4>
            
            <div className="space-y-1">
              <label htmlFor="user-name" className="block text-xs font-medium text-gray-700 select-none">
                Ismingiz <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="user-name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Ismingizni kiriting..."
                  required
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                />
                <User className="absolute left-3.5 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="user-phone" className="block text-xs font-medium text-gray-700 select-none">
                Telefon raqamingiz <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="user-phone"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  placeholder="Misol: +998901234567"
                  required
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                />
                <Phone className="absolute left-3.5 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center p-3 text-sm font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 transition shadow-lg shadow-indigo-100"
            >
              Buyurtma berish
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}
