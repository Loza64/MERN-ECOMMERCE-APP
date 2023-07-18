import { Actions } from "./ContextActions";
import { Login, SignUp } from "../Api/RestApi";

const CartLocal = "Cart";
const UserLocal = "UserSession";

export const InitialState = {
  cart: JSON.parse(localStorage.getItem(CartLocal)) ? JSON.parse(localStorage.getItem(CartLocal)) : [],
  userSession: JSON.parse(localStorage.getItem(UserLocal)) ? JSON.parse(localStorage(UserLocal)) : null
};

export async function ContextReducer(state, action) {
  switch (action.type) {

    //Actions user
    case Actions.USER_LOGIN: {
      const { login } = action.payload;
      const userlogin = (await Login(login)).data

      if (!userlogin) {
        localStorage.setItem(UserLocal, null)
        return { ...state, userSession: null}
      } else {
        localStorage.setItem(UserLocal, JSON.stringify(userlogin))
        return { ...state, userSession: userlogin }
      }
    }

    //Actions Cart
    case Actions.ADD_TO_CART: {
      let { product } = action.payload;
      let checkProduct = state.cart.find((productItem) => productItem.key === product.key);
      let ModifyCant = state.cart.map(
        item => (
          item.key === product.key ?
            {
              ...item, quantity: item.quantity < product.stock ? ++item.quantity : product.stock
            } : item
        )
      );

      let CartList = checkProduct ? ModifyCant : [...state.cart, { ...product, quantity: 1 }];
      localStorage.setItem(CartLocal, JSON.stringify(CartList));
      return { ...state, cart: CartList };
    }

    case Actions.QUANTITY_PRODUCT: {
      let CartList;
      let { cant, productkey, stock } = action.payload;
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
      let productkey = action.payload;
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