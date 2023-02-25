import Cookies from 'universal-cookie';
import { React, useContext, useState, createContext, useEffect } from 'react';
import { GetCategories, GetProducts, Login, SignUp, GetProductByCategorie } from '../Api/RestApi';

const cookies = new Cookies();
const Context = createContext();

export const ContextProvider = () => {
  return useContext(Context);
};


export default function ContextConsumer({ children }) {

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
  const getProductByCategorie = async (CategoryKey) => {
    const result = await GetProductByCategorie(CategoryKey);
    setProductsByCategorie(result.data);
  }

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
  }

  const RemoveCookies = (CookieName) => {
    cookies.remove(CookieName);
  }

  const GetCookies = (CookieName) => {
    const token = cookies.get(CookieName);
    try {
      if(!token){
        return false;
      }else{
        return token;
      }
    } catch (error) {
      return false;
    }
  }

  useEffect(() => {
    getProducts()
  }, []);

  useEffect(() => {
    getCategories()
  }, []);

  return (
    <Context.Provider value={{
      products, categories, UserLogin, UserSignUp, getProductByCategorie, productsByCategorie,
      setProductsByCategorie, CreateCookies, RemoveCookies, GetCookies
    }}>
      {children}
    </Context.Provider>
  )
}