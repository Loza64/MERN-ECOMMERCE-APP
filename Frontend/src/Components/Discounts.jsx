import React, { useEffect, useState } from "react";
import Top from "./Top";
import { ContextProvider } from '../Context/Context';
import ProductItem from './Products/ProductItem'
import Swal from "sweetalert2";
import Loading from "./Loading";
import Message from "./Message";

export default function Discounts() {
  const { products, getProducts } = ContextProvider();
  const [time, setTime] = useState(0);
  const timeId = setTimeout(() => { setTime(time + 1) }, 1000)
  useEffect(() => {
    getProducts().catch((err) => {
      Swal.fire({
        title: 'Connection server error',
        text: 'Bug name: ' + err + ', we will solve this problem as soon as possible.',
        icon: 'error',
        button: "Aceptar",
        footer: '<a href="mailto:ufostartservices@gmail.com">Report problem</a>'
      })
    });
  }, []);
  let discounts = products.filter(item => item.stock > 0 && item.discount > 0)
  if (time >= 1) {
    clearTimeout(timeId);
    if (discounts.length > 0) {
      return (
        <div>
          <Top state={true} />
          <h1 className="text-center py-2" style={{ fontWeight: "bold" }}><label style={{ color: "blue", fontWeight: "bold" }}>Check our</label> Discounts</h1>
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
      )
    } else {
      <Message title={"No discounts available"} />
    }
  } else {
    return <Loading title={"Loading discounts..."} />
  }
}