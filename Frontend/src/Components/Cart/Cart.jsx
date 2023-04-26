import React from "react";
import Pago from "../Pago";
import CartList from './CartList'
import { ContextProvider } from "../../Context/Context";
import Products from "../Products/Products";
import Top from "../Top";

export default function Cart() {
  const { cart } = ContextProvider();
  if (cart.length === 0) {
    return (
      <div className="list-empty">
        <label className="message">Your cart is currently empty.</label>
      </div>
    )
  } else {
    return (
      <div>
        <Top state={true} />
        <h1 className="text-center title-cart py-2">Shopping Cart</h1>
        <div className="flex-cart">
          <CartList />
          <Pago />
        </div>
        <Products SubTopic={"See more"} Topic={"Products"} TopState={false}/>
      </div>
    )
  }
}