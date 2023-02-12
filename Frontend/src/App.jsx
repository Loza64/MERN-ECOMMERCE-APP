import React from 'react';
import ProductsList from './Components/ProductsSeccion/ProductsList';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar'
import { ContextProvider } from './Context/Context';

export default function App() {
  const [categories] = ContextProvider();
  return (
    <div>
      <Navbar />
      <Routes>
        {
          categories.map(
            category => (
              <Route path={`${category.name}`} />
            )
          )
        }
      </Routes>
    </div>
  );
}