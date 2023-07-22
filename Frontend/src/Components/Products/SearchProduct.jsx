import { ContextProvider } from "../../Context/Context";
import ProductItem from "./ProductItem";
import Top from "../Top";
import Loading from "../Loading";
import { useState } from "react";

export default function SearchProduct({ TopState }) {
    const [loadingTime, setLoadingTime] = useState(0);
    const timeoutId = setTimeout(() => (setLoadingTime(loadingTime + 1)), 1000);
    const { resultSearch, searchProduct } = ContextProvider();

    window.addEventListener('load', () => {
        searchProduct(JSON.parse(localStorage.getItem("search")))
    })

    if (loadingTime >= 1) {
        if (resultSearch.length > 0) {
            clearTimeout(timeoutId);
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
            clearTimeout(timeoutId)
            return (
                <div>
                    <div className="list-empty" >
                        <br />
                        <br />
                        <br />
                        <label className="message" style={{ animationName: "none" }}>products not found.</label>
                    </div>
                </div>
            )
        }
    } else {
        return <Loading title={"loading results..."}/>
    }
}