import { useState } from "react";
import { Link } from "react-router-dom";
import { RiCloseFill } from 'react-icons/ri';
import { VscThreeBars } from 'react-icons/vsc';
import { BsFillCartFill } from 'react-icons/bs';
import { NavBar } from "./Styles/styled-components";
import { ContextProvider } from '../Context/ContextConsumer';
import { AiFillHome, AiFillSetting, AiFillTags } from 'react-icons/ai'
import { FaSearch, FaUserAlt, FaBoxes, FaSignOutAlt, FaDollarSign } from 'react-icons/fa';

export default function Navbar() {

  const { user, signout, setSearch, setPage, categories, setCategorie, setType, productsInCart } = ContextProvider();
  const [state, setState] = useState(false);

  //Functions
  const scrollTop = () => { window.scrollTo({ top: 0, behavior: "smooth", }) }
  const Search = (e) => {
    e.preventDefault();
    setSearch(e.target.product.value)
    setCategorie(e.target.categorie.value)
    setPage(1)
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
          <Link to="/Terms" onClick={() => { setState(false); scrollTop(); }}><AiFillSetting className="react-icon" />Terms</Link>
          <Link to="/" onClick={() => { setState(false); scrollTop(); setType("All"); setPage(1) }}><AiFillHome className="react-icon" />Home</Link>
          <Link to="/Products" onClick={() => { setState(false); scrollTop(); setType("All"); setPage(1) }}><FaBoxes className="react-icon" />Products</Link>
          <Link to="/NormalPrice" onClick={() => { setState(false); scrollTop(); setType("Normal"); setPage(1) }}><FaDollarSign className="react-icon" />Normal</Link>
          <Link to="/Discounts" onClick={() => { setState(false); scrollTop(); setType("Discount"); setPage(1) }}>< AiFillTags className="react-icon" />Discounts</Link>
          <Link to="/Cart" onClick={() => { setState(false); scrollTop(); }}><BsFillCartFill className="react-icon" />Cart({productsInCart})</Link>
          {
            !user ?
              (
                <Link to="/Login" onClick={() => { setState(false); scrollTop(); }}>
                  <FaUserAlt className="react-icon"></FaUserAlt>Login
                </Link>
              )
              :
              (
                <Link to="/Login" onClick={() => { setState(false); scrollTop(); signout() }}>
                  {user.username}<FaSignOutAlt className="react-icon" style={{ marginLeft: "5px" }} />
                </Link>
              )
          }
        </nav>
      </div >
      {
        !state ?
          (<VscThreeBars className="btn-menu" onClick={() => { setState(true); }} />) :
          (<RiCloseFill className="btn-menu" onClick={() => { setState(false); }} />)
      }
    </NavBar >
  );
}