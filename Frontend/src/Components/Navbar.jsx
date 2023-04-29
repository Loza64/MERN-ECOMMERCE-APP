import { React, useState } from "react";
import { RiCloseFill } from 'react-icons/ri';
import { BsFillCartFill } from 'react-icons/bs';
import { VscThreeBars } from 'react-icons/vsc';
import { FaSearch, FaUserAlt, FaBoxes, FaClipboardList, FaSignOutAlt } from 'react-icons/fa';
import { AiFillHome, AiFillSetting, AiFillTags } from 'react-icons/ai'
import { NavBar } from "./Styles/styled-components";
import { Link } from "react-router-dom";
import { ContextProvider } from '../Context/Context';

export default function Navbar() {
  //Functions Context
  const { GetCookies, RemoveCookies, cart } = ContextProvider();
  const { username } = GetCookies("USERCOOKIES");
  //Hooks
  const [state, setState] = useState(false);

  //Functions
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <NavBar menu={state}>
      <div className="title-business">
        <label>ECOMMERCE</label>
      </div>
      <div className="sidebar">
        <div className="content-search">
          <input type="search" placeholder="Search..." className="txt-search" />
          <button className="btn-search"><FaSearch /></button>
        </div>
        <nav>
          <Link to="/" onClick={() => { setState(false); scrollTop(); }}><AiFillHome className="react-icon" />Home</Link>
          <Link to="/Terms" onClick={() => { setState(false); scrollTop(); }}><AiFillSetting className="react-icon" />Terms</Link>
          <Link to="/Products" onClick={() => { setState(false); scrollTop(); }}><FaBoxes className="react-icon" />Products</Link>
          <Link to="/Categories" onClick={() => { setState(false); scrollTop(); }}><FaClipboardList className="react-icon" />Categories</Link>
          <Link to="/Discounts" onClick={() => { setState(false); scrollTop(); }}>< AiFillTags className="react-icon" />Discounts</Link>
          <Link to="/Cart" onClick={() => { setState(false); scrollTop(); }}><BsFillCartFill className="react-icon" />Cart({cart.reduce((a, c) => a + c.quantity, 0)})</Link>
        </nav>
        <div className="login-buttom">
          <Link to="/Login" onClick={() => { setState(false); scrollTop(); RemoveCookies("USERCOOKIES"); }}>
            {
              GetCookies("USERCOOKIES") ?
                (
                  <label>{username} <FaSignOutAlt className="react-icon" style={{ marginLeft: "5px" }} /></label>
                ) :
                (
                  <label><FaUserAlt className="react-icon"></FaUserAlt>Login</label>
                )
            }
          </Link>
        </div >
      </div >
      {!state ?
        (<VscThreeBars className="btn-menu" onClick={() => { setState(true); }} />) :
        (<RiCloseFill className="btn-menu" onClick={() => { setState(false); }} />)}
    </NavBar >
  );
}