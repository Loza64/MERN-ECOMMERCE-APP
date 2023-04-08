import React from "react";
import { ShoppingCartList } from "../Styles/styled-components";
import CartItem from "./CartItem";
import { ContextProvider } from '../../Context/Context'

export default function CartList() {
  const { cart } = ContextProvider();
  return (
    <ShoppingCartList>
      {cart.map(items => (<CartItem key={items._id} item={items} />))}
    </ShoppingCartList>
  );
}