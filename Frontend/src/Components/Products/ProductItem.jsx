import React from "react";
import { BsFillCartPlusFill, BsFillCartXFill } from 'react-icons/bs'
import { BtnCart } from "../Styles/styled-components";

export default function ProductItem({ product }) {
  const { key, image, name, company, price, stock, discount } = product;
  if (stock > 0) {
    return (
      <div className="target">
        <BtnCart>
          <BsFillCartPlusFill className="react-icon" />
          {discount > 0 ? (<label className="product-discount">{Math.round(discount * 100)}%</label>) : null}
        </BtnCart>
        <div className="head-target">
          <img src={image.url} alt="imgproduct" />
        </div>
        <div className="body-target">
          <label className="product-name">{company} - {name}</label>
          {
            discount > 0 ?
              (
                <div className="content-product-price">
                  <label className="product-price" style={{ textDecoration: "line-through", color: "grey" }}>${price}</label>
                  <label className="price-discount">${Math.round(price - discount * price)}</label>
                </div>
              ) : (
                <div className="content-product-price">
                  <label className="product-price">${price}</label>
                </div>
              )
          }
        </div>
      </div>
    );
  } else {
    return (
      <div className="target">
        <BtnCart>
          <BsFillCartXFill className="react-icon disable" />
          <label className="no-product">Not available</label>
        </BtnCart>
        <div className="head-target">
          <img src={image.url} alt="imgproduct" />
        </div>
        <div className="body-target">
          <label className="product-name">{company} - {name}</label>
          {
            discount > 0 ?
              (
                <div className="content-product-price">
                  <label className="product-price" style={{ textDecoration: "line-through", color: "grey" }}>${price}</label>
                  <label className="price-discount">${Math.round(price - discount * price)}</label>
                </div>
              ) : (
                <div className="content-product-price">
                  <label className="product-price">${price}</label>
                </div>
              )
          }
        </div>
      </div>
    );
  }
}