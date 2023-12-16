/* eslint-disable react-hooks/exhaustive-deps */
import { ContextProvider } from "../../Context/ContextConsumer";
import ProductItem from "./ProductItem";
import Top from "../Top";
import Loading from "../Loading";
import { useEffect, useState } from "react";
import Message from "../Message";
import PropTypes from 'prop-types';
import Pagination from "../Pagination";

SearchProduct.propTypes = {
    TopState: PropTypes.bool
}

export default function SearchProduct({ TopState }) {

    const { system, products, loading, setPage, setSearch } = ContextProvider();
    const params = new URLSearchParams(window.location.search)
    const product = !params.get('Product') ? localStorage.getItem('search') ? JSON.parse(localStorage.getItem('search')) : "" : params.get('Product')
    const [show, setShow] = useState(false)
    const [item, setItem] = useState(1)

    useEffect(() => { setPage(item); setSearch(product) })
    setTimeout(() => { setShow(true) }, 2000)

    if (system) {
        return !loading && show ? (
            products.docs.length > 0 ? (
                <div>
                    <Top state={TopState} />
                    <div className="result-search">
                        <label className="query">Result to: </label>
                        <label className="result">{`"${!product ? "All" : product}"`}</label>
                    </div>
                    <div className="grid">
                        {
                            products.docs.map(item => (<ProductItem key={item._id} product={item} animationState={true} />))
                        }
                    </div>
                    <Pagination Page={products.page} Pages={products.totalPages} Prev={products.hasPrevPage} Next={products.hasNextPage} PrevItem={products.prevPage} NextItem={products.nextPage} setPage={setItem} />
                </div>
            ) : <Message title={"Products not found"} />
        ) : <Loading title={"Loading result..."} />
    } else {
        return null
    }
}