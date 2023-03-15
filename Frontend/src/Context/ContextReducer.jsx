import { Actions } from "./ContextActions";

function checkCartLocal(){
  try {
    let token = localStorage.getItem('cart');
    if(!token){
      return false;
    }else{
      return true;
    }
  } catch (error) {
    return false;
  }
}
export const InitialState = {
  cart: [],
}

export function ContextReducer(state, action) {
  switch (action.type) {
    case Actions.ADD_TO_CART: {
      let newItem = action.payload;
      let checkProduct = state.cart.find((itemproduct) => itemproduct.key === newItem.key);
      let MyCart = checkProduct ?
        {
          ...state, cart: state.cart.map((item) => item.key === newItem.key ?
            { ...item, quantity: item.quantity + 1, subtotal: (item.price * item.quantity).toFixed(2) }
            :
            { item })
        }
        :
        { ...state, cart: [...state.cart, newItem]};
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