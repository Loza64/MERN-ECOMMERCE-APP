import Navbar from './Components/Navbar'
import Login from './Components/Login';
import Cart from './Components/Cart/Cart';
import Principal from './Components/Principal';
import { Route, Routes } from 'react-router-dom';
import Products from './Components/Products/Products'
import DetailProduct from './Components/Products/DetailProduct';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { ContextProvider } from './Context/ContextConsumer';
import LoadApp from './Components/LoadApp';
import Purchases from './Components/Shoppings/Purchases';

export default function App() {
  const { loadApp, initApp } = ContextProvider()

  if (!initApp) {
    return loadApp ? <LoadApp /> : (
      <>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Principal />} />
          <Route path='/*' element={<Principal />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Product/:Name' element={<DetailProduct />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path='/Purchases' element={<Purchases />} />
          <Route path='/Products' element={<Products Top={'40px'} TopState={true} />} />
        </Routes>
      </>
    )
  } else {
    return (
      <>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Principal />} />
          <Route path='/*' element={<Principal />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Product/:Name' element={<DetailProduct />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path='/Purchases' element={<Purchases />} />
          <Route path='/Products' element={<Products Top={'40px'} TopState={true} />} />
        </Routes>
      </>
    )
  }

}