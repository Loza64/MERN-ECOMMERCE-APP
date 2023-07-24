import { ContextProvider } from "../../Context/Context";
import ProductItem from "./ProductItem";
import Top from "../Top";
import Loading from "../Loading";
import { useState } from "react";
import Message from "../Message";
import Swal from "sweetalert2";

export default function SearchProduct({ TopState }) {
    const [loadingTime, setLoadingTime] = useState(0);
    const timeoutId = setTimeout(() => (setLoadingTime(loadingTime + 1)), 1000);
    const { resultSearch, searchProduct } = ContextProvider();

    console.log(loadingTime)
    window.addEventListener('load', () => {
        searchProduct(JSON.parse(localStorage.getItem("search"))).catch((err) => {
            Swal.fire({
                title: 'Connection server error',
                text: 'Bug name: ' + err + ', we will solve this problem as soon as possible.',
                icon: 'error',
                button: "Aceptar",
                footer: '<a href="mailto:ufostartservices@gmail.com">Report problem</a>'
            })
        });
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
            if (loadingTime <= 50) {
                return <Loading title={"loading results..."} />
            } else {
                clearTimeout(timeoutId)
                return <Message title={"Products not found, reload this page!"} />
            }
        }
    } else {
        return <Loading title={"loading results..."} />
    }
}