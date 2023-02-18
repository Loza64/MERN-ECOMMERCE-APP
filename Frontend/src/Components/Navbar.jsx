import { React, useState } from "react";
import { RiCloseFill } from 'react-icons/ri';
import { FaSearch, FaUserAlt, FaBoxes, FaClipboardList } from 'react-icons/fa';
import { VscThreeBars } from 'react-icons/vsc'
import { BiPurchaseTag } from 'react-icons/bi'
import { AiFillHome, AiFillSetting, AiOutlineShoppingCart } from 'react-icons/ai'
import { NavBar } from "./Styles/styled-components";
import { Link } from "react-router-dom";

export default function Navbar() {
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
          <Link to="/" onClick={() => { setState(false); scrollTop() }}><AiFillHome className="react-icon" />Home</Link>
          <Link to="/Terms" onClick={() => { setState(false); scrollTop() }}><AiFillSetting className="react-icon" />Terms</Link>
          <Link to="/Products" onClick={() => { setState(false); scrollTop() }}><FaBoxes className="react-icon" />Products</Link>
          <Link to="/Categories" onClick={() => { setState(false); scrollTop() }}><FaClipboardList className="react-icon" />Categories</Link>
          <Link to="/Shoppings" onClick={() => { setState(false); scrollTop() }}><BiPurchaseTag className="react-icon" />Discounts</Link>
          <Link to="/Shoppings" onClick={() => { setState(false); scrollTop() }}><AiOutlineShoppingCart className="react-icon" />Cart(0)</Link>
        </nav>
        <div className="login-buttom">
          <Link to="/Login" onClick={() => { setState(false); scrollTop() }}><FaUserAlt className="react-icon" />Login</Link>
        </div>
      </div>
      {!state ? (<VscThreeBars className="btn-menu" onClick={() => { setState(true) }} />) : (<RiCloseFill className="btn-menu" onClick={() => { setState(false) }} />)}
    </NavBar>
  );
}