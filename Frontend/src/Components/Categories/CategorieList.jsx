import React from "react";
import CategorieItem from "./CategorieItem";
import { ContextProvider } from '../../Context/Context'

export default function CategorieList() {
  const { categories } = ContextProvider();
  return (
    
    <div className="grid">
      {
        categories.map(
          categorie => (
            <CategorieItem key={categorie._id} category={categorie} />
          )
        )
      }
    </div>
  );
}