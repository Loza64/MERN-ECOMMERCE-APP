import React from "react";
import { BsFillCartPlusFill } from 'react-icons/bs'
import { BtnCart } from "../Styles/styled-components";

export default function ProductItem({ product }) {
  return (
    <div className="target">
      <BtnCart>
        <BsFillCartPlusFill className="react-icon" />
        {product.discount > 0 ? (<label className="product-discount">{Math.round(product.discount * 100)}%</label>) : null}
      </BtnCart>
      <div className="head-target">
        <img src={product.image.url} alt="imgproduct" />
      </div>
      <div className="body-target">
        <label className="product-name">{product.company} - {product.name}</label>

        {
          product.discount > 0 ?
            (
              <div className="content-product-price">
                <label className="product-price" style={{ textDecoration: "line-through", color: "grey" }}>${product.price}</label>
                <label className="price-discount">${Math.round(product.price - product.discount * product.price)}.00</label>
              </div>

            ) : (
              <div className="content-product-price">
                <label className="product-price">${product.price}</label>
              </div>
            )
        }
      </div>
    </div>
  );
}