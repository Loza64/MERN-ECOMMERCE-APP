/* eslint-disable no-fallthrough */
import { Actions } from "./ContextActions";

export const InitialState = {
  cart: JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : [],
};

export function ContextReducer(state, action) {
  switch (action.type) {
    case Actions.ADD_TO_CART: {
      let newItem = action.payload;
      let checkProduct = state.cart.find((itemproduct) => itemproduct.key === newItem.key);

      let MyCart = checkProduct ? state.cart.map((item) =>
        (item.key === newItem.key ? { ...item, quantity: item.quantity + 1 } : item)) : 
        [...state.cart, newItem];

      localStorage.setItem("cart", JSON.stringify(MyCart));
      return { ...state, cart: MyCart };
    }

    case Actions.QUANTITY_PRODUCT: {
      let { cant, productkey } = action.payload;
      let Cart = state.cart.map((item) => item.key === productkey ? { ...item, quantity: cant } : item);
      localStorage.setItem("cart", JSON.stringify(Cart))
      return { ...state, cart: Cart }
    }

    case Actions.REMOVE_PRODUCT_FROM_CART: {
      let productkey = action.payload;
      let Cart = state.cart.filter((item) => item.key !== productkey);
      localStorage.setItem("cart", JSON.stringify(Cart));
      return { ...state, cart: Cart };
    }

    case Actions.CLEAR_CART: {
      localStorage.setItem("cart", JSON.stringify([]));
      return { ...state, cart: action.payload };
    }
    default:
      return state;
  }
}
