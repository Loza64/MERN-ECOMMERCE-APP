/* eslint-disable react-hooks/exhaustive-deps */
import ProductsList from "./ProductsList";
import Top from "../Top";
import Loading from "../Loading";
import { ContextProvider } from "../../Context/ContextConsumer";
import Message from "../Message";
import PropTypes from 'prop-types';
import Pagination from "../Pagination";
import { useEffect, useState } from "react";

Products.propTypes = {
  TopState: PropTypes.bool
}

export default function Products({ TopState }) {
  const { products, system, setPage, loading } = ContextProvider()
  const [item, setItem] = useState(1)
  const [show, setShow] = useState(false)

  useEffect(() => {
    setPage(item)
  }, [item])

  setTimeout(() => { setShow(true); }, 1000)

  if (system) {
    if (loading || !show) {
      return <Loading title={"Loading products...."} />
    } else {
      return products.docs.length > 0 ?
        (
          <div>
            <Top state={TopState} />
            <ProductsList />
            <Pagination Page={products.page} Pages={products.totalPages} Prev={products.hasPrevPage} Next={products.hasNextPage} PrevItem={products.prevPage} NextItem={products.nextPage} setPage={setItem} />
          </div>
        ) : <Message title={"Products not found"} />
    }
  } else {
    return null;
  }
} 