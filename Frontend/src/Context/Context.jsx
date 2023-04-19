import { React, useContext, useState, createContext, useEffect, useReducer } from "react";
import { GetCategories, GetProducts, Login, SignUp, GetProductByCategorie, GetProductByKey } from "../Api/RestApi";
import { ContextReducer, InitialState } from "./ContextReducer";
import { Actions } from "./ContextActions";

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
    return await GetProductByKey(ProductKey);
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

  const [state, dispatch] = useReducer(ContextReducer, InitialState);
  const { cart, userCookies } = state;

  // Functions user
  const UserLogin = async (usuario) => {
    dispatch({ type: Actions.USER_LOGIN, payload: await Login(usuario) })
  };
  const UserSignUp = async (usuario) => {
    return await SignUp(usuario);
  };

  //Functions Cart
  const AddToCart = async (ProductKey) => {
    const product = await getProduct({ ProductKey });
    const CartBody = {
      key: product.data.key,
      image: product.data.image.url,
      name: product.data.name,
      company: product.data.company,
      price: product.data.price,
      quantity: 1,
      discount: product.data.discount,
    };
    dispatch({ type: Actions.ADD_TO_CART, payload: CartBody });
  };
  const RemoveProductFromCart = (productkey) => {
    dispatch({ type: Actions.REMOVE_PRODUCT_FROM_CART, payload: productkey });
  };
  const Quantity = (cant, productkey) => {
    if (cant <= 1) {
      dispatch({ type: Actions.QUANTITY_PRODUCT, payload: { cant: 1, productkey } });
    } else {
      dispatch({ type: Actions.QUANTITY_PRODUCT, payload: { cant, productkey } });
    }
  };
  const ClearCart = () => {
    dispatch({ type: Actions.CLEAR_CART, payload: [] });
  };
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

  //Context values

  const ContextValues = {
    products, categories,
    UserLogin, UserSignUp,
    getProductByCategorie, productsByCategorie,
    setProductsByCategorie, userCookies, getProduct,
    AddToCart, RemoveProductFromCart, ClearCart,
    cart, Quantity, SubTotal, Task, Total,
  };
  return <Context.Provider value={ContextValues}>{children}</Context.Provider>;
}