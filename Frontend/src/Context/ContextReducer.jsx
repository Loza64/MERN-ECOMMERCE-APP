import { Actions } from "./ContextActions";

export const InitialState = {
  cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
}

export function ContextReducer(state, action) {
  switch (action.type) {
    case Actions.ADD_TO_CART: {
      let newItem = action.payload;
      let MyCart = state.cart.find((itemproduct) => itemproduct.key === newItem.key) ?
        {
          ...state, cart: state.cart.map((item) => item.key === newItem.key ? 
          { ...item, quantity: item.quantity + 1 }
          :
          { item }) 
        }
        :
        { ...state, cart: [...state.cart, { ...newItem, quantity: 1 }] }
      return MyCart;
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