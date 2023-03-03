import React from "react";
import { FaTrashAlt } from 'react-icons/fa'

export default function CartItem({ product }) {
  return (
    <div className="item">
      <div className="image">
        <img src="https://res.cloudinary.com/ufostart-development/image/upload/v1675916495/ECOMMERCE/hq1gxwh4l6mnjiv6i7ir.jpg" alt="" srcset="" />
      </div>
      <div className="detailproduct">
        <label className="name">Monitor de 27 pulgadas</label>
        <label className="marca">Amazon Basic</label>
        <label className="price">$95.00</label>
        <div className="flex-buttoms">
          <div className="quantity-buttoms">
            <button><i class="fa fa-minus" /></button>
            <label>1</label>
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