import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar'
import { ContextProvider } from './Context/Context';
import ProductsCategory from './Components/Products/ProductsCategory';
import Principal from './Components/Principal';
import Login from './Components/Login';
import CategorieList from './Components/Categories/CategorieList';
import Terms from './Components/Terms';
import MyShoppings from './Components/MyShoppings';
import Default from './Components/Default';

export default function App() {
  const { categories } = ContextProvider();
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/*' element={<Default />} />
        <Route path='/' element={<Principal />} />
        <Route path='/Terms' element={<Terms />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Products' element={<}
        <Route path='/Shoppings' element={<MyShoppings />} />
        <Route path='/Categories' element={<CategorieList />} />
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