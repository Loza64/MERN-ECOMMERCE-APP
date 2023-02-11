import React from "react";
import { ContextProvider } from '../Context/Context';
import ProductItem from './ProductItem';

export default function ProductsList() {
  const { products } = ContextProvider();

  return (
    <div>
      {
        products.map(
          product => (
            <ProductItem key={product._id} product={product} />
          )
        )
      }
    </div>
  )
}