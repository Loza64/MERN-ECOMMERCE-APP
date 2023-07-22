import { Actions } from "./ContextActions";
import { ContextReducer, InitialState } from "./ContextReducer";
import { React, useContext, useState, createContext, useEffect, useReducer } from "react";
import { GetCategories, GetProducts, GetProductsByCategorie, GetProductByKey, SearchProducts, Login, SignUp } from "../Api/RestApi";
const Context = createContext();

export const ContextProvider = () => {
  return useContext(Context);
};

export default function ContextConsumer({ children }) {
  //hooks
  const [productsByCategorie, setProductsByCategorie] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [resultSearch, setResultSearch] = useState([]);

  // Functions products
  const getCategories = async () => {
    const { data } = await GetCategories();
    setCategories(data);
  };
  const getProducts = async () => {
    const { data } = await GetProducts();
    setProducts(data);
  };
  const getProduct = async (ProductKey) => {
    const { data } = await GetProductByKey(ProductKey);
    return data;
  };
  const getProductByCategorie = async (CategoryKey) => {
    const { data } = await GetProductsByCategorie(CategoryKey);
    setProductsByCategorie(data);
  };
  const searchProduct = async (product) => {
    if (product === "all") {
      setResultSearch((await GetProducts()).data)
    } else {
      const { data } = await SearchProducts(product);
      setResultSearch(data);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
    getCategories();
  }, []);


  //Functions Reducer
  const [state, dispatch] = useReducer(ContextReducer, InitialState);
  const { cart, user } = state;

  //Product


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
    const { data } = await SignUp(signup);
    return data;
  };


  //Functions Cart
  const AddToCart = async (ProductKey) => {
    const product = await getProduct(ProductKey);
    dispatch({ type: Actions.ADD_TO_CART, payload: { product } });
  };
  const Quantity = async (cant, productkey) => {
    const { stock } = await getProduct(productkey);
    if (cant <= 1) {
      dispatch({ type: Actions.QUANTITY_PRODUCT, payload: { cant: 1, productkey, stock } });
    } else {
      dispatch({ type: Actions.QUANTITY_PRODUCT, payload: { cant, productkey, stock } });
    }
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

  const Task = cart.reduce(
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
    UserLogin, UserSignUp, user, getProduct,
    getProductByCategorie, productsByCategorie,
    SubTotal, Task, Total, setProductsByCategorie,
    resultSearch, ClearCart, cart, Quantity, searchProduct
  };
  return <Context.Provider value={ContextValues}>{children}</Context.Provider>;
}