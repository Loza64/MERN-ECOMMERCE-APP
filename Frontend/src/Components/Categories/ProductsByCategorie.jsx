import { React, useState } from "react";
import { ContextProvider } from "../../Context/ContextConsumer";
import ProductItem from "../Products/ProductItem";
import Top from '../Top'
import Loading from "../Loading";
import Message from "../Message";

export default function ProductsByCategorie({ CategoryKey, top }) {

  const { getProductsByCategorie, productsByCategorie, system } = ContextProvider();
  const [time, setTime] = useState(0);
  const timeId = setTimeout(() => { setTime(time + 1) }, 1000);

  getProductsByCategorie(CategoryKey);

  if (system) {
    if (time >= 1) {
      clearTimeout(timeId);
      return productsByCategorie.length > 0 ?
        (
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
        ) : <Message title={"Products not found"} />
    } else {
      return <Loading title={"Loading products..."} />
    }
  } else {
    return null;
  }
} 