import ProductsList from "./ProductsList";
import Top from "../Top";
import Loading from "../Loading";
import { ContextProvider } from "../../Context/ContextConsumer";
import Message from "../Message";
import Title from "../Title";
import PropTypes from 'prop-types';

Products.propTypes = {
  TopState: PropTypes.bool
}

export default function Products({ TopState }) {
  const { products, system, setCategorie, setSearch, setPage, loading } = ContextProvider()
  setCategorie("")
  setSearch("")
  setPage(1)

  if (system) {
    if (loading) {
      <Loading title={"Loading product "} />
    } else {
      return products.docs.length > 0 ?
        (
          <div>
            <Top state={TopState} />
            <Title Title={"Our"} SubTitle={"Products"} />
            <ProductsList />
          </div>
        ) : <Message title={"Products not found"} />
    }
  } else {
    return null;
  }
} 