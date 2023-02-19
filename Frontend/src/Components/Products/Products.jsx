import React from "react";
import ProductsList from "./ProductsList";

export default function Products({ SubTopic, Topic }) {
  return (
    <div>
      <h1 className="text-center mt-3" style={{fontWeight:"bold"}}><label style={{color:"blue",fontWeight:"bold"}}>{SubTopic}</label> {Topic}</h1>
      <ProductsList />
    </div>
  )
}