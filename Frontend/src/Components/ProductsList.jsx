import React from "react";
import { ContextProvider } from '../Context/Context';
import ProductItem from './ProductItem';
const { products } = ContextProvider();

export default function ProductsList() {
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