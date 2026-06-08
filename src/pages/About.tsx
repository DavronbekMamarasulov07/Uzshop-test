/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Info, ShieldCheck, Mail, ShoppingBag, Globe, Zap, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const values = [
    {
      icon: ShieldCheck,
      title: "Kafolatlangan Sifat",
      desc: "Biz faqatgina tekshirilgan va yuqori sifat standartlariga javob beradigan mahsulotlarni taqdim etamiz."
    },
    {
      icon: Zap,
      title: "Tezkor Yetkazish",
      desc: "Buyurtmalar imkon qadar tez, xavfsiz va ehtiyotkorlik bilan manzilingizga yetkazib beriladi."
    },
    {
      icon: Users,
      title: "Mijozlarni Qo'llab-quvvatlash",
      desc: "Sizning barcha savollaringiz va muammolaringizga tezkor yechim topadigan qo'llab-quvvatlash xizmatimiz bor."
    }
  ];

  const milestones = [
    { year: "2024", title: "Kompaniya asos solindi", desc: "Toshkent shahrida kichik jamoa bilan faoliyatimizni boshladik." },
    { year: "2025", title: "10,000 dan ortiq mijoz", desc: "Sifat va ishonchli xizmat tufayli butun respublikada tanildik." },
    { year: "2026", title: "E-Commerce Integratsiyasi", desc: "Yangi veb-sayt va integratsiyalangan qidiruv, savatcha tizimi ishga tushdi." }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 pb-20">
      
      {/* Intro section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center space-x-1 border border-indigo-200 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">
            <Info className="h-4 w-4" />
            <span>Biz haqimizda</span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
            UzShop — O'zbekistondagi Zamonaviy <span className="text-indigo-600">E-Commerce</span> Do'koni!
          </h1>
          <p className="text-gray-600 leading-relaxed text-sm">
            Bizning asosiy maqsadimiz — iste'molchilarga zamon talablariga mos keluvchi, qulay, tezkor va ishbarmon platformani taqdim etish. DummyJSON xalqaro platformasi orqali tanlangan, eng yangi va sifatli mahsulotlarni taklif etamiz. Siz do'konimizdan istalgan vaqtda turli toifadagi jihozlar, kiyim-kechaklar, parvarish vositalarini osongina tanlab buyurtma qilishingiz mumkin.
          </p>
          <div className="flex space-x-4">
            <Link to="/products" className="bg-indigo-600 border border-transparent hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition transition-all">
              Mahsulotlarni ko'rish
            </Link>
          </div>
        </div>
        <div className="relative flex justify-center">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 blur-2xl opacity-15"></div>
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop"
            alt="Bizning Jamoa"
            className="relative rounded-2xl shadow-xl border border-gray-100 object-cover w-full h-[320px] max-w-lg"
          />
        </div>
      </section>

      {/* Bizning qadriyatlar */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Bizning Asosiy Qadriyatlarimiz</h2>
          <p className="text-sm text-gray-500 max-w-xl mx-auto">Biz biznes yuritishda ishonch, mukammallik va mas'uliyat tamoyillariga tayanamiz.</p>
          <div className="h-1 w-12 bg-indigo-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, idx) => {
            const IconComponent = v.icon;
            return (
              <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                  <IconComponent className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-gray-900 text-base">{v.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed font-normal">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Tariximiz / Rivojlanish bosqichlari */}
      <section className="space-y-8 bg-gray-50 p-8 rounded-3xl border border-gray-100">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Rivojlanish Tariximiz</h2>
          <div className="h-1 w-12 bg-indigo-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {milestones.map((m, idx) => (
            <div key={idx} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm relative space-y-3">
              <span className="font-extrabold text-3xl text-indigo-600 font-sans block">{m.year}</span>
              <h3 className="font-bold text-gray-900 text-base">{m.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Jamoa a'zolari */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-sans">Professional Jamoamiz</h2>
          <p className="text-sm text-gray-500 max-w-xl mx-auto">Sizga mukammal xizmat ko'rsatish ustida tinimsiz ishlayotgan malakali jamoa a'zolari.</p>
          <div className="h-1 w-12 bg-indigo-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm flex flex-col items-center p-6 text-center space-y-4 hover:-translate-y-1 transition duration-300">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop"
              alt="Azizbek Alimov"
              className="h-24 w-24 rounded-full object-cover border-2 border-indigo-100"
            />
            <div>
              <h4 className="font-bold text-gray-900 text-base">Azizbek Alimov</h4>
              <p className="text-xs text-indigo-600 font-medium">Asoschi & Bosh Direktor</p>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm flex flex-col items-center p-6 text-center space-y-4 hover:-translate-y-1 transition duration-300">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
              alt="Shahlo Karimova"
              className="h-24 w-24 rounded-full object-cover border-2 border-indigo-100"
            />
            <div>
              <h4 className="font-bold text-gray-900 text-base font-sans">Shahlo Karimova</h4>
              <p className="text-xs text-indigo-600 font-medium font-sans">Operatsion Menejer</p>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm flex flex-col items-center p-6 text-center space-y-4 hover:-translate-y-1 transition duration-300">
            <img
              src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop"
              alt="Davronbek Umarov"
              className="h-24 w-24 rounded-full object-cover border-2 border-indigo-100"
            />
            <div>
              <h4 className="font-bold text-gray-900 text-base">Davronbek Umarov</h4>
              <p className="text-xs text-indigo-600 font-medium font-sans">Yetkazib Berish Nazoratchisi</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
