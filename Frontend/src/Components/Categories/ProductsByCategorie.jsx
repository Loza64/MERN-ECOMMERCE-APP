import { React, useEffect } from "react";
import { ContextProvider } from "../../Context/Context";
import ProductItem from "../Products/ProductItem";
import Top from '../Top'

export default function ProductsByCategorie({ CategoryKey }) {

  const { getProductByCategorie, productsByCategorie } = ContextProvider();
  useEffect(() => {
    getProductByCategorie({ CategoryKey });
  }, [])

  if (productsByCategorie.length === 0) {
    return (
      <div className="list-empty">
        <br />
        <br />
        <br />
        <label className="message">products not available for this category.</label>
      </div>
    )
  } else {
    return (
      <div>
        <Top state={true} />
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
}