import { FaTrashAlt } from "react-icons/fa";
import { ContextProvider } from "../../Context/ContextConsumer";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

CartItem.propTypes = {
  item: PropTypes.object
}

export default function CartItem({ item }) {
  const { key, name, image, company, price, quantity, discount } = item;
  const { removeProductFromCart, quantityProduct } = ContextProvider();
  const navigator = useNavigate();

  if (discount > 0) {
    return (
      <div className="item">
        <div className="image" onClick={() => { navigator(`/Product/${name}`) }}>
          <img src={image} alt={name} />
        </div>
        <div className="detailproduct">
          <div className="flex-product">
            <label className="name" onClick={() => { navigator(`/Product/${name}`) }}>{name}</label>
            <label className="subtotal">SubTotal: ${((price * quantity) - (price * quantity) * discount).toFixed(2)}</label>
          </div>
          <label className="marca">{company}</label>
          <label className="price">Price: ${(price - price * discount).toFixed(2)}</label>
          <label className="subtotal-none">SubTotal: ${(price * quantity).toFixed(2)}</label>
          <div className="flex-buttoms">
            <div className="quantity-buttoms">
              <button onClick={() => { quantityProduct(key, "Subtraction") }}>
                <i className="fa fa-minus" />
              </button>
              <label>{quantity}</label>
              <button onClick={() => { quantityProduct(key, "Addition") }}>
                <i className="fa fa-plus" />
              </button>
            </div>
            <div className="remove-buttom" onClick={() => { removeProductFromCart(key) }}>
              <FaTrashAlt className="react-icon" />
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="item">
        <div className="image">
          <img src={image} alt={name} onClick={() => { navigator(`/Product/${name}`) }} />
        </div>
        <div className="detailproduct">
          <div className="flex-product">
            <label className="name" onClick={() => { navigator(`/Product/${name}`) }}>{name}</label>
            <label className="subtotal">
              SubTotal: ${(price * quantity).toFixed(2)}
            </label>
          </div>
          <label className="marca">{company}</label>
          <label className="price">Price: ${price}</label>
          <div className="flex-buttoms">
            <div className="quantity-buttoms">
              <button onClick={() => { quantityProduct(key, "Subtraction") }}>
                <i className="fa fa-minus" />
              </button>
              <label>{quantity}</label>
              <button onClick={() => { quantityProduct(key, "Addition") }}>
                <i className="fa fa-plus" />
              </button>
            </div>
            <div className="remove-buttom" onClick={() => { removeProductFromCart(key) }}>
              <FaTrashAlt className="react-icon" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
