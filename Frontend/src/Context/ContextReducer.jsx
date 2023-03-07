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
  cart: !checkCartLocal() ? [] : JSON.stringify(localStorage.getItem('cart')),
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
        { ...state, cart: [...state.cart, newItem]};
        localStorage.setItem('cart', JSON.stringify(MyCart));
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