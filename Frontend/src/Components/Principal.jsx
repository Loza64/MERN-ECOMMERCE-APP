import React from "react";
import Products from "./Products/Products";

export default function Principal() {
  return (
    <div className="pt-2">
      <Products SubTopic={"Our"} Topic={"Products"} TopState={true}/>
    </div>
  )
}