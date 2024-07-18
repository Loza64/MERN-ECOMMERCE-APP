/* eslint-disable react-hooks/exhaustive-deps */
import Pago from "../Pago";
import CartList from './CartList'
import { ContextProvider } from "../../Context/ContextConsumer";
import Products from "../Products/Products";
import Top from "../Top";
import Title from "../Title";
import { useEffect } from "react";

export default function Cart() {

  const { cart, system, setType } = ContextProvider();

  useEffect(()=>{
    setType("All")
  }, [])

  return !system ? null : cart.length > 0 ? (
    <div>
      <Top state={true} />
      <Title Title={"Shopping"} SubTitle={"Cart"} />
      <div className="flex-cart">
        <CartList />
        <Pago />
      </div>
      <br />
      <Products TopState={false} color={"blue"}/>
    </div>
  ) : (
    <div className="list-empty">
      <label className="message">Your cart is currently empty.</label>
    </div>
  )
}