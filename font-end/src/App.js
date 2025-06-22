import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import ClientLayout from './layouts/ClientLayout';
import HomePage from './pages/client/Home/HomePage'
import ProductDetail from './components/client/productdetail/productdetail';
import ProductFlash from "./components/client/product/productSale";
import Productnew from "./components/client/product/productnew";


function App() {
  return (
    <Routes>
      <Route path="/" element={<ClientLayout />}>
        {/* Đây là index route, sẽ được render khi URL là "/" */}
        <Route index element={<HomePage />} /> {/* <-- Sử dụng HomePage làm trang chủ */}

        <Route path="home/products" element={<Productnew />} />
        <Route path="home/products/flash" element={<ProductFlash />} />
        <Route path="product/:id" element={<ProductDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
