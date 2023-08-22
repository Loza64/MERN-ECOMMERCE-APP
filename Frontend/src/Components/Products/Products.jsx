import { useState } from "react";
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
  const { products, system } = ContextProvider();
  const [loading, setLoading] = useState(0);

  if (system) {
    const timeId = setTimeout(() => { setLoading(loading + 1) }, 1000);
    if (loading >= 1 && products.length > 0) {
      clearTimeout(timeId);
      return products.length > 0 ?
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