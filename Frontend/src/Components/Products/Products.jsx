import React, { useState } from "react";
import ProductsList from "./ProductsList";
import Swal from 'sweetalert2'
import Top from "../Top";
import Loading from "../Loading";
import { ContextProvider } from "../../Context/Context";
import Message from "../Message";
import { useEffect } from "react";

export default function Products({ SubTopic, Topic, TopState }) {
  const { products, getProducts } = ContextProvider();
  const [time, setTime] = useState(0);
  const timeId = setTimeout(() => { setTime(time + 1) }, 1000);

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

  if (time >= 1) {
    if (products.length > 0) {
      clearTimeout(timeId);
      return (
        <div>
          <Top state={TopState} />
          <h1 className="text-center py-2" style={{ fontWeight: "bold" }}><label style={{ color: "blue", fontWeight: "bold" }}>{SubTopic}</label> {Topic}</h1>
          <ProductsList />
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