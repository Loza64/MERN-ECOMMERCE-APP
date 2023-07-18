import { Actions } from "./ContextActions";
import { ContextReducer, InitialState } from "./ContextReducer";
import { React, useContext, useState, createContext, useEffect, useReducer } from "react";
import { GetCategories, GetProducts, GetProductByCategorie, GetProductByKey, Login, SignUp } from "../Api/RestApi";
const Context = createContext();

export const ContextProvider = () => {
  return useContext(Context);
};

export default function ContextConsumer({ children }) {
  //hooks
  const [productsByCategorie, setProductsByCategorie] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Functions products
  const getCategories = async () => {
    const result = await GetCategories();
    setCategories(result.data);
  };
  const getProducts = async () => {
    const result = await GetProducts();
    setProducts(result.data);
  };
  const getProduct = async (ProductKey) => {
    return (await GetProductByKey(ProductKey)).data;
  };
  const getProductByCategorie = async (CategoryKey) => {
    const result = await GetProductByCategorie(CategoryKey);
    setProductsByCategorie(result.data);
  };
  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
    getCategories();
  }, []);


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
    products, categories, UserSignOut,
    UserLogin, UserSignUp, user, getProduct,
    getProductByCategorie, productsByCategorie,
    setProductsByCategorie, AddToCart,
    RemoveProductFromCart, ClearCart,
    cart, Quantity, SubTotal, Task, Total,
  };
  return <Context.Provider value={ContextValues}>{children}</Context.Provider>;
}