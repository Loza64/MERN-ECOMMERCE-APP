import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar'
import { ContextProvider } from './Context/Context';
import Principal from './Components/Principal';
import Login from './Components/Login';
import Categories from './Components/Categories/Categories';
import Terms from './Components/Terms';
import MyShoppings from './Components/MyShoppings';
import Products from './Components/Products/Products'
import ProductsCategory from './Components/Products/ProductsCategory'
import Top from './Components/Top';
import CategorieItem from './Components/Categories/CategorieItem';

export default function App() {
  const { categories } = ContextProvider();
  return (
    <div>
      <Navbar />
      <Top/>
      <Routes>
        <Route path='/' element={<Principal />} />
        <Route path='/*' element={<Principal />} />
        <Route path='/Terms' element={<Terms />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Products' element={<Products />} />
        <Route path='/Shoppings' element={<MyShoppings />} />
        <Route path='/Categories' element={<Categories SubTopic={"Look at our"} Topic={"Categories"}/>} />
        {
          categories.map(
            category => (
              <Route path={`${category.name}`} element={<ProductsCategory key={category._id} categorykey={`${category.key}`} />} />
            )
          )
        }
      </Routes>
    </div>
  );
}