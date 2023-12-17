import { useState } from "react";
import { RiCloseFill } from 'react-icons/ri';
import { BsFillCartFill } from 'react-icons/bs';
import { VscThreeBars } from 'react-icons/vsc';
import { FaSearch, FaUserAlt, FaBoxes, FaClipboardList, FaSignOutAlt } from 'react-icons/fa';
import { AiFillHome, AiFillSetting, AiFillTags } from 'react-icons/ai'
import { NavBar } from "./Styles/styled-components";
import { Link } from "react-router-dom";
import { ContextProvider } from '../Context/ContextConsumer';

export default function Navbar() {

  //Functions Context
  const { user, cart, signout, setSearch, categories, setCategorie } = ContextProvider();

  //Hooks
  const [state, setState] = useState(false);

  //Functions
  const scrollTop = () => { window.scrollTo({ top: 0, behavior: "smooth", }) }
  const Search = (e) => {
    e.preventDefault();
    localStorage.setItem('search', JSON.stringify(e.target.product.value))
    setSearch(e.target.product.value)
    setCategorie(e.target.categorie.value)
  }

  return (
    <NavBar menu={state}>
      <div className="title-business">
        <label>COMMERCE</label>
      </div>
      <div className="sidebar">
        <form className="content-search" onSubmit={Search}>
          <select name="categorie" id="categorie">
            <option value="" disabled selected>Categoria</option>
            <option value="" >Todo</option>
            {categories.map((item, index) => (<option key={index} value={item.key}>{item.name}</option>))}
          </select>
          <input name="product" id="product" type="search" placeholder="Search products..." className="txt-search" />
          <button type="submit" className="btn-search"><FaSearch /></button>
        </form>
        <nav>
          <Link to="/" onClick={() => { setState(false); scrollTop(); }}><AiFillHome className="react-icon" />Home</Link>
          <Link to="/Terms" onClick={() => { setState(false); scrollTop(); }}><AiFillSetting className="react-icon" />Terms</Link>
          <Link to="/Products" onClick={() => { setState(false); scrollTop(); }}><FaBoxes className="react-icon" />Products</Link>
          <Link to="/Categories" onClick={() => { setState(false); scrollTop(); }}><FaClipboardList className="react-icon" />Categories</Link>
          <Link to="/Discounts" onClick={() => { setState(false); scrollTop(); }}>< AiFillTags className="react-icon" />Discounts</Link>
          <Link to="/Cart" onClick={() => { setState(false); scrollTop(); }}><BsFillCartFill className="react-icon" />Cart({cart.reduce((a, c) => a + c.quantity, 0)})</Link>
        </nav>
        <div className="login-buttom">
          {
            !user ?
              (
                <Link to="/Login" onClick={() => { setState(false); scrollTop(); }}>
                  <label><FaUserAlt className="react-icon"></FaUserAlt>Login</label>
                </Link>
              )
              :
              (
                <Link to="/Login" onClick={() => { setState(false); scrollTop(); signout() }}>
                  <label>{user.username}<FaSignOutAlt className="react-icon" style={{ marginLeft: "5px" }} /></label>
                </Link>
              )
          }
        </div >
      </div >
      {
        !state ?
          (<VscThreeBars className="btn-menu" onClick={() => { setState(true); }} />) :
          (<RiCloseFill className="btn-menu" onClick={() => { setState(false); }} />)
      }
    </NavBar >
  );
}