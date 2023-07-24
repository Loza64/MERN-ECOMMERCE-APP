import { React, useState } from "react";
import { ContextProvider } from "../../Context/Context";
import ProductItem from "../Products/ProductItem";
import Top from '../Top'
import Loading from "../Loading";
import Message from "../Message";

export default function ProductsByCategorie({ CategoryKey, top }) {

  const { getProductByCategorie, productsByCategorie } = ContextProvider();
  const [time, setTime] = useState(0);
  const timeId = setTimeout(() => { setTime(time + 1) }, 1000);
  getProductByCategorie(CategoryKey);

  if (time >= 1) {
    clearTimeout(timeId);
    if (productsByCategorie.length > 0) {
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
    } else {
      if (time <= 50) {
        return <Loading title={"Loading..."} />
      } else {
        clearTimeout(timeId)
        return <Message title={"Products not found, reload this page!"} />
      }
    }
  } else {
    return <Loading title={"Loading..."} />
  }
}