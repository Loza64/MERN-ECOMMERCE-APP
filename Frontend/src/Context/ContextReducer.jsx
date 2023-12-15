import { Actions } from "./ContextActions";

export const InitialState = {
  cart: []
}

export function ContextReducer(state, { type, payload }) {
  switch (type) {
    //Actions Cart

    case Actions.CART_LIST: {
      const { cart } = payload;
      return { ...state, cart }
    }

    default: return state;
  }
}