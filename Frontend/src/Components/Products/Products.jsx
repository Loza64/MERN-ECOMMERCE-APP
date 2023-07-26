import React, { useState } from "react";
import ProductsList from "./ProductsList";
import Top from "../Top";
import Loading from "../Loading";
import { ContextProvider } from "../../Context/Context";
import Message from "../Message";

export default function Products({ SubTopic, Topic, TopState }) {
  const { products, system } = ContextProvider();
  const [loading, setLoading] = useState(0);

  if (system) {
    const timeId = setTimeout(() => { setLoading(loading + 1) }, 1000);
    if (loading >= 1 && products.length > 0) {
      clearTimeout(timeId);
      return products.length > 0 ?
        (
          <div>
            <Top state={TopState} />
            <h1 className="text-center py-2" style={{ fontWeight: "bold" }}><label style={{ color: "blue", fontWeight: "bold" }}>{SubTopic}</label> {Topic}</h1>
            <ProductsList />
          </div>
        ) : <Message title={"Products not found"} />
    } else {
      return <Loading title={"Loading...."} />
    }
  } else {
    return null;
  }
} 