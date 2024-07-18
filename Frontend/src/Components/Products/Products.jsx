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
  TopState: PropTypes.bool,
  color: PropTypes.string
}

export default function Products({ TopState, color }) {
  const { products, system, setPage, loadingProducts } = ContextProvider()
  const [item, setItem] = useState(1)

  useEffect(() => {
    setPage(item)
  }, [item])

  if (system) {
    if (loadingProducts) {
      return <Loading color={color}/>
    } else {
      return products.docs.length > 0 ?
        (
          <>
            <Top state={TopState} />
            <ProductsList />
            <Pagination Page={products.page} Pages={products.totalPages} Prev={products.hasPrevPage} Next={products.hasNextPage} PrevItem={products.prevPage} NextItem={products.nextPage} setPage={setItem} />
          </>
        ) : <Message title={"Products not found"} />
    }
  } else {
    return null;
  }
} 