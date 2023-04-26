import React from "react";
import ProductsList from "./ProductsList";
import Top from "../Top";

export default function Products({ SubTopic, Topic,TopState }) {
  return (
    <div>
      <Top state={TopState} />
      <h1 className="text-center py-2" style={{fontWeight:"bold"}}><label style={{color:"blue",fontWeight:"bold"}}>{SubTopic}</label> {Topic}</h1>
      <ProductsList />
    </div>
  )
}