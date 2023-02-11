import axios from 'axios'

export const SignUp = async (usuario) => await axios.post('/ServerCommerce/SignUp', usuario)
export const Login = async (usuario) => await axios.post('/ServerCommerce/Login', usuario)

export const GetProducts = async () => await axios.get('/ServerCommerce/GetProducts')
export const GetCategories = async () => await axios.get('/ServerCommerce/GetProducts')


