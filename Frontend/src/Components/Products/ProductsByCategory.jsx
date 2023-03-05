import { React, useEffect } from "react";
import { ContextProvider } from "../../Context/Context";
import ProductItem from "./ProductItem";
import Top from '../Top'

export default function ProductsByCategory({ clave }) {

  const body = {
    CategoryKey: clave
  }
  const { getProductByCategorie, productsByCategorie } = ContextProvider();
  useEffect(() => {
    getProductByCategorie(body);
  }, body)

  return (
    <div>
      <Top></Top>
      <div className="grid">
        {
          productsByCategorie.map(
            product => (
              <ProductItem key={product._id} product={product} />
            )
          )
        }
      </div>
    </div>

  )
}