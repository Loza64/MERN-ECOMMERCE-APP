import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar'
import Principal from './Components/Principal';
import Login from './Components/Login';
import Categories from './Components/Categories/Categories';
import Terms from './Components/Terms';
import Discounts from './Components/Discounts';
import Products from './Components/Products/Products'
import SearchProduct from './Components/Products/SearchProduct';
import ProductsByCategorie from './Components/Categories/ProductsByCategorie'
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
        <Route path='/Discounts' element={<Discounts />} />
        <Route path='/Categories' element={<Categories />} />
        <Route path='/Product/:Name' element={<DetailProduct />} />
        <Route path='/Search' element={<SearchProduct TopState={true} />} />
        <Route path='/Products' element={<Products Top={'40px'} TopState={true} />} />
        <Route path='/Categorie/:Category' element={<ProductsByCategorie top={true} />} />
      </Routes>
    </div>
  );
}