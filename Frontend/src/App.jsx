import Navbar from './Components/Navbar'
import Login from './Components/Login';
import Cart from './Components/Cart/Cart';
import Principal from './Components/Principal';
import Shoppings from './Components/Shoppings/Shoppings';
import { Route, Routes } from 'react-router-dom';
import Products from './Components/Products/Products'
import DetailProduct from './Components/Products/DetailProduct';

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Principal />} />
        <Route path='/*' element={<Principal />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Product/:Name' element={<DetailProduct />} />
        <Route path='/Cart' element={<Cart />} />
        <Route path='/Shoppings' element={<Shoppings />} />
        <Route path='/Products' element={<Products Top={'40px'} TopState={true} />} />
      </Routes>
    </div>
  );
}