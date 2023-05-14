import Cookies from "universal-cookie";
import { Actions } from "./ContextActions";
import { ContextReducer, InitialState } from "./ContextReducer";
import { React, useContext, useState, createContext, useEffect, useReducer } from "react";
import { GetCategories, GetProducts, Login, SignUp, GetProductByCategorie, GetProductByKey } from "../Api/RestApi";

const cookies = new Cookies();
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

  // Functions user
  const UserLogin = async (usuario) => {
    return await Login(usuario);
  };
  const UserSignUp = async (usuario) => {
    return await SignUp(usuario);
  };

  //Cookies
  const CreateCookies = (CookieName, data) => {
    cookies.set(CookieName, data, { path: "/" });
  };
  const RemoveCookies = (CookieName) => {
    cookies.remove(CookieName);
  };
  const GetCookies = (CookieName) => {
    const token = cookies.get(CookieName);
    try {
      if (!token) {
        return false;
      } else {
        return token;
      }
    } catch (error) {
      return false;
    }
  };

  //Functions Reducer
  const [state, dispatch] = useReducer(ContextReducer, InitialState);
  const { cart } = state;

  //Functions Cart
  const AddToCart = async (ProductKey) => {
    const { key, image, name, company, stock, price, discount } = await getProduct(ProductKey);
    const CartBody = {
      key: key,
      image: image.url,
      name: name,
      company: company,
      price: price,
      quantity: 1,
      discount: discount
    };
    dispatch({ type: Actions.ADD_TO_CART, payload: { newItem: CartBody, stock: stock } });
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
    dispatch({ type: Actions.CLEAR_CART, payload: [] });
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
    products, categories,
    UserLogin, UserSignUp, getProduct,
    getProductByCategorie, productsByCategorie,
    setProductsByCategorie, CreateCookies,
    RemoveCookies, GetCookies, AddToCart,
    RemoveProductFromCart, ClearCart,
    cart, Quantity, SubTotal, Task, Total,
  };
  return <Context.Provider value={ContextValues}>{children}</Context.Provider>;
}