import React from "react";
import { ContextProvider } from "../../Context/Context";
import ProductItem from "./ProductItem";
import Top from "../Top";

export default function SearchProduct({ TopState }) {
    const { resultSearch, searchProduct } = ContextProvider();
    window.addEventListener('load', () => {
        searchProduct(JSON.parse(localStorage.getItem("search")))
    })
    if (resultSearch.length > 0) {
        return (
            <div>
                <Top state={TopState} />
                <div className="result-search">
                    <label className="query">Result to: </label>
                    <label className="result">"{JSON.parse(localStorage.getItem("search"))}"</label>
                </div>
                <div className="grid">
                    {
                        resultSearch.map(item => (<ProductItem key={item._id} product={item} animationState={true} />))
                    }
                </div>
            </div>
        )
    } else {
        return (
            <div className="list-empty" >
                <br />
                <br />
                <br />
                <label className="message" style={{ animationName: "none" }}>products not found.</label>
            </div>
        )
    }

}