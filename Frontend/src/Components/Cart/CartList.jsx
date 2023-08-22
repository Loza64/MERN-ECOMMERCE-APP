import { ShoppingCartList } from "../Styles/styled-components";
import CartItem from "./CartItem";
import { ContextProvider } from '../../Context/ContextConsumer'

export default function CartList() {
  const { cart } = ContextProvider();
  return (
    <ShoppingCartList>
      {cart.map(product => (<CartItem key={product._id} item={product} />))}
    </ShoppingCartList>
  );
}