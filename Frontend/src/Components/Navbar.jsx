import { useState } from "react";
import { RiCloseFill } from 'react-icons/ri';
import { BsFillCartFill } from 'react-icons/bs';
import { VscThreeBars } from 'react-icons/vsc';
import { FaSearch, FaUserAlt, FaBoxes, FaSignOutAlt } from 'react-icons/fa';
import { AiFillHome, AiFillSetting, AiFillTags } from 'react-icons/ai'
import { NavBar } from "./Styles/styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ContextProvider } from '../Context/ContextConsumer';

export default function Navbar() {

  const { user, cart, signout, setSearch, categories, setCategorie, setType } = ContextProvider();

  const navigator = useNavigate();
  const [state, setState] = useState(false);

  //Functions
  const scrollTop = () => { window.scrollTo({ top: 0, behavior: "smooth", }) }
  const Search = (e) => {
    e.preventDefault();
    setSearch(e.target.product.value)
    setCategorie(e.target.categorie.value)
    navigator('/')
  }

  return (
    <NavBar menu={state}>
      <div className="title-business">
        <label>COMMERCE</label>
      </div>
      <div className="sidebar">
        <form className="content-search" onSubmit={Search}>
          <select name="categorie" id="categorie">
            <option value="" disabled selected className={"option-none"}>Categoria</option>
            <option value="" className={"opcion"}>Todo</option>
            {categories.map((item, index) => (<option key={index} value={item.key} className={"opcion"}>{item.name}</option>))}
          </select>
          <input name="product" id="product" type="search" placeholder="Search...." className="txt-search" />
          <button type="submit" className="btn-search"><FaSearch /></button>
        </form>
        <nav>
          <Link to="/" onClick={() => { setState(false); scrollTop(); setType("All") }}><AiFillHome className="react-icon" />Home</Link>
          <Link to="/Terms" onClick={() => { setState(false); scrollTop(); }}><AiFillSetting className="react-icon" />Terms</Link>
          <Link to="/Products" onClick={() => { setState(false); scrollTop(); setType("All") }}><FaBoxes className="react-icon" />Products</Link>
          <Link to="/Discounts" onClick={() => { setState(false); scrollTop(); setType("Discount") }}>< AiFillTags className="react-icon" />Discounts</Link>
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