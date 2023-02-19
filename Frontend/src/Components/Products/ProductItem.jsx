import React from "react";

export default function ProductItem({ product }) {
  return (
    <div className="target">
      <div className="head-target">
        <img src={product.image.url} alt="imgproduct" />
      </div>
      <div className="body-target">
        <label className="product-name">{product.company} - {product.name}</label>
        <div className="content-product-price">
          <label className="product-price">US${product.price}</label>
          {
            product.discount > 0 ?
              (<label className="product-discount">-{Math.round(product.discount * 100)}%</label>)
              : null
          }
        </div>
      </div>
    </div>
  );
}