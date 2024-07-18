/* eslint-disable react-hooks/exhaustive-deps */
import Swal from "sweetalert2";
import PropTypes from 'prop-types';
import { toast } from "react-toastify";
import { Actions } from "./ContextActions";
import { useNavigate } from 'react-router-dom';
import { ContextReducer, InitialState } from "./ContextReducer";
import { useContext, useState, createContext, useReducer, useEffect } from "react";
import { GetCategories, GetProducts, GetProductByName, Login, SignUp, GetCart, Profile, Logout, AddToCart, Quantity, RemoveProductFromCart, ClearCart, MakePurchase, GetPurchasesByUser } from "../Api/RestApi";

ContextConsumer.propTypes = {
  children: PropTypes.node.isRequired,
}

const Context = createContext()

export const ContextProvider = () => useContext(Context)

export default function ContextConsumer({ children }) {

  //hooks
  const [system, setSystem] = useState(true);
  const navigate = useNavigate()

  //Loading hooks
  const [loadingProducts, setLoadingProducts] = useState(true); //List
  const [loadingProduct, setLoadingProduct] = useState(true); //GetProduct
  const [loadingSales, setLoadingPurchases] = useState(true);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingSignUp, setLoadingSignUp] = useState(false);

  //Init App
  const [loadApp, setLoadApp] = useState(true);
  const [initApp, setInitApp] = useState(false);

  //User
  const [user, setUser] = useState(null);

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
  const [purchases, setPurchases] = useState(null)

  const [state, dispatch] = useReducer(ContextReducer, InitialState);
  const { cart } = state;

  //--------------------------------------------------Manage Erros
  function AlertError(err) {
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

  function ManageErrors(response, message) {
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
            AlertError(response.data.message)
          }
          break;

        default:
          AlertError(`Error ${response.status}, ${message}`)
          break;
      }
    } else {
      AlertError(message)
    }
  }

  //---------------------------------------------------Functions user
  const signup = async (signup) => {
    setLoadingSignUp(true)
    try {
      const { data } = await SignUp(signup);
      return await data
    } catch ({ response, message }) {
      if (response.status === 409) {
        return response.data
      } else {
        ManageErrors(response, message)
      }
    }
    finally {
      setLoadingSignUp(false)
    }
  };

  const login = async (login) => {
    setLoadingLogin(true)
    try {
      const response = (await Login(login)).data;
      const profile = (await Profile()).data
      setUser(profile)
      return await response;
    } catch ({ response, message }) {
      if (response && response.status) {
        if (response.status === 401) {
          return response.data
        } else {
          ManageErrors(response, message)
          return null
        }
      }
    } finally {
      setLoadingLogin(false)
    }
  };

  useEffect(() => {
    if (!initApp) {
      setLoadApp(true)
      Profile().then(({ data }) => {
        setUser(data)
      }).catch(({ response, message }) => {
        ManageErrors(response, message)
      }).finally(() => {
        setTimeout(() => { setLoadApp(false); setInitApp(true) }, 6000)
      })
    } else {
      Profile().then(({ data }) => {
        setUser(data)
      }).catch(({ response, message }) => {
        ManageErrors(response, message)
      })
    }
  }, [])

  const signout = () => {
    Logout().then(() => {
      dispatch({ type: Actions.CART_LIST, payload: { cart: [] } })
      setUser(null)
    }).catch(({ response, message }) => {
      ManageErrors(response, message)
    })
  }

  //---------------------------------------------------Functions products
  useEffect(() => {
    GetCategories().then(({ data }) => {
      setCategories(data.result);
    }).catch(({ response, message }) => {
      ManageErrors(response, message)
    })
  }, [])

  useEffect(() => {
    setLoadingProducts(true)
    GetProducts(search, categorie, type, page).then(({ data }) => {
      const { result } = data
      setProducts(result)
    }).catch(({ response, message }) => {
      ManageErrors(response, message)
    }).finally(() => {
      setTimeout(() => { setLoadingProducts(false) }, 1000)
    })
  }, [search, categorie, page, type])

  const getProductByName = (Product, Page) => {
    setLoadingProduct(true)
    GetProductByName(Product, Page).then(async ({ data }) => {
      setProduct(data.product)
    }).catch(({ response, message }) => {
      ManageErrors(response, message)
    }).finally(() => {
      setTimeout(() => { setLoadingProduct(false) }, 1000)
    })
  };

  //---------------------------------------------------Functions Cart
  useEffect(() => {
    GetCart().then(({ data }) => {
      dispatch({ type: Actions.CART_LIST, payload: { cart: data.cart } })
    }).catch(({ response, message }) => {
      ManageErrors(response, message)
    })
  }, [user])

  const addToCart = async (ProductKey, ProductName) => {
    AddToCart(ProductKey).then(({ data }) => {
      dispatch({ type: Actions.CART_LIST, payload: { cart: data.cart } })
      toast.success(`${ProductName} agregado al carrito!`)
    }).catch(({ response, message }) => {
      ManageErrors(response, message)
    })
  };

  const quantityProduct = async (key, type) => {
    Quantity(key, type).then(({ data }) => {
      dispatch({ type: Actions.CART_LIST, payload: { cart: data.cart } })
    }).catch(({ response, message }) => {
      ManageErrors(response, message)
    })
  };

  const removeProductFromCart = (ProductKey) => {
    RemoveProductFromCart(ProductKey).then(({ data }) => {
      dispatch({ type: Actions.CART_LIST, payload: { cart: data.cart } })
    }).catch(({ response, message }) => {
      ManageErrors(response, message)
    })
  };

  const clearCart = () => {
    ClearCart().then(({ data }) => {
      dispatch({ type: Actions.CART_LIST, payload: { cart: data.cart } })
    }).catch(({ response, message }) => {
      ManageErrors(response, message)
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
  const makePurchase = async () => {
    try {
      const { data } = await MakePurchase({ user: user.key, cant: productsInCart, subtotal: SubTotal, total: Total })
      dispatch({ type: Actions.CART_LIST, payload: { cart: data.cart } })
      toast.success(data.message)
      navigate("/purchases")
    } catch ({ response, message }) {
      ManageErrors(response, message)
    }

  }

  const getPurchasesByUser = (user, page) => {
    setLoadingPurchases(true)
    GetPurchasesByUser(user.key, page).then(({ data }) => {
      setPurchases(data.purchases)
    }).catch(({ response, message }) => {
      ManageErrors(response, message)
    }).finally(() => {
      setTimeout(() => { setLoadingPurchases(false) }, 1000)
    })
  }

  //---------------------------------------------------Context Values to import
  const ContextValues = {
    addToCart, removeProductFromCart, setPage, setCategorie, setSearch,
    productsInCart, loadApp, initApp, loadingLogin, loadingSignUp, products, categories,
    signout, login, signup, user, getProductByName, loadingProduct, loadingSales,
    getPurchasesByUser, system, clearCart, cart, quantityProduct, SubTotal, Tax, Total,
    product, setType, makePurchase, purchases, loadingProducts
  };

  return <Context.Provider value={ContextValues}>{children}</Context.Provider>;
}