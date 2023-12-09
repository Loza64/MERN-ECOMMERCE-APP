import { ContextProvider } from '../../Context/ContextConsumer';
import ProductItem from './ProductItem';

export default function ProductsList() {
  const { products } = ContextProvider();
  return (
    <div className="grid">
      {
        products.docs.map(
          product => (
            <ProductItem key={product._id} product={product} animationState={true} />
          )
        )
      }
    </div>
  )
}