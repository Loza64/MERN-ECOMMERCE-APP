import { Actions } from "./ContextActions";
import Cookie from 'universal-cookie';

const Token = "token";
const CartLocal = "Cart";
const cookie = new Cookie();


const setCookie = (cookiename, values) => {
  cookie.set(cookiename, values, {
    path: '/',
    secure: true,
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 5//Expires in six hours
  })
}

export const InitialState = {
  cart: JSON.parse(localStorage.getItem(CartLocal)) ? JSON.parse(localStorage.getItem(CartLocal)) : [],
  token: cookie.get(Token) ? cookie.get(Token) : null
}

export function ContextReducer(state, { type, payload }) {
  switch (type) {

    //Actions token
    case Actions.SAVE_TOKEN: {
      const { token } = payload;
      setCookie(Token, token)
      return { ...state, token }
    }

    case Actions.REMOVE_TOKEN: {
      cookie.remove(Token)
      return { ...state, token: null }
    }

    //Actions Cart

    case Actions.CART_LIST: {
      const { cart } = payload;
      return { ...state, cart }
    }

    case Actions.ADD_TO_CART: {
      const { product } = payload;
      const { key, image, name, company, price, stock, discount } = product
      let checkProduct = state.cart.find(item => item.key === key);
      let ModifyCant = state.cart.map(
        item => (
          item.key === key ? { ...item, quantity: item.quantity < stock ? ++item.quantity : stock } : item
        )
      );

      let CartList = checkProduct ? ModifyCant : [...state.cart, { key, image, name, company, price, discount, quantity: 1 }];
      localStorage.setItem(CartLocal, JSON.stringify(CartList));
      return { ...state, cart: CartList };
    }

    case Actions.QUANTITY_PRODUCT: {
      let CartList;
      let { cant, productkey, stock } = payload;
      if (stock <= 0) {
        CartList = state.cart.filter(item => item.key !== productkey);
      } else {
        CartList = state.cart.map(
          item => item.key === productkey ? { ...item, quantity: cant < stock ? cant : stock } : item
        );
      }
      localStorage.setItem(CartLocal, JSON.stringify(CartList))
      return { ...state, cart: CartList }
    }

    case Actions.REMOVE_PRODUCT_FROM_CART: {
      let productkey = payload;
      let CartList = state.cart.filter((item) => item.key !== productkey);
      localStorage.setItem(CartLocal, JSON.stringify(CartList));
      return { ...state, cart: CartList };
    }

    case Actions.CLEAR_CART: {
      localStorage.removeItem(CartLocal);
      return { ...state, cart: [] };
    }

    default: return state;
  }
}