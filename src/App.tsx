/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans selection:bg-indigo-600 selection:text-white">
        {/* Navigatsiya paneli */}
        <Navbar />

        {/* Sahifalar kontenti */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            {/* 404 xatolik bo'lganda Bosh sahifaga yo'naltiramiz */}
            <Route path="*" element={<Home />} />
          </Routes>
        </div>

        {/* Footer qismi */}
        <Footer />
      </div>
    </Router>
  );
}
