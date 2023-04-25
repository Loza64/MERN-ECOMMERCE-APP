import axios from 'axios'

export const Login = async (usuario) => await axios.post('/ServerCommerce/Backend/Node/Route/Api/EcommerceApp/Login', usuario)
export const SignUp = async (usuario) => await axios.post('/ServerCommerce/Backend/Node/Route/Api/EcommerceApp/SignUp', usuario)

export const GetProducts = async () => await axios.get('/ServerCommerce/Backend/Node/Route/Api/EcommerceApp/GetProducts')
export const GetCategories = async () => await axios.get('/ServerCommerce/Backend/Node/Route/Api/EcommerceApp/GetCategories')
export const GetProductByKey = async (ProductKey) => await axios.post('/ServerCommerce/Backend/Node/Route/Api/EcommerceApp/GetProductByKey', ProductKey)
export const GetStockProduct = async (ProductKey) => await axios.post('/ServerCommerce/Backend/Node/Route/Api/EcommerceApp/GetStockProduct', ProductKey)
export const GetProductByCategorie = async (CategoryKey) => await axios.post('/ServerCommerce/Backend/Node/Route/Api/EcommerceApp/GetProductByCategorie', CategoryKey)


