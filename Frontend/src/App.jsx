import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar'
import Principal from './Components/Principal';
import Login from './Components/Login';
import Terms from './Components/Terms';
import Products from './Components/Products/Products'
import Cart from './Components/Cart/Cart';
import DetailProduct from './Components/Products/DetailProduct';

export default function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/Cart' element={<Cart />} />
        <Route path='/' element={<Principal />} />
        <Route path='/*' element={<Principal />} />
        <Route path='/Terms' element={<Terms />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Product/:Name' element={<DetailProduct />} />
        <Route path='/Products' element={<Products Top={'40px'} TopState={true} />} />
      </Routes>
    </div>
  );
}