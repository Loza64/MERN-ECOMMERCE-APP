import { React, useContext, useState, createContext, useEffect } from 'react';
import { GetCategories, GetProducts, Login, SignUp, GetProductByCategorie } from '../Api/RestApi';

export const Context = createContext();

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

  useEffect(() => {
    getProducts()
  }, []);

  useEffect(() => {
    getCategories()
  }, []);

  return (
    <Context.Provider value={{
      products, categories, UserLogin, UserSignUp,
      getProductByCategorie, productsByCategorie
    }}>
      {children}
    </Context.Provider>
  )
}