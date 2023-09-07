// import React, { useState } from 'react';
import { BrowserRouter , Route, Routes , Outlet } from 'react-router-dom';
import AdminLogin from './components/Admin/AdminLogin';
import AdminRegister from './components/Admin/AdminRegister';
import NavigationMenu from './components/NavigationMenu';
import ProductDetails from './components/Product/ProductDetails';
import ProductList from './components/Product/ProductList'
import ProductForm from './components/Product/ProductForm'
import SaleDetails from './components/Sale/SaleDetails'
import SaleList from './components/Sale/SaleList'
import SaleForm from './components/Sale/SaleForm'
import Footer from './components/Footer';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import Home from './components/Home';


const App = () => {

  return (
    <BrowserRouter>
        <NavigationMenu/>
        <Routes>
          <Route path="/login" element={<AdminLogin/>} ></Route>
          <Route path="/register" element={<AdminRegister/>} ></Route>
          <Route path="/product" element={<Outlet />}>
            <Route path=":id" element={<ProductDetails/>}></Route>
            <Route path="update/:id" element={<ProductForm/>}></Route>
            <Route path="add" element={<ProductForm/>}></Route>
            <Route path="" element={<ProductList/>}></Route>
          </Route>
          <Route path="/sale" element={<Outlet />}>
            <Route path=":id" element={<SaleDetails/>}></Route>
            <Route path="update/:id" element={<SaleForm/>}></Route>
            <Route path="add" element={<SaleForm/>}></Route>
            <Route path="" element={<SaleList/>}></Route>
          </Route>
          <Route path="*" element={<Home/>}></Route>
        </Routes>
        <Footer/>
    </BrowserRouter>
  );
};

export default App;
