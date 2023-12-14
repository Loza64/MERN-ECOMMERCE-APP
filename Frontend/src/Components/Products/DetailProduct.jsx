import Top from "../Top";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsFillCartPlusFill } from 'react-icons/bs'
import { FaShoppingBag } from 'react-icons/fa'
import { ContextProvider } from "../../Context/ContextConsumer";
import { DetailProducts } from "../Styles/styled-components";
import Loading from "../Loading";
import ProductItem from "./ProductItem";
import PropTypes from 'prop-types';
import Message from "../Message";

DetailProduct.propTypes = {
  product: PropTypes.object
}

export default function DetailProduct() {
  const navigator = useNavigate();
  const { Name } = useParams();

  const { AddToCart, products, setCategorie, getProductByName, system, product } = ContextProvider();
  useEffect(() => { getProductByName(Name) }, [Name])

  const [view, setView] = useState(false);
  const [loading, setLoading] = useState(0);

  if (system) {
    if (product) {
      const { key, image, name, company, price, categorykey, stock, discount, details } = product;
      const timeId = setTimeout(() => { setLoading(loading + 1) }, 1000);
      setCategorie(categorykey)
      if (loading >= 1) {
        clearTimeout(timeId);
        return (
          <div>
            <DetailProducts status={stock > 0 ? true : false} data={view}>
              <Top state={true} />
              <div className="content-detail-product">
                <h2>{name}</h2>
                <div className="flex-detail-product">
                  <div className="image">
                    <img src={image.url} alt={name} />
                  </div>
                  <div className="info">
                    <label className="company">Made by: <label className="detail">{company}</label></label>
                    <label className="price">Price: <label className="detail">${discount > 0 ? ((price - discount * price).toFixed(2)) : (price)}</label></label>
                    {discount > 0 ? (<label className="price-none">Original price: <label className="detail">${price}</label></label>) : null}
                    {discount > 0 ? (<label className="discount">Discount: <label className="detail">{Math.round(discount * 100)}%</label></label>) : null}
                    <label className="status">Status: <label className="detail">{stock > 0 ? "In Stock" : "Unavailable"}</label></label>
                    {
                      details.length >= 980 ?
                        (
                          <div className="description view-less">
                            <p>{details}</p>
                            <label className="view-more" onClick={() => { setView(view ? false : true) }}>
                              {
                                view ? ("View less") : ("View more")
                              }
                            </label>
                          </div>
                        ) : (
                          <div className="description">
                            <p>{details}</p>
                          </div>
                        )
                    }
                    {
                      stock > 0 ?
                        (
                          <div className="buttoms">
                            <button className="buttom cart" onClick={() => { if (stock > 0) { AddToCart(key) } }} >Add to cart <BsFillCartPlusFill className="react-icon" /></button>
                            <button className="buttom buy" onClick={() => { if (stock > 0) { AddToCart(key); navigator('/cart') } }}>Buy now<FaShoppingBag className="react-icon" /></button>
                          </div>
                        ) : null
                    }
                  </div>
                </div>
              </div>
            </DetailProducts>
            {
              products.docs.length > 0 ?
                (
                  <div>
                    <h1 className="text-center" style={{ fontWeight: "bold" }}><label style={{ color: "blue", fontWeight: "bold" }}>Releated</label> Products</h1>
                    <div className="grid">
                      {
                        products.docs.map(item => item.name !== Name ? (<ProductItem key={item._id} product={item} animationState={true} />) : null)
                      }
                    </div>
                  </div>
                ) : null
            }
          </div>
        )
      } else {
        return <Loading title={"Loading...."} />
      }
    } else {
      return <Message title={"Product not found"} />
    }
  } else {
    return null
  }
}