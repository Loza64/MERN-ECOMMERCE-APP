import { BsFillCartPlusFill, BsFillCartXFill, BsFillCartCheckFill } from 'react-icons/bs'
import { BtnCart } from "../Styles/styled-components";
import { ContextProvider } from '../../Context/ContextConsumer'
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

ProductItem.propTypes = {
  product: PropTypes.object,
  animationState: PropTypes.bool
}

export default function ProductItem({ product, animationState }) {
  const { key, image, name, company, price, stock, discount } = product;
  const { addToCart, cart } = ContextProvider();
  const navigator = useNavigate();

  function TopWindow() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return stock > 0 ?
    (
      <div className="target" style={{ animationName: animationState ? "loadtarget" : "none" }}>
        <BtnCart>
          {cart.find(item => item.key === key) ? (<BsFillCartCheckFill className="react-icon incart" />) : (<BsFillCartPlusFill className="react-icon" onClick={() => { addToCart(key, name) }} />)}
          {discount > 0 ? (<label className="product-discount">{Math.round(discount * 100)}%</label>) : null}
        </BtnCart>
        <div className="head-target" onClick={() => { navigator(`/Product/${name}`); TopWindow() }}>
          <img src={image.url} alt={name} />
        </div>
        <div className="body-target">
          <label className="product-name">{company} - {name}</label>
          {
            discount > 0 ?
              (
                <div className="content-product-price">
                  <label className="product-price-none">${price}</label>
                  <label className="price-discount">${(price - discount * price).toFixed(2)}</label>
                </div>
              ) : (
                <div className="content-product-price">
                  <label className="product-price">${price}</label>
                </div>
              )
          }
        </div>
      </div>
    ) : (
      <div className="target" style={{ animationName: animationState ? "loadtarget" : "none" }}>
        <BtnCart>
          <BsFillCartXFill className="react-icon disable" />
          <label className="no-product">Unavailable</label>
        </BtnCart>
        <div className="head-target">
          <img src={image.url} alt="imgproduct" onClick={() => { navigator(`/Product/${name}`); TopWindow() }} />
        </div>
        <div className="body-target">
          <label className="product-name">{company} - {name}</label>
          <div className="content-product-price">
            <label className="product-price">${price}</label>
          </div>
        </div>
      </div>
    )
}