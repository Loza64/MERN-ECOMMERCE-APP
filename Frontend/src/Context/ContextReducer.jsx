import { Actions } from "./ContextActions";

export const InitialState = {
  cart: {
    items: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
  }
}

export function ContextReducer(state, action) {
  switch (action.type) {
    case Actions.ADD_TO_CART: {
      let newitem = action.payload;
      let existItem = state.cart.items.find((item) => item.key === newitem.key);
      let checkItemInCart = state.cart.items.map((item) => item.key === existItem.key ? newitem : item);
      let cartItems = existItem ? checkItemInCart : [...state.cart.items, newitem];
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
    case Actions.REMOVE_ALL_FROM_CART: {

    }
    case Actions.REMOVE_ONE_FROM_CART: {

    }
    case Actions.CLEAR_CART: {

    }
    default: return state;
  }
}