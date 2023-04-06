import React from "react";
import { FaTrashAlt } from 'react-icons/fa'
import { ContextProvider } from "../../Context/Context";

export default function CartItem({ item }) {
  const { key, name, image, company, price, quantity, discount } = item;
  const {RemoveFromCart} = ContextProvider();
  return (
    <div className="item">
      <div className="image">
        <img src={image.url} alt="imgproduct" />
      </div>
      <div className="detailproduct">
        <div className="flex-product">
          <label className="name">{name}</label>
          <label className="subtotal">SubTotal: ${(price * quantity).toFixed(2)}</label>
        </div>
        <label className="marca">{company}</label>
        <label className="price">Price: ${price}</label>
        <div className="flex-buttoms">
          <div className="quantity-buttoms">
            <button><i class="fa fa-minus" /></button>
            <label>{quantity}</label>
            <button><i class="fa fa-plus" /></button>
          </div>
          <div className="remove-buttom">
            <FaTrashAlt className="react-icon" /><label>Remove</label>
          </div>
        </div>
      </div>
    </div>
  );
}