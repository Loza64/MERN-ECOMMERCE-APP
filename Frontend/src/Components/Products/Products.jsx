import React from "react";
import ProductsList from "./ProductsList";

export default function Products({ Topic }) {
  return (
    <div>
      <h1 className="text-center mt-3">{Topic}</h1>
      <ProductsList />
    </div>
  )
}