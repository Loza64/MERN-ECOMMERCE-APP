import React from "react";
import { ShoppingCartList } from "../Styles/styled-components";
import CartItem from "./CartItem";

export default function CartList() {
  return (
    <ShoppingCartList>
      <CartItem />
    </ShoppingCartList>
  );
}