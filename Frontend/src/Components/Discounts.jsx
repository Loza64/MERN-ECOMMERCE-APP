import React, { useState } from "react";
import Top from "./Top";
import { ContextProvider } from '../Context/ContextConsumer';
import ProductItem from './Products/ProductItem'
import Loading from "./Loading";
import Message from "./Message";
import Title from "./Title";

export default function Discounts() {
  const { products, system } = ContextProvider();
  const [loading, setLoading] = useState(0);

  let discounts = products.filter(item => item.stock > 0 && item.discount > 0);

  if (system) {
    const timeId = setTimeout(() => { setLoading(loading + 1) }, 1000);
    if (loading >= 1) {
      clearTimeout(timeId);
      return discounts.length > 0 ?
        (
          <div>
            <Top state={true} />
            <Title Title={"Check our"} SubTitle={"discounts"}/>
            <div className="grid">
              {
                discounts.map(
                  product => (
                    product.discount > 0 && product.stock > 0 ? (<ProductItem key={product._id} product={product} animationState={true} />) : null
                  )
                )
              }
            </div>
          </div>
        ) : < Message title={"No discounts available"} />
    } else {
      return <Loading title={"Loading discounts...."} />
    }
  } else {
    return null;
  }
}