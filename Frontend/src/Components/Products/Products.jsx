import React from "react";
import ProductsList from "./ProductsList";
import Top from '../Top'

export default function Products({ SubTopic, Topic }) {
  return (
    <div className="pt-2">
      <Top/>
      <h1 className="text-center" style={{fontWeight:"bold"}}><label style={{color:"blue",fontWeight:"bold"}}>{SubTopic}</label> {Topic}</h1>
      <ProductsList />
    </div>
  )
}