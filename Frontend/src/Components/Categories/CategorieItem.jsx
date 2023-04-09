import React from "react";
import { Link } from 'react-router-dom'
import { ContextProvider } from "../../Context/Context";

export default function CategorieItem({ category }) {
  const { setProductsByCategorie } = ContextProvider();
  return (
    <div className="targe-categorie">
      <div className="head">
        <img src={category.image.url} alt={category.name} />
      </div>
      <div className="body">
        <label>{category.name}</label>
        <Link to={`/${category.name}`} onClick={() => { setProductsByCategorie([]) }}>View Products</Link>
      </div>
    </div>
  );
}