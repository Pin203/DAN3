import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom'; 
import ClientLayout from './layouts/ClientLayout';
import ProductDetail from './components/client/productdetail/productdetail';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ClientLayout />}></Route>
        <Route path="/product/:id" element={<ProductDetail />} />
      

      </Routes>
    </div>
  );
}

export default App;
