import { Actions } from "./ContextActions";

export const InitialState = {
  cart: JSON.parse(localStorage.getItem("cart"))
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
};

export function ContextReducer(state, action) {
  switch (action.type) {
    case Actions.ADD_TO_CART: {
      let newItem = action.payload;
      let checkProduct = state.cart.find(
        (itemproduct) => itemproduct.key === newItem.key
      );

      let MyCart = checkProduct
        ? state.cart.map((item) =>
            item.key === newItem.key
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.cart, newItem];
        
      localStorage.setItem("cart", JSON.stringify(MyCart));
      return { ...state, cart: MyCart };
    }
    case Actions.REMOVE_ALL_FROM_CART: {
    }
    case Actions.REMOVE_ONE_FROM_CART: {
    }
    case Actions.CLEAR_CART: {
    }
    default:
      return state;
  }
}
