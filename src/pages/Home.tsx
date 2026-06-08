/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight, Star, Send, ShieldCheck, Truck, Headphones, RotateCcw } from 'lucide-react';
import { Product, Testimonial } from '../types';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Aloqa formasi holati
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Arizani topshirish funksiyasi
  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactPhone) {
      alert("Iltimos, ismingiz va telefon raqamingizni kiriting!");
      return;
    }
    setIsSubmitted(true);
    // 3 soniyadan keyin formani tozalash holati
    setTimeout(() => {
      setContactName('');
      setContactPhone('');
      setContactMessage('');
      setIsSubmitted(false);
    }, 4000);
  };

  // Eng yaxshi 4 ta mahsulotni yuklash
  useEffect(() => {
    setLoading(true);
    axios
      .get('https://dummyjson.com/products?limit=4')
      .then((res) => {
        if (res.data && res.data.products) {
          setProducts(res.data.products);
        } else {
          setError("Ma'lumotlar formati noto'g'ri");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Mahsulotlarni yuklashda xatolik yuz berdi");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Mijozlar fikri (Mocks in Uzbek)
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Dilshodbek Ismoilov',
      rating: 5,
      comment: "Mahsulotlar sifati juda a'lo darajada. Buyurtma berganimdan so'ng, atigi 2 soat o'tib yetkazib berishdi. Juda mamnunman!",
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
      role: 'Toshkent shahri',
    },
    {
      id: 2,
      name: 'Madina Shadiyeva',
      rating: 5,
      comment: "Ushbu do'kondan birinchi marta kiyim sotib oldim. Oilamiz bilan juda xursand bo'ldik. Sifatli va hamyonbop ekan.",
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
      role: 'Samarqand viloyati',
    },
    {
      id: 3,
      name: 'Jasur Umarov',
      rating: 5,
      comment: "Saytning ishlashi va dizayni juda zamonaviy. Qidiruv tizimi ham qulay, hamma mahsulotlarni tezda topish mumkin. Tavsiya qilaman!",
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop',
      role: 'Farg\'ona viloyati',
    },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* HERO SECTION / KATTA BANNER */}
      <header className="relative bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white overflow-hidden py-24 px-6 md:px-12 sm:rounded-3xl max-w-7xl mx-auto sm:mt-6">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-block bg-indigo-500/25 text-indigo-300 font-semibold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider">
              Yangi To'plam — 2026
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Sifatli Xaridlar, <br />
              <span className="text-indigo-400">Arzon Narxlarda!</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-lg">
              Dunyoning eng sara mahsulotlarini uyingizdan chiqmasdan, o'ta qulay va arzon narxlarda yetkazib berish xizmati bilan xarid qiling.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-indigo-900 bg-white hover:bg-gray-100 transition duration-300 shadow-lg"
              >
                Hoziroq Xarid Qilish
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-400 text-base font-medium rounded-xl text-white hover:bg-white/10 transition duration-300"
              >
                Biz Haqimizda Batafsil
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex justify-center relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 blur-3xl opacity-30"></div>
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop"
              alt="E-Commerce Hero Banner"
              className="relative rounded-2xl shadow-2xl border border-white/10 max-w-md w-full object-cover aspect-video transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </header>

      {/* AFZALLIKLARIMIZ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">Tez yetkazib berish</h4>
              <p className="text-xs text-gray-500">O'zbekiston bo'ylab tezkor yetkazib berish</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm font-sans">100% Xavfsizlik</h4>
              <p className="text-xs text-gray-500">Xaridlar butunlay xavfsiz va kafolatlangan</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
              <Headphones className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm font-sans">24/7 Qo'llab-quvvatlash</h4>
              <p className="text-xs text-gray-500">Sizga istalgan vaqtda yordam beramiz</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
              <RotateCcw className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm font-sans">Tezkor qaytarish</h4>
              <p className="text-xs text-gray-500">Mahsulotni 14 kun ichida almashtirish</p>
            </div>
          </div>
        </div>
      </section>

      {/* 1-SECTION: TOP 4 MAHSULOTLAR */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-indigo-600 text-xs font-bold uppercase tracking-widest">Siz uchun maxsus</span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Ommabop Mahsulotlar</h2>
            <div className="h-1 w-12 bg-indigo-600 mx-auto rounded-full"></div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="animate-pulse flex flex-col space-y-4 border border-gray-100 p-4 rounded-2xl bg-white shadow-sm">
                  <div className="bg-gray-200 h-48 w-full rounded-xl"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <p className="text-center text-red-500 font-medium">{error}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group flex flex-col bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:border-indigo-150 transition-all duration-300 overflow-hidden"
                >
                  <div className="relative bg-gray-50 aspect-square overflow-hidden flex items-center justify-center p-4">
                    {product.discountPercentage && product.discountPercentage > 0 && (
                      <span className="absolute top-3 left-3 bg-rose-500 text-white font-bold text-xs px-2.5 py-1 rounded-lg z-10">
                        -{Math.round(product.discountPercentage)}%
                      </span>
                    )}
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="object-contain h-48 w-48 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase font-sans">
                        {product.category}
                      </span>
                      <h3 className="font-bold text-gray-900 text-base line-clamp-1 group-hover:text-indigo-600 transition">
                        {product.title}
                      </h3>
                      <div className="flex items-center space-x-1.5 text-amber-500 text-sm">
                        <Star className="h-4 w-4 fill-amber-500 stroke-amber-500" />
                        <span className="font-medium text-gray-700">{product.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                      <span className="text-lg font-extrabold text-gray-950">${product.price.toFixed(2)}</span>
                      <Link
                        to={`/products/${product.id}`}
                        className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition"
                      >
                        Batafsil
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center pt-4">
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-6 py-3 border border-indigo-600 text-sm font-semibold rounded-xl text-indigo-600 hover:bg-indigo-50 hover:border-indigo-700 transition duration-200"
            >
              Barcha Mahsulotlarni Ko'rish
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* 2-SECTION: MIJOZLAR FIKRI */}
        <section className="space-y-8 bg-gradient-to-b from-gray-50 to-white py-12 px-6 rounded-3xl border border-gray-100">
          <div className="text-center space-y-2">
            <span className="text-indigo-600 text-xs font-bold uppercase tracking-widest">Mijozlarimizdan kelgan fikrlar</span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Mijozlar Fikri</h2>
            <div className="h-1 w-12 bg-indigo-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-white border border-gray-50 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4 hover:-translate-y-1 transition duration-300"
              >
                <div className="space-y-3">
                  <div className="flex text-amber-500 space-x-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-4 w-4 fill-amber-500 stroke-amber-500" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed italic">
                    "{t.comment}"
                  </p>
                </div>
                <div className="flex items-center space-x-3 pt-4 border-t border-gray-50">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-10 w-10 rounded-full object-cover border border-gray-100"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 text-xs">{t.name}</h4>
                    <p className="text-[10px] text-gray-500 tracking-wider font-sans uppercase">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3-SECTION: CONTACT */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-indigo-600 text-xs font-bold uppercase tracking-widest">Savollaringiz bormi?</span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Biz bilan bog'laning!</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Mahsulotlar yetkazib berilishi, to'lovlar, hamkorlik yoki boshqa savollar bo'yicha bizga xabar yuborishingiz mumkin. Mutaxassislarimiz tez fursatlarda siz bilan bog'lanishadi.
            </p>
            <div className="space-y-3 pt-2 text-sm text-gray-700">
              <p>📍 O'zbekiston, Toshkent shahri, Amir Temur ko'chasi, 100-uy</p>
              <p>📞 +998 (90) 123-45-67</p>
              <p>✉️ info@uzshop.uz</p>
            </div>
          </div>

          <form onSubmit={handleContactSubmit} className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm space-y-4">
            <h3 className="font-bold text-gray-900 text-lg">Murojaat yuborish</h3>
            
            <div className="space-y-1">
              <label htmlFor="contact-name" className="block text-xs font-medium text-gray-700 select-none">
                Ismingiz <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                id="contact-name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Misol: Dilshod"
                required
                className="w-full bg-gray-50 text-gray-900 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="contact-phone" className="block text-xs font-medium text-gray-700 select-none">
                Telefon raqamingiz <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                id="contact-phone"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="Misol: +998901234567"
                required
                className="w-full bg-gray-50 text-gray-900 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="contact-message" className="block text-xs font-medium text-gray-700 select-none">
                Xabaringiz <span className="text-gray-400">(ixtiyoriy)</span>
              </label>
              <textarea
                id="contact-message"
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                rows={3}
                placeholder="Xabaringizni yozing..."
                className="w-full bg-gray-50 text-gray-900 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitted}
              className={`w-full flex items-center justify-center p-3 text-sm font-semibold rounded-xl text-white transition ${
                isSubmitted ? 'bg-emerald-600' : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {isSubmitted ? (
                <>Xabar Yuborildi! Tez orada bog'lanamiz</>
              ) : (
                <>
                  Yuborish <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
