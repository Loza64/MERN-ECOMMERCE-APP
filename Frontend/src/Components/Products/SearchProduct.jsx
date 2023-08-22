/* eslint-disable react-hooks/exhaustive-deps */
import { ContextProvider } from "../../Context/ContextConsumer";
import ProductItem from "./ProductItem";
import Top from "../Top";
import Loading from "../Loading";
import { useEffect, useState } from "react";
import Message from "../Message";
import PropTypes from 'prop-types';

SearchProduct.propTypes = {
    TopState: PropTypes.bool
}

export default function SearchProduct({ TopState }) {
    const [loading, setLoading] = useState(0);
    const { resultSearch, searchProduct, system } = ContextProvider();

    useEffect(() => {
        if (resultSearch.length === 0) {
            searchProduct(JSON.parse(localStorage.getItem("search")))
        }
    }, [])

    if (system) {
        const timeoutId = setTimeout(() => (setLoading(loading + 1)), 1000);
        if (loading >= 1) {
            clearTimeout(timeoutId);
            return resultSearch.length > 0 ?
                (
                    <div>
                        <Top state={TopState} />
                        <div className="result-search">
                            <label className="query">Result to: </label>
                            <label className="result">{JSON.parse(localStorage.getItem("search"))}</label>
                        </div>
                        <div className="grid">
                            {
                                resultSearch.map(item => (<ProductItem key={item._id} product={item} animationState={true} />))
                            }
                        </div>
                    </div>
                ) : <Message title={"product not found"} />
        } else {
            return <Loading title={"loading results...."} />
        }
    } else {
        return null;
    }
}