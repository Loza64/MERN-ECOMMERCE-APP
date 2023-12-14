import Swal from "sweetalert2";
import PropTypes from 'prop-types';
import { Actions } from "./ContextActions";
import { ContextReducer, InitialState } from "./ContextReducer";
import { useContext, useState, createContext, useReducer, useEffect } from "react";
import { GetCategories, GetProducts, GetProductByKey, Login, SignUp, GetCart, Profile, Logout } from "../Api/RestApi";

ContextConsumer.propTypes = {
  children: PropTypes.node.isRequired,
}

const Context = createContext()

export const ContextProvider = () => useContext(Context)

export default function ContextConsumer({ children }) {

  //hooks
  const [page, setPage] = useState(1);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [system, setSystem] = useState(true);
  const [products, setProducts] = useState({});
  const [session, setSession] = useState(false);
  const [categorie, setCategorie] = useState("");
  const [categories, setCategories] = useState([]);

  const [state, dispatch] = useReducer(ContextReducer, InitialState);
  const { cart } = state;

  function SystemError(err) {
    Swal.fire({
      title: 'Connection server error',
      text: err + ', we will solve this problem as soon as possible.',
      icon: 'error',
      button: "Aceptar",
      footer: '<a href="mailto:ufostartservices@gmail.com">Report problem</a>'
    }).then(() => {
      setSystem(false);
    })
  }

  // Functions products
  const getCategories = async () => {
    GetCategories().then(({ data }) => {
      setCategories(data.result);
    }).catch((err) => {
      SystemError(err)
    });
  };

  useEffect(() => {
    GetProducts(search, categorie, page).then(({ data }) => {
      setProducts(data.result);
    }).catch((err) => {
      SystemError(err)
    });
  }, [search, categorie, page])

  useEffect(() => {
    Profile().then(({ data }) => {
      setUser(data)
    }).catch((err) => {
      console.log(err)
    })
  }, [session])

  const getProduct = async (ProductKey) => {
    const { data } = await GetProductByKey(ProductKey);
    return data.product;
  };

  useEffect(() => {
    GetCart().then(({ data }) => {
      dispatch({ type: Actions.CART_LIST, payload: { cart: data.cart } })
    }).catch(() => {
      dispatch({ type: Actions.CART_LIST, payload: { cart: [] } })
    })
  }, [session])

  // Functions token
  const login = async (login) => {
    try {
      const { state } = (await Login(login)).data;
      setSession(state)
      return await state;
    } catch (error) {
      SystemError(error)
    }
  };

  const signout = () => {
    Logout().then(() => {
      setUser(null)
      dispatch({ type: Actions.CART_LIST, payload: { cart: [] } })
    })
  }

  const signup = async (signup) => {
    return await SignUp(signup);
  };

  //Functions Cart
  const AddToCart = async (ProductKey) => {
    await getProduct(ProductKey).then(product => {
      dispatch({ type: Actions.ADD_TO_CART, payload: { product } });
    }).catch((err) => {
      SystemError(err)
    })
  };
  const Quantity = async (cant, productkey) => {
    await getProduct(productkey).then(product => {
      const { stock } = product
      if (cant <= 1) {
        dispatch({ type: Actions.QUANTITY_PRODUCT, payload: { cant: 1, productkey, stock } });
      } else {
        dispatch({ type: Actions.QUANTITY_PRODUCT, payload: { cant, productkey, stock } });
      }
    }).catch((err) => {
      SystemError(err)
    });

  };
  const RemoveProductFromCart = (productkey) => {
    dispatch({ type: Actions.REMOVE_PRODUCT_FROM_CART, payload: productkey });
  };
  const ClearCart = () => {
    dispatch({ type: Actions.CLEAR_CART });
  };

  //Totals Cart
  const SubTotal = cart.reduce(
    (Total, NextItem) =>
      NextItem.discount > 0
        ? Total + (NextItem.quantity * NextItem.price - NextItem.quantity * NextItem.price * NextItem.discount)
        : Total + NextItem.quantity * NextItem.price,
    0
  ).toFixed(2);

  const Tax = cart.reduce(
    (Total, NextItem) =>
      NextItem.discount > 0
        ? Total + (NextItem.quantity * NextItem.price - NextItem.quantity * NextItem.price * NextItem.discount) * 0.13
        : Total + NextItem.quantity * NextItem.price * 0.13,
    0
  ).toFixed(2);

  const Total = (
    parseFloat(cart.reduce(
      (Total, NextItem) =>
        NextItem.discount > 0
          ? Total + (NextItem.quantity * NextItem.price - NextItem.quantity * NextItem.price * NextItem.discount)
          : Total + NextItem.quantity * NextItem.price,
      0
    ))
    +
    parseFloat(cart.reduce(
      (Total, NextItem) =>
        NextItem.discount > 0
          ? Total + (NextItem.quantity * NextItem.price - NextItem.quantity * NextItem.price * NextItem.discount) * 0.13
          : Total + NextItem.quantity * NextItem.price * 0.13,
      0
    ))
  ).toFixed(2);

  const ContextValues = {
    AddToCart, RemoveProductFromCart, setPage, setCategorie, setSearch,
    products, categories, signout, login, signup, user, getProduct,
    system, getCategories, ClearCart, cart, Quantity, SubTotal, Tax, Total
  };

  return <Context.Provider value={ContextValues}>{children}</Context.Provider>;
}