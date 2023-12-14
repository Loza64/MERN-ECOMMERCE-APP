import { useEffect, useState } from "react";
import ProductsList from "./ProductsList";
import Top from "../Top";
import Loading from "../Loading";
import { ContextProvider } from "../../Context/ContextConsumer";
import Message from "../Message";
import Title from "../Title";
import PropTypes from 'prop-types';

Products.propTypes = {
  TopState : PropTypes.bool
}

export default function Products({ TopState }) {
  const { products, system,setCategorie, setSearch, setPage } = ContextProvider()

  useEffect(() => {
    setCategorie("")
    setSearch("")
    setPage(1)
  }, [])


  const [loading, setLoading] = useState(0);

  if (system) {
    const timeId = setTimeout(() => { setLoading(loading + 1) }, 1000);
    if (loading >= 1 && products.docs.length > 0) {
      clearTimeout(timeId);
      return products.docs.length > 0 ?
        (
          <div>
            <Top state={TopState} />
            <Title Title={"Our"} SubTitle={"Products"} />
            <ProductsList />
          </div>
        ) : <Message title={"Products not found"} />
    } else {
      return <Loading title={"Loading...."} />
    }
  } else {
    return null;
  }
} 