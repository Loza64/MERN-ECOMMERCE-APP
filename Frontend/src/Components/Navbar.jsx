import React from "react";
import { FaSearch, FaUserAlt } from 'react-icons/fa'
import { NavBar } from "./Styles/styled-components";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <NavBar>
      <div>
        <div className="logo">
          <label>E-COMMERCE</label>
        </div>
        <div className="flex-nav">
          <div className="search">
            <input type="search" name="producto" id="producto" />
            <button><FaSearch /></button>
          </div>
          <nav>
            <Link to="/Terms">Terms</Link>
            <Link to="/Products">Products</Link>
            <Link to="/Categories">Categories</Link>
            <Link to="/Shoppings">My Shoppings</Link>
          </nav>
        </div>
        <div className="login-buttom">
          <FaUserAlt />
          <Link to="/Login">Login</Link>
        </div>
      </div>
    </NavBar>
  );
}