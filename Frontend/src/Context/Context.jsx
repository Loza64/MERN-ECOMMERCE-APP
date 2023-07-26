import { Actions } from "./ContextActions";
import { ContextReducer, InitialState } from "./ContextReducer";
import { React, useContext, useState, createContext, useReducer, useEffect } from "react";
import { GetCategories, GetProducts, GetProductsByCategorie, GetProductByKey, SearchProducts, Login, SignUp } from "../Api/RestApi";
import Swal from "sweetalert2";
const Context = createContext();

export const ContextProvider = () => {
  return useContext(Context);
};

export default function ContextConsumer({ children }) {
  //hooks
  const [system, setSystem] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [resultSearch, setResultSearch] = useState([]);
  const [productsByCategorie, setProductsByCategorie] = useState([]);

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
    GetCategories().then(product => {
      setCategories(product.data);
    }).catch((err) => {
      SystemError(err)
    });

  };
  const getProducts = async () => {
    GetProducts().then(product => {
      setProducts(product.data);
    }).catch((err) => {
      SystemError(err)
    });

  };
  const getProduct = async (ProductKey) => {
    const { data } = await GetProductByKey(ProductKey);
    return data;
  };
  const getProductsByCategorie = async (CategoryKey) => {
    GetProductsByCategorie(CategoryKey).then(products => {
      setProductsByCategorie(products.data);
    }).catch((err) => {
      SystemError(err)
    });

  };
  const searchProduct = async (product) => {
    if (product === "all") {
      GetProducts().then(product => {
        setResultSearch(product.data)
      }).catch((err) => {
        SystemError(err)
      })
    } else {
      await SearchProducts(product).then(product => {
        setResultSearch(product.data)
      }).catch((err) => {
        SystemError(err)
      })
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getProducts()
  }, [])

  //Functions Reducer
  const [state, dispatch] = useReducer(ContextReducer, InitialState);
  const { cart, user } = state;


  // Functions user
  const UserLogin = async (login) => {
    const { data } = await Login(login);
    dispatch({ type: Actions.USER_LOGIN, payload: { data } })
    return await data ? true : false;
  };
  const UserSignOut = () => {
    dispatch({ type: Actions.USER_SIGN_OUT })
  }
  const UserSignUp = async (signup) => {
    return (await SignUp(signup)).data;
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
    AddToCart, RemoveProductFromCart,
    products, categories, UserSignOut,
    UserLogin, UserSignUp, user, getProduct, system,
    getProducts, getCategories, getProductsByCategorie,
    resultSearch, ClearCart, cart, Quantity, searchProduct,
    productsByCategorie, SubTotal, Tax, Total, setProductsByCategorie
  };
  return <Context.Provider value={ContextValues}>{children}</Context.Provider>;
}