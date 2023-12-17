/* eslint-disable react-hooks/exhaustive-deps */
import Swal from "sweetalert2";
import PropTypes from 'prop-types';
import { Actions } from "./ContextActions";
import { ContextReducer, InitialState } from "./ContextReducer";
import { useContext, useState, createContext, useReducer, useEffect } from "react";
import { GetCategories, GetProducts, GetProductByName, Login, SignUp, GetCart, Profile, Logout, AddToCart, Quantity, RemoveProductFromCart, ClearCart, GenerateSale } from "../Api/RestApi";

ContextConsumer.propTypes = {
  children: PropTypes.node.isRequired,
}

const Context = createContext()

export const ContextProvider = () => useContext(Context)

export default function ContextConsumer({ children }) {

  //hooks
  const [system, setSystem] = useState(true);
  const [loading, setLoading] = useState(true);

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

  const [state, dispatch] = useReducer(ContextReducer, InitialState);
  const { cart } = state;

  function SystemError(err) {
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

  // Functions user
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

  // Functions products
  useEffect(() => {
    setLoading(true);
    GetCategories().then(({ data }) => {
      setCategories(data.result);
    }).catch((err) => {
      SystemError(err)
    }).finally(() => {
      setLoading(false);
    });
  }, [])

  useEffect(() => {
    setLoading(true)
    GetProducts(search, categorie, type, page).then(({ data }) => {
      const { result } = data
      setProducts(result)
    }).catch(error => {
      SystemError(error)
    }).finally(() => {
      setLoading(false);
    })
  }, [search, categorie, page, type])

  useEffect(() => {
    Profile().then(({ data }) => {
      setUser(data)
    }).catch(({ response, message }) => {
      if (response.status === 401) {
        setUser(null)
      } else {
        SystemError(message)
      }
    })
  }, [session])

  const getProductByName = (Product, Page) => {
    setLoading(true)
    GetProductByName(Product, Page).then(async ({ data }) => {
      setProduct(data.product)
    }).catch(error => {
      setLoading(false)
      SystemError(error)
      console.log(error)
    }).finally(() => {
      setLoading(false)
    })
  };

  //Functions Cart
  useEffect(() => {
    GetCart().then(({ data }) => {
      dispatch({ type: Actions.CART_LIST, payload: { cart: data.cart } })
    }).catch(({ response, message }) => {
      if (response.status === 401) {
        dispatch({ type: Actions.CART_LIST, payload: { cart: [] } })
      } else {
        SystemError(message)
      }
    })
  }, [session])

  const addToCart = async (ProductKey) => {
    AddToCart(ProductKey).then(({ data }) => {
      dispatch({ type: Actions.CART_LIST, payload: { cart: data.cart } })
    }).catch(({ response, message }) => {
      if (response.status === 401) {
        if (user) {
          Swal.fire("Su sesión ya expiro").then(() => {
            setUser(null)
            window.location.href = "/login"
          });
        } else {
          window.location.href = "/login"
        }
      } else {
        SystemError(message)
      }
    })
  };

  const quantityProduct = async (key, type) => {
    Quantity(key, type).then(({ data }) => {
      dispatch({ type: Actions.CART_LIST, payload: { cart: data.cart } })
    }).catch(({ response, message }) => {
      if (response.status === 400) {
        SystemError(response.data.message)
      } else if (response.status === 401) {
        if (user) {
          Swal.fire("Su sesión ya expiro").then(() => {
            setUser(null)
            window.location.href = "/login"
          });
        }
      } else {
        SystemError(message)
      }
    })
  };

  const removeProductFromCart = (ProductKey) => {
    RemoveProductFromCart(ProductKey).then(({ data }) => {
      dispatch({ type: Actions.CART_LIST, payload: { cart: data.cart } })
    }).catch(({ response, message }) => {
      if (response.status === 400) {
        SystemError(response.data.message)
      } else if (response.status === 401) {
        if (user) {
          Swal.fire("Su sesión ya expiro").then(() => {
            setUser(null)
            window.location.href = "/login"
          });
        }
      } else {
        console.log(response)
        SystemError(message)
      }
    })
  };

  const clearCart = () => {
    ClearCart().then(({ data }) => {
      dispatch({ type: Actions.CART_LIST, payload: { cart: data.cart } })
    }).catch(({ response, message }) => {
      if (response.status === 400) {
        SystemError(response.data.message)
      } else if (response.status === 401) {
        if (user) {
          Swal.fire("Su sesión ya expiro").then(() => {
            setUser(null)
            window.location.href = "/login"
          });
        }
      } else {
        console.log(response)
        SystemError(message)
      }
    })
  };

  //Totals Cart
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

  //Sales functions 
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
      }).catch(error => {
        if (error.response.status === 400) {
          SystemError(error.response.data.message)
        } else if (error.response.status === 401) {
          if (user) {
            Swal.fire("Su sesión ya expiro").then(() => {
              setUser(null)
              window.location.href = "/login"
            });
          }
        } else {
          SystemError(error.message)
        }
      })
    })
  }

  const ContextValues = {
    addToCart, removeProductFromCart, setPage, setCategorie, setSearch, productsInCart,
    products, categories, signout, login, signup, user, getProductByName, loading,
    system, clearCart, cart, quantityProduct, SubTotal, Tax, Total, product, setType, generateSale
  };

  return <Context.Provider value={ContextValues}>{children}</Context.Provider>;
}