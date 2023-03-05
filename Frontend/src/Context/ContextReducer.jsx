import { Actions } from "./ContextActions";

export const InitialState = {
  cart: []
}

export function ContextReducer(state, action) {
  switch (action.type) {
    case Actions.ADD_TO_CART: {

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