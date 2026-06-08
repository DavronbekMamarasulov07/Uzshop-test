/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Star, ShoppingCart, ArrowLeft, Heart, ShieldCheck, Truck, RotateCcw, Box } from 'lucide-react';
import { Product } from '../types';
import { useCartStore } from '../store/useCartStore';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Galereyadagi faol rasm
  const [activeImage, setActiveImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState<boolean>(false);

  // Savatga qo'shish funksiyasi
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (res.data) {
          setProduct(res.data);
          setActiveImage(res.data.images && res.data.images.length > 0 ? res.data.images[0] : res.data.thumbnail);
        } else {
          setError("Mahsulot ma'lumotlari mavjud emas");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Kechirasiz, mahsulot tafsilotlarini yuklashda xatolik yuz berdi.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      setAdded(true);
      setTimeout(() => {
        setAdded(false);
      }, 3000);
    }
  };

  const handleQuantityChange = (val: number) => {
    if (val < 1) return;
    setQuantity(val);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex justify-center items-center">
        <div className="space-y-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="text-sm text-gray-500 font-medium">Mahsulot ma'lumotlari yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-4">
        <p className="text-red-500 font-bold text-lg">{error || "Mahsulot topilmadi!"}</p>
        <Link to="/products" className="inline-flex items-center text-indigo-600 font-semibold hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Barcha mahsulotlarga qaytish
        </Link>
      </div>
    );
  }

  // Chegirmasiz asl narxni qayta hisoblash
  const originalPrice = product.discountPercentage 
    ? product.price / (1 - product.discountPercentage / 100) 
    : product.price;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 pb-24">
      {/* Orqaga qaytish tugmasi */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-indigo-600 transition"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Orqaga orqaga qaytish
        </button>
      </div>

      {/* Mahsulot ma'lumotlari grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Chap ustun — Rasmlar galereyasi */}
        <div className="space-y-4">
          <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 aspect-square flex items-center justify-center overflow-hidden relative">
            {product.discountPercentage && product.discountPercentage > 0 && (
              <span className="absolute top-4 left-4 bg-rose-500 text-white font-bold text-xs px-3 py-1.5 rounded-xl z-10">
                Chegirma -{Math.round(product.discountPercentage)}%
              </span>
            )}
            <img
              src={activeImage}
              alt={product.title}
              className="object-contain max-h-[400px] w-full transform hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Kichik rasmlar ro'yxati */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`border-2 rounded-xl p-2 bg-gray-50 shrink-0 aspect-square h-16 w-16 flex items-center justify-center overflow-hidden transition ${
                    activeImage === img ? 'border-indigo-600' : 'border-gray-100 hover:border-indigo-300'
                  }`}
                >
                  <img src={img} alt={`rasm-${idx}`} className="object-contain h-12 w-12" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* O'ng ustun — Batafsil matn va boshqaruv elementlari */}
        <div className="space-y-6">
          
          {/* Toifa va brend */}
          <div className="space-y-2">
            <span className="inline-block bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {product.category}
            </span>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{product.title}</h1>
            
            {product.brand && (
              <p className="text-sm font-medium text-gray-500">
                Brend: <span className="text-indigo-600 font-bold">{product.brand}</span>
              </p>
            )}
          </div>

          {/* Reyting */}
          <div className="flex items-center space-x-2">
            <div className="flex text-amber-500 space-x-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= Math.round(product.rating) ? 'fill-amber-500 stroke-amber-500' : 'text-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-800">{product.rating} ball</span>
          </div>

          {/* Narxlar */}
          <div className="p-4 bg-gray-50 rounded-2xl space-y-2">
            <span className="text-xs font-semibold text-gray-400 block">Mahsulot narxi</span>
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-extrabold text-gray-950">${product.price.toFixed(2)}</span>
              {product.discountPercentage && product.discountPercentage > 0 && (
                <span className="text-base text-gray-400 line-through">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {product.stock <= 5 ? (
              <span className="inline-block text-xs font-bold text-rose-500 antialiased">
                ⚠️ Shoshiling! Omborda faqat {product.stock} dona qoldi.
              </span>
            ) : (
              <span className="inline-block text-xs font-bold text-emerald-600 antialiased">
                ✓ Omborda mavjud: {product.stock} ta
              </span>
            )}
          </div>

          {/* Batafsil tavsif */}
          <div className="space-y-2">
            <h3 className="font-bold text-gray-900 text-base">Tavsif</h3>
            <p className="text-sm text-gray-600 leading-relaxed font-sans">{product.description}</p>
          </div>

          {/* BARCHA TAFSILOTLAR SECTION */}
          <div className="border-t border-gray-100 pt-6">
            <h3 className="font-bold text-gray-900 text-base mb-4">Mahsulotning to'liq parametrlari</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
              
              <div className="bg-gray-50/50 p-3 rounded-xl border border-gray-100 space-y-1">
                <span className="text-gray-400 font-medium block">Holati (Availability)</span>
                <span className="font-bold text-gray-800">{product.availabilityStatus || 'Yaxshi'}</span>
              </div>

              <div className="bg-gray-50/50 p-3 rounded-xl border border-gray-100 space-y-1">
                <span className="text-gray-400 font-medium block">Kafolat (Warranty)</span>
                <span className="font-bold text-gray-800">{product.warrantyInformation || "Kafolat muddati mavjud emas"}</span>
              </div>

              <div className="bg-gray-50/50 p-3 rounded-xl border border-gray-100 space-y-1">
                <span className="text-gray-400 font-medium block">Yetkazib berish (Shipping)</span>
                <span className="font-bold text-gray-800">{product.shippingInformation || "Bepul yetkazish"}</span>
              </div>

              <div className="bg-gray-50/50 p-3 rounded-xl border border-gray-100 space-y-1">
                <span className="text-gray-400 font-medium block">Qaytarish siyosati (Return Policy)</span>
                <span className="font-bold text-gray-800">{product.returnPolicy || "14 kun qaytarish kafolati"}</span>
              </div>
            </div>
          </div>

          {/* Savatga qo'shish va sonini tanlash */}
          <div className="border-t border-gray-100 pt-6 space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-semibold text-gray-700">Soni:</span>
              <div className="flex items-center border border-gray-200 rounded-xl bg-white">
                <button
                  type="button"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="px-3 py-1.5 font-bold text-gray-500 hover:text-indigo-600 border-r border-gray-200"
                >
                  -
                </button>
                <span className="px-4 font-bold text-gray-900 text-sm">{quantity}</span>
                <button
                  type="button"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="px-3 py-1.5 font-bold text-gray-500 hover:text-indigo-600 border-l border-gray-200"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center p-4 rounded-xl font-bold text-sm text-white transition ${
                  added ? 'bg-emerald-600' : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100'
                }`}
              >
                {added ? (
                  <>Savatchaga muvaffaqiyatli qo'shildi!</>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Savatga qo'shish
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Kafolat va boshqalar */}
          <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-6 text-[10px] text-gray-500 font-sans">
            <div className="flex flex-col items-center text-center p-2 rounded-xl bg-gray-50/20">
              <ShieldCheck className="h-5 w-5 text-indigo-500 mb-1" />
              <span>Original mahsulot</span>
            </div>
            <div className="flex flex-col items-center text-center p-2 rounded-xl bg-gray-50/20">
              <Truck className="h-5 w-5 text-indigo-500 mb-1" />
              <span>Tezkor yetkazish</span>
            </div>
            <div className="flex flex-col items-center text-center p-2 rounded-xl bg-gray-50/20">
              <RotateCcw className="h-5 w-5 text-indigo-500 mb-1" />
              <span>14 kun qaytarish</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
