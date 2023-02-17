import React from "react";
import { FaSearch, FaUserAlt, FaBoxes, FaClipboardList } from 'react-icons/fa';
import { VscThreeBars } from 'react-icons/vsc'
import { BiPurchaseTag } from 'react-icons/bi'
import { AiFillHome, AiFillSetting, AiOutlineShoppingCart } from 'react-icons/ai'
import { NavBar } from "./Styles/styled-components";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <NavBar>
      <div className="title-business">
        <label>ECOMMERCE</label>
      </div>
      <div className="sidebar">
        <div className="content-search">
          <button className="btn-search"><FaSearch /></button>
          <input type="search" placeholder="Search..." className="txt-search" />
        </div>
        <nav>
          <Link to="/"><AiFillHome className="react-icon" />Home</Link>
          <Link to="/Terms"><AiFillSetting className="react-icon" />Terms</Link>
          <Link to="/Products"><FaBoxes className="react-icon" />Products</Link>
          <Link to="/Categories"><FaClipboardList className="react-icon" />Categories</Link>
          <Link to="/Shoppings"><BiPurchaseTag className="react-icon" />Discounts</Link>
          <Link to="/Shoppings"><AiOutlineShoppingCart className="react-icon" />Cart(0)</Link>
        </nav>
        <div className="login-buttom">
          <Link to="/Login"><FaUserAlt className="react-icon" />Login</Link>
        </div>
      </div>
      <VscThreeBars className="btn-menu" />
    </NavBar>
  );
}