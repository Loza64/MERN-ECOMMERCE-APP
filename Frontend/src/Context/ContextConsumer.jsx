/* eslint-disable react-hooks/exhaustive-deps */
import Swal from "sweetalert2";
import PropTypes from 'prop-types';
import { toast } from "react-toastify";
import { Actions } from "./ContextActions";
import { ContextReducer, InitialState } from "./ContextReducer";
import { useContext, useState, createContext, useReducer, useEffect } from "react";
import { GetCategories, GetProducts, GetProductByName, Login, SignUp, GetCart, Profile, Logout, AddToCart, Quantity, RemoveProductFromCart, ClearCart, GenerateSale, GetSalesByUser } from "../Api/RestApi";

ContextConsumer.propTypes = {
  children: PropTypes.node.isRequired,
}

const Context = createContext()

export const ContextProvider = () => useContext(Context)

export default function ContextConsumer({ children }) {

  //hooks
  const [system, setSystem] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadSession, setLoadSession] = useState(true)

  //Users
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(false);

  //Products
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [type, setType] = useState('All');
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState({});

  //Categories
  const [categorie, setCategorie] = useState(""); //Categorie
  const [categories, setCategories] = useState([]); //List of categories

  //Sales
  const [sales, setSales] = useState(null)
  const [salePage, setSalePage] = useState(1)

  const [state, dispatch] = useReducer(ContextReducer, InitialState);
  const { cart } = state;

  function MessageError(err) {
    Swal.fire({
      title: err,
      text: 'we will solve this problem as soon as possible.',
      icon: 'error',
      button: "Aceptar",
      footer: '<a href="mailto:ufostartservices@gmail.com">Report problem</a>'
    }).then(() => {
      setSystem(false);
    })
  }

  function BackendError(response, message) {
    if (response && response.status) {
      switch (response.status) {
        case 401:
          if (user) {
            setUser(null)
            dispatch({ type: Actions.CART_LIST, payload: { cart: [] } })
            toast.error(response.data.message)
          }
          break;
        case 410:
          if (user) {
            setUser(null)
            dispatch({ type: Actions.CART_LIST, payload: { cart: [] } })
            Swal.fire(response.data.message);
          }
          break;

        case 500:
          if (user) {
            setUser(null)
            dispatch({ type: Actions.CART_LIST, payload: { cart: [] } })
            MessageError(response.data.message)
          }
          break;

        default:
          MessageError(`Error ${response.status}, ${message}`)
          break;
      }
    } else {
      MessageError(message)
    }
    setLoading(false)
  }

  //---------------------------------------------------Functions user
  const signup = async (signup) => {
    try {
      const { data } = await SignUp(signup);
      return await data
    } catch ({ response, message }) {
      if (response.status === 409) {
        return response.data
      } else {
        BackendError(response, message)
      }
    }
  };

  const login = async (login) => {
    try {
      const { data } = await Login(login);
      setSession(!session)
      return await data;
    } catch ({ response, message }) {
      if (response.status === 401) {
        return response.data
      } else {
        BackendError(response, message)
        return null
      }
    }
  };

  useEffect(() => {
    setLoadSession(true)
    Profile().then(({ data }) => {
      setUser(data)
      setLoadSession(false)
    }).catch(({ response, message }) => {
      BackendError(response, message)
    })
  }, [session])

  const signout = () => {
    Logout().then(() => {
      dispatch({ type: Actions.CART_LIST, payload: { cart: [] } })
      setUser(null)
    }).catch(({ response, message }) => {
      BackendError(response, message)
    })
  }

  //---------------------------------------------------Functions products
  useEffect(() => {
    setLoading(true);
    GetCategories().then(({ data }) => {
      setCategories(data.result);
      setLoading(false)
    }).catch(({ response, message }) => {
      BackendError(response, message)
    })
  }, [])

  useEffect(() => {
    setLoading(true)
    GetProducts(search, categorie, type, page).then(({ data }) => {
      const { result } = data
      setProducts(result)
      setLoading(false)
    }).catch(({ response, message }) => {
      BackendError(response, message)
    })
  }, [search, categorie, page, type])

  const getProductByName = (Product, Page) => {
    setLoading(true)
    GetProductByName(Product, Page).then(async ({ data }) => {
      setProduct(data.product)
      setLoading(false)
    }).catch(({ response, message }) => {
      BackendError(response, message)
    })
  };

  //---------------------------------------------------Functions Cart
  useEffect(() => {
    GetCart().then(({ data }) => {
      dispatch({ type: Actions.CART_LIST, payload: { cart: data.cart } })
    }).catch(({ response, message }) => {
      BackendError(response, message)
    })
  }, [session])

  const addToCart = async (ProductKey, ProductName) => {
    AddToCart(ProductKey).then(({ data }) => {
      dispatch({ type: Actions.CART_LIST, payload: { cart: data.cart } })
      toast.success(`${ProductName} agregado al carrito!`)
    }).catch(({ response, message }) => {
      BackendError(response, message)
    })
  };

  const quantityProduct = async (key, type) => {
    Quantity(key, type).then(({ data }) => {
      dispatch({ type: Actions.CART_LIST, payload: { cart: data.cart } })
    }).catch(({ response, message }) => {
      BackendError(response, message)
    })
  };

  const removeProductFromCart = (ProductKey) => {
    RemoveProductFromCart(ProductKey).then(({ data }) => {
      dispatch({ type: Actions.CART_LIST, payload: { cart: data.cart } })
    }).catch(({ response, message }) => {
      BackendError(response, message)
    })
  };

  const clearCart = () => {
    ClearCart().then(({ data }) => {
      dispatch({ type: Actions.CART_LIST, payload: { cart: data.cart } })
    }).catch(({ response, message }) => {
      BackendError(response, message)
    })
  };

  //---------------------------------------------------Totals Cart
  const productsInCart = cart.reduce((a, c) => a + c.quantity, 0)

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

  //---------------------------------------------------Sales functions 
  const generateSale = () => {
    GenerateSale({
      user: user.key,
      date: new Date().toDateString(),
      product: productsInCart,
      subtotal: SubTotal,
      total: Total
    }).then(({ data }) => {
      dispatch({ type: Actions.CART_LIST, payload: { cart: data.cart } });
      Swal.fire({ title: data.message, icon: "success" }).then(() => {
        window.location.href = "/Shoppings";
      })
    }).catch(({ response, message }) => {
      BackendError(response, response, message)
    })
  }

  useEffect(() => {
    setLoading(true)
    GetSalesByUser(user ? user.key : "", salePage).then(({ data }) => {
      setSales(data.sales)
      setLoading(false)
    }).catch(({ response, message }) => {
      BackendError(response, message)
    })
  }, [salePage, user])

  //---------------------------------------------------Context Values to import
  const ContextValues = {
    addToCart, removeProductFromCart, setPage, setCategorie, setSearch, productsInCart,
    products, categories, signout, login, signup, user, getProductByName, loading, setSalePage, loadSession,
    system, clearCart, cart, quantityProduct, SubTotal, Tax, Total, product, setType, generateSale, sales
  };

  return <Context.Provider value={ContextValues}>{children}</Context.Provider>;
}