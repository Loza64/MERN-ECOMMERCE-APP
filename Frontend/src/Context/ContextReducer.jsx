/* eslint-disable no-fallthrough */
import { Actions } from "./ContextActions";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const InitialState = {
  cart: JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : [],
  userCookies: cookies.get("UserCookies") ? JSON.parse(cookies.get("User")) : false
};

export function ContextReducer(state, action) {
  switch (action.type) {
    //User Acctions
    case Actions.USER_LOGIN: {
      if (!state.userCookies) {
        let userinfo = action.payload;
        cookies.set("UserCookies", JSON.stringify(userinfo), { path: "/" })
        return { ...state, userCookies: userinfo }
      }
    }
    case Actions.USER_SIGN_OUT: {
      let sessionState = action.payload;
      cookies.remove("UserCookies");
      return { ...state, userCookies: sessionState }
    }

    //Acctions Cart
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
