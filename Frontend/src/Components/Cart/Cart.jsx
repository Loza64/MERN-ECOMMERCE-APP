import React from "react";
import Pago from "../Pago";
import CartList from './CartList'
import { ContextProvider } from "../../Context/Context";

export default function Cart() {
  const { cart } = ContextProvider();
  if (cart.length === 0) {
    return (
      <div className="list-empty">
        <br />
        <br />
        <br />
        <label className="message">Your cart is currently empty.</label>
      </div>
    )
  } else {
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
    )
  }
}