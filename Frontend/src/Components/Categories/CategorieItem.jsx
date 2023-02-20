import React from "react";
import { Link } from 'react-router-dom'

export default function CategorieItem({ category }) {
  return (
    <div className="targe-categorie">
      <div className="head">
        <img src={category.image.url} alt="imgcategorie" />
      </div>
      <div className="body">
        <label>{category.name}</label>
      </div>
      <div className="footer">
        <Link to={`/${category.name}`}>View Products</Link>
      </div>
    </div>
  );
}