/* eslint-disable react-hooks/exhaustive-deps */
import Top from "../Top";
import Message from "../Message";
import Loading from "../Loading";
import PropTypes from 'prop-types';
import ProductItem from "./ProductItem";
import { useEffect, useState } from "react";
import { FaShoppingBag } from 'react-icons/fa';
import { BsFillCartPlusFill, BsFillCartCheckFill } from 'react-icons/bs';
import { useNavigate, useParams } from "react-router-dom";
import { DetailProducts } from "../Styles/styled-components";
import { ContextProvider } from "../../Context/ContextConsumer";
import Pagination from "../Pagination";

DetailProduct.propTypes = {
  product: PropTypes.object
}

export default function DetailProduct() {
  const { addToCart, getProductByName, system, product, loadingProduct, cart, user } = ContextProvider();
  const [page, setPage] = useState(1)
  const navigator = useNavigate();
  const { Name } = useParams();

  //Change item doc
  useEffect(() => { getProductByName(Name, page) }, [Name, page])

  const [view, setView] = useState(false);
  if (system) {
    if (loadingProduct) {
      return <Loading />
    } else {
      if (product) {
        const { key, image, name, company, details, price, stock, discount, releated } = product;
        return (
          <>
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
                            <label className="view-more" onClick={() => { setView(!view) }}>
                              {
                                view ? "View less" : "View more"
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
                            {
                              !cart.find(item => item.key === key) ?
                                (
                                  <>
                                    <button className="buttom cart" onClick={() => { if (stock > 0) { addToCart(key) } }} >Add to cart <BsFillCartPlusFill className="react-icon" /></button>
                                    <button className="buttom buy" onClick={() => { if (stock > 0) { addToCart(key); navigator(user ? '/cart' : '/login') } }}>Buy now<FaShoppingBag className="react-icon" /></button>
                                  </>
                                ) :
                                (
                                  <>
                                    <button className="buttom incart" >In cart <BsFillCartCheckFill className="react-icon" /></button>
                                    <button className="buttom buy" onClick={() => { navigator('/cart') }}>Make a purchase<FaShoppingBag className="react-icon" /></button>
                                  </>
                                )
                            }
                          </div>
                        ) : null
                    }
                  </div>
                </div>
              </div>
            </DetailProducts>
            {
              releated.docs.length > 0 ? (
                <section>
                  <h1 className="text-center" style={{ fontWeight: "bold" }}><label style={{ color: "blue", fontWeight: "bold" }}>Releated</label> Products</h1>
                  <div className="grid">
                    {
                      releated.docs.map(
                        item => (
                          <ProductItem key={item._id} product={item} animationState={true} />
                        )
                      )
                    }
                  </div>
                  <Pagination Page={releated.page} Pages={releated.totalPages} Prev={releated.hasPrevPage} Next={releated.hasNextPage} PrevItem={releated.prevPage} NextItem={releated.nextPage} setPage={setPage} />
                </section>
              ) : null
            }
          </>
        )
      } else {
        return <Message title={"Product not found"} />
      }
    }
  } else {
    return null
  }
}