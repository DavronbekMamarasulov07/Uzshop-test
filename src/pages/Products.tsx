/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Search, Star, ShoppingCart, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Product } from '../types';
import { useCartStore } from '../store/useCartStore';

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Qidiruv va saralash holatlari
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('default'); // default, price-asc, price-desc, rating-desc

  // Savatga qo'shish funksiyasi
  const addItem = useCartStore((state) => state.addItem);
  const [addedProductId, setAddedProductId] = useState<number | null>(null);

  // Mahsulotlarni yuklash
  useEffect(() => {
    setLoading(true);
    axios
      .get('https://dummyjson.com/products?limit=100')
      .then((res) => {
        if (res.data && res.data.products) {
          const fetchedProducts = res.data.products;
          setProducts(fetchedProducts);
          setFilteredProducts(fetchedProducts);

          // Unikal toifalarni (Categories) aniqlash
          const uniqueCats: string[] = Array.from(
            new Set(fetchedProducts.map((p: Product) => p.category))
          );
          setCategories(['All', ...uniqueCats]);
        } else {
          setError("Ma'lumotlar formati xato");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Mahsulotlarni vaqtinchalik yuklab bo'lmadi. Iltimos birmuncha vaqtdan so'ng yana urinib ko'ring.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Mahsulotlarni qidirish, saralash va filtrlash
  useEffect(() => {
    let result = [...products];

    // 1. Qidiruv filtri
    if (searchTerm.trim() !== '') {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.brand && p.brand.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // 2. Toifa (Category) filtri
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // 3. Saralash (Sort) tartibi
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating-desc') {
      result.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, sortBy, products]);

  // Savatga muvaffaqiyatli qo'shilganlik barini ko'rsatish
  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      
      {/* Sarlavha qismi */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Xaridlar Katalogi</h1>
        <p className="text-sm text-gray-500">Omborimizdagi barcha mahsulotlar ro'yxati bilan tanishing, o'zingizga yoqqanini savatga qo'shing.</p>
      </div>

      {/* Qidirish va Saralash Paneli */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
        
        {/* Search input */}
        <div className="relative col-span-1 md:col-span-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Mahsulot nomi yoki brendini yozing..."
            className="w-full bg-white border border-gray-200 text-gray-900 rounded-xl pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
          <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
        </div>

        {/* Sort Select */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full bg-white border border-gray-200 text-gray-900 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer"
          >
            <option value="default">Odatiy tartibda</option>
            <option value="price-asc">Narx bo'yicha (arzonidan qimmatiga)</option>
            <option value="price-desc">Narx bo'yicha (qimmatidan arzoniga)</option>
            <option value="rating-desc">Reyting bo'yicha (eng yuqori)</option>
          </select>
          <ArrowUpDown className="absolute right-4 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Toifalar (Category Filter Tabs) */}
      <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex space-x-2 min-w-max">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize tracking-wide transition ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {cat === 'All' ? 'Barchasi' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Yuklash holati */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div key={n} className="animate-pulse flex flex-col space-y-4 border border-gray-100 p-4 rounded-2xl bg-white shadow-sm">
              <div className="bg-gray-200 h-48 w-full rounded-xl"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-500 font-medium mb-2">{error}</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-100">
          <p className="text-gray-500 font-medium">Uzr, qidiruvingiz bo'yicha mahsulot topilmadi.</p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
            className="mt-4 text-sm text-indigo-600 font-semibold hover:underline"
          >
            Filtrlarni tozalash
          </button>
        </div>
      ) : (
        /* Mahsulotlar to'plami */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:border-indigo-150 transition-all duration-300 overflow-hidden"
            >
              <div className="relative bg-gray-50 aspect-square overflow-hidden flex items-center justify-center p-4">
                {product.discountPercentage && product.discountPercentage > 0 && (
                  <span className="absolute top-3 left-3 bg-rose-500 text-white font-bold text-[10px] px-2.5 py-1 rounded-lg z-10">
                    -{Math.round(product.discountPercentage)}%
                  </span>
                )}
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="object-contain h-48 w-48 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase font-sans">
                    {product.category}
                  </span>
                  <Link to={`/products/${product.id}`} className="block">
                    <h3 className="font-bold text-gray-900 text-sm line-clamp-1 hover:text-indigo-600 transition">
                      {product.title}
                    </h3>
                  </Link>
                  <div className="flex items-center space-x-1 px-1 py-0.5 rounded text-xs text-amber-500">
                    <Star className="h-3.5 w-3.5 fill-amber-500 stroke-amber-500" />
                    <span className="font-medium text-gray-700">{product.rating}</span>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed pt-1">
                    {product.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-gray-50">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-base font-extrabold text-gray-950">${product.price.toFixed(2)}</span>
                    </div>
                    <Link
                      to={`/products/${product.id}`}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition"
                    >
                      Batafsil
                    </Link>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`w-full flex items-center justify-center p-2.5 text-xs font-semibold rounded-xl text-white transition ${
                      addedProductId === product.id
                        ? 'bg-emerald-600 hover:bg-emerald-700'
                        : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                  >
                    {addedProductId === product.id ? (
                      <>Qo'shildi!</>
                    ) : (
                      <>
                        <ShoppingCart className="h-4 w-4 mr-1.5" />
                        Savatga qo'shish
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
