import React from "react";
import { FaTrashAlt } from 'react-icons/fa'

export default function CartItem({ item }) {
  const {key, name, company, price, cant, subtotal, discount} = item;
  return (
    <div className="item">
      <div className="image">
        <img src="https://res.cloudinary.com/ufostart-development/image/upload/v1675916495/ECOMMERCE/hq1gxwh4l6mnjiv6i7ir.jpg" alt="" srcset="" />
      </div>
      <div className="detailproduct">
        <div className="flex-product">
          <label className="name">{name}</label>
          <label className="subtotal">SubTotal: ${subtotal}</label>
        </div>
        <label className="marca">{company}</label>
        <label className="price">Price: ${price}</label>
        <div className="flex-buttoms">
          <div className="quantity-buttoms">
            <button><i class="fa fa-minus" /></button>
            <label>{cant}</label>
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