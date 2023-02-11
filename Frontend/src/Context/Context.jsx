import { React, useContext, useState, createContext, useEffect } from 'react'
import { GetCategories, GetProducts, Login, SignUp } from '../Api/RestApi'

const context = createContext()

export default function ContextConsumer({ children }) {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const result = await GetCategories();
    setCategories(result.data)
  }
  const getProducts = async () => {
    const result = await GetProducts();
    setProducts(result.data)
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

  return (
    <context.Provider value={{ products, categories, UserLogin, UserSignUp }}>
      {children}
    </context.Provider>
  )
}

export const ContextProvider = () => {
  const mycontext = useContext(context)
  return mycontext
}