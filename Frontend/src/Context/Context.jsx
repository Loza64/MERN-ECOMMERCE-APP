import Cookies from 'universal-cookie';
import { React, useContext, useState, createContext, useEffect, useReducer } from 'react';
import { GetCategories, GetProducts, Login, SignUp, GetProductByCategorie, GetProductByKey } from '../Api/RestApi';
import { ContextReducer, InitialState } from './ContextReducer';
import { Actions } from './ContextActions';

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
    return await GetProductByKey(ProductKey);
  };
  const getProductByCategorie = async (CategoryKey) => {
    const result = await GetProductByCategorie(CategoryKey);
    setProductsByCategorie(result.data);
  }
  useEffect(() => {
    getProducts()
  }, []);
  useEffect(() => {
    getCategories()
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
    cookies.set(CookieName, data, { path: "/" })
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
  }

  //Functions Cart
  const [state, dispatch] = useReducer(ContextReducer, InitialState);
  const { cart } = state;

  const AddToCart = async (ProductKey) => {
    const product = await getProduct({ ProductKey });
    const CartBody = {
      key: product.data.key, 
      image: product.data.image, 
      name: product.data.name,
      company: product.data.company,
      price: product.data.price, 
      quantity: 1,
      discount: product.data.discount
    }
    dispatch({ type: Actions.ADD_TO_CART, payload: CartBody })
  }
  const RemoveFromCart = () => {

  }
  const Quantity = () => {

  }
  const ClearCart = () => {

  }

  const ContextValues = {
    products, categories,
    UserLogin, UserSignUp,
    getProductByCategorie,
    productsByCategorie,
    setProductsByCategorie,
    CreateCookies, RemoveCookies,
    GetCookies, getProduct, AddToCart,
    RemoveFromCart, ClearCart, cart, Quantity
  }
  return (
    <Context.Provider value={ContextValues}>
      {children}
    </Context.Provider>
  )
}