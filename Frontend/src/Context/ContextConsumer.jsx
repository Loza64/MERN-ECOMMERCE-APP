/* eslint-disable react-hooks/exhaustive-deps */
import Swal from "sweetalert2";
import PropTypes from 'prop-types';
import { Actions } from "./ContextActions";
import { ContextReducer, InitialState } from "./ContextReducer";
import { useContext, useState, createContext, useReducer, useEffect } from "react";
import { GetCategories, GetProducts, GetProductByName, Login, SignUp, GetCart, Profile, Logout, AddToCart, Quantity } from "../Api/RestApi";

ContextConsumer.propTypes = {
  children: PropTypes.node.isRequired,
}

const Context = createContext()

export const ContextProvider = () => useContext(Context)

export default function ContextConsumer({ children }) {

  //hooks
  const [system, setSystem] = useState(true);
  const [loading, setLoading] = useState(true);



  const [page, setPage] = useState(1);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [product, setProduct] = useState({});
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
    setLoading(true);
    GetCategories().then(({ data }) => {
      setCategories(data.result);
    }).catch((err) => {
      SystemError(err)
    }).finally(() => {
      setLoading(false);
    });
  };

  useEffect(async () => {
    try {
      setLoading(true);
      const { data } = await GetProducts(search, categorie, page)
      setProducts(data.result);
    } catch (error) {
      SystemError(error)
    } finally {
      setLoading(false)
    }
  }, [search, categorie, page])

  useEffect(() => {
    Profile().then(({ data }) => {
      setUser(data)
    }).catch(() => {
      setUser(null)
    })
  }, [session])

  const getProductByName = async (Product) => {
    try {
      setLoading(true)
      const { data } = await GetProductByName(Product);
      setProduct(data.product)
    } catch (error) {
      SystemError(error)
    } finally {
      setLoading(false)
    }
  };

  // Functions token
  const login = async (login) => {
    try {
      const { data } = await Login(login);
      setSession(true)
      return await data.state;
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
  useEffect(() => {
    GetCart().then(({ data }) => {
      dispatch({ type: Actions.CART_LIST, payload: { cart: data.cart } })
    }).catch(() => {
      dispatch({ type: Actions.CART_LIST, payload: { cart: [] } })
    })
  }, [session])

  const addToCart = async (ProductKey) => {
    if (user) {
      try {
        const { data } = await AddToCart(ProductKey)
        dispatch({ type: Actions.CART_LIST, payload: { cart: data.cart } })
      } catch (error) {
        setUser(null)
        dispatch({ type: Actions.CART_LIST, payload: { cart: [] } })
      }
    } else {
      window.location.href = "/login"
    }
  };
  const quantityProduct = async (key, type) => {
    Quantity(key, type).then(({ data }) => {
      dispatch({ type: Actions.CART_LIST, payload: { cart: data.cart } })
    }).catch((err) => {

      if (err.responce.status === 400) {
        SystemError(err.responce.data.message)
      } else if (err.responce.status === 404) {
        setUser(null)
        dispatch({ type: Actions.CART_LIST, payload: { cart: [] } })
      }else{
        SystemError(err.responce.data.message)
      }
    })
  };
  const RemoveProductFromCart = (ProductKey) => {

  };
  const ClearCart = () => {

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
    addToCart, RemoveProductFromCart, setPage, setCategorie, setSearch,
    products, categories, signout, login, signup, user, getProductByName, loading,
    system, getCategories, ClearCart, cart, quantityProduct, SubTotal, Tax, Total, product
  };

  return <Context.Provider value={ContextValues}>{children}</Context.Provider>;
}