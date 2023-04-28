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
import ProductsByCategorie from './Components/Categories/ProductsByCategorie'
import Cart from './Components/Cart/Cart';
import DetailProduct from './Components/Products/DetailProduct';

export default function App() {
  const { categories, products } = ContextProvider();
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/Cart' element={<Cart />} />
        <Route path='/' element={<Principal />} />
        <Route path='/*' element={<Principal />} />
        <Route path='/Terms' element={<Terms />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Shoppings' element={<MyShoppings />} />
        <Route path='/Products' element={<Products SubTopic={"Our"} Topic={"Products"} Top={'40px'} TopState={true} />} />
        <Route path='/Categories' element={<Categories SubTopic={"Look at our"} Topic={"Categories"} />} />
        {categories.map(category => (<Route path={`/${category.name}`} element={<ProductsByCategorie key={category._id} CategoryKey={`${category.key}`} />} />))}
        {products.map(product => (<Route path={`/${product.name}`} element={<DetailProduct key={product._id} productkey={`${product.key}`} />} />))}
      </Routes>
    </div>
  );
}