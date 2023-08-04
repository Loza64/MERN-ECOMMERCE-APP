import React from "react";
import Pago from "../Pago";
import CartList from './CartList'
import { ContextProvider } from "../../Context/ContextConsumer";
import Products from "../Products/Products";
import Top from "../Top";
import Title from "../Title";

export default function Cart() {
  const { cart, system } = ContextProvider();
  return !system ? null : cart.length > 0 ? (
    <div>
      <Top state={true} />
      <Title Title={"Shopping"} SubTitle={"Cart"} />
      <div className="flex-cart">
        <CartList />
        <Pago />
      </div>
      <Products SubTopic={"See more"} Topic={"Products"} TopState={false} />
    </div>
  ) : (
    <div className="list-empty">
      <label className="message">Your cart is currently empty.</label>
    </div>
  )
}