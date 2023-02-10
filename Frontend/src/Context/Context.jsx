import { useContext, useState, createContext, useEffect } from 'react'
import { GetCategories, GetProducts, Login, SignUp } from '../Api/RestApi'

const context = createContext();

export default function ContextConsumer({ Children }) {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const result = await GetCategories();
    setCategories(result)
  }
  const getProducts = async () => {
    const result = await GetProducts();
    setProducts(result)
  }
  const UserLogin = async (usuario) => {
    return await Login(usuario)
  }
  const UserSignUp = async (usuario) => {
    return await SignUp(usuario)
  }

  useEffect(() => {
    getProducts()
  }, GetProducts());

  useEffect(() => {
    getCategories()
  }, GetCategories());

  <context.Provider value={{ products, categories, UserLogin, UserSignUp }}>
    {Children}
  </context.Provider>
}

export const ContextProvider = () => {
  return useContext(context)
}