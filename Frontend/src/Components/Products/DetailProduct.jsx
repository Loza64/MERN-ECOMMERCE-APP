import Top from "../Top";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillCartPlusFill } from 'react-icons/bs'
import { FaShoppingBag } from 'react-icons/fa'
import { ContextProvider } from "../../Context/Context";
import { DetailProducts } from "../Styles/styled-components";
import Loading from "../Loading";
import ProductItem from "./ProductItem";
import Swal from "sweetalert2";

export default function DetailProduct({ product }) {
  const { key, image, name, company, categorykey, price, stock, discount, details } = product;
  const { AddToCart, getProductByCategorie, productsByCategorie } = ContextProvider();
  const navigator = useNavigate();
  const [view, setView] = useState(false);
  const [time, setTime] = useState(0);
  const [state, setState] = useState(true);
  const timeId = setTimeout(() => { setTime(time + 1) }, 1000);

  getProductByCategorie(categorykey).catch((err) => {
    Swal.fire({
      title: 'Connection server error',
      text: 'Bug name: ' + err + ', we will solve this problem as soon as possible.',
      icon: 'error',
      button: "Aceptar",
      footer: '<a href="mailto:ufostartservices@gmail.com">Report problem</a>'
    }).then(() => {
      setState(false);
    })
  });

  if (!state) {
    clearImmediate(timeId);
    return null
  } else {
    if (time >= 1) {
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
                        <div className="description less">
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
                          <button className="buttom cart" onClick={() => { if (stock > 0) { AddToCart(key) } }} en>Add to cart <BsFillCartPlusFill className="react-icon" /></button>
                          <button className="buttom buy" onClick={() => { if (stock > 0) { AddToCart(key); navigator('/cart') } }}>Buy now<FaShoppingBag className="react-icon" /></button>
                        </div>
                      ) : null
                  }
                </div>
              </div>
            </div>
          </DetailProducts>
          {
            productsByCategorie.length > 0 ?
              (
                <div>
                  <h1 className="text-center" style={{ fontWeight: "bold" }}><label style={{ color: "blue", fontWeight: "bold" }}>Releated</label> Products</h1>
                  <div className="grid">
                    {
                      productsByCategorie.map(item => (<ProductItem product={item} animationState={true} />))
                    }
                  </div>
                </div>
              ) : null
          }
        </div>
      )
    } else {
      return <Loading title={"Loading..."} />
    }
  }
}