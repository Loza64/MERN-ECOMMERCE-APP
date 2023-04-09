import React from "react";
import Pago from "../Pago";
import CartList from './CartList'

export default function Cart() {
  return (
    <div>
      <br />
      <br />
      <br />
      <h1 className="text-center title-cart">Shopping Cart</h1>
      <div className="flex-cart">
        <CartList />
        <Pago />
      </div>
    </div>
  );
}