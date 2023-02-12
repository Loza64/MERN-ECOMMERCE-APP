import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar'
import { ContextProvider } from './Context/Context';
import ProductsCategory from './Components/ProductsSeccion/ProductsCategory';
import Principal from './Components/Principal';
import Login from './Components/Login';

export default function App() {
  const { categories } = ContextProvider();
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Principal />} />
        <Route path='/Login' element={<Login />} />
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