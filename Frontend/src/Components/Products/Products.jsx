import React, { useState } from "react";
import ProductsList from "./ProductsList";
import Top from "../Top";
import Loading from "../Loading";

export default function Products({ SubTopic, Topic, TopState }) {
  const [time, setTime] = useState(0);
  const timeId = setTimeout(() => { setTime(time + 1) }, 1000);
  if (time >= 1) {
    clearTimeout(timeId)
    return (
      <div>
        <Top state={TopState} />
        <h1 className="text-center py-2" style={{ fontWeight: "bold" }}><label style={{ color: "blue", fontWeight: "bold" }}>{SubTopic}</label> {Topic}</h1>
        <ProductsList />
      </div>
    )
  } else {
    return <Loading title={"loading products..."} />
  }
} 