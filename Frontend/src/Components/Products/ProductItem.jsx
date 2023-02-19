import React from "react";

export default function ProductItem({ product }) {
  return (
    <div className="target">
      <div className="head-target">
        <img src={product.image.url} alt="imgproduct" />
      </div>
      <div className="body-target">
        <label className="product-name">{product.company} - {product.name}</label>
        <label className="product-price">US${product.price}</label>
      </div>
    </div>
  );
}