import { useContext, useState, createContext, useEffect } from 'react'
import { GetCategories, GetProducts, Login, SignUp } from '../Api/RestApi'

const context = createContext();

export default function ContextConsumer({ Children }) {

  const [product, setProduct] = useState([]);
  const [categorie, setCategorie] = useState([]);

  const getCategories = async () => {
    const result = await GetCategories();
    setCategorie(result)
  }
  const getProducts = async () => {
    const result = await GetProducts();
    setProduct(result)
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

  <context.Provider value={{}}>
    {Children}
  </context.Provider>
}

export const ContextProvider = () => {
  return useContext(context)
}