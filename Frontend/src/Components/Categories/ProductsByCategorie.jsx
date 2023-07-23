import { React, useState } from "react";
import { ContextProvider } from "../../Context/Context";
import ProductItem from "../Products/ProductItem";
import Top from '../Top'
import Loading from "../Loading";

export default function ProductsByCategorie({ CategoryKey,top }) {

  const { getProductByCategorie, productsByCategorie } = ContextProvider();
  getProductByCategorie(CategoryKey);
  const [time, setTime] = useState(0);
  const timeId = setTimeout(() => { setTime(time + 1) }, 1000);

  if (time >= 1) {
    clearTimeout(timeId);
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
          <Top state={top} />
          <div className="grid">
            {
              productsByCategorie.map(
                product => (
                  <ProductItem key={product._id} product={product} animationState={true} />
                )
              )
            }
          </div>
        </div>
      )
    }
  } else {
    return <Loading title={"loading please wait..."} />
  }
}