import Top from "../Top";
import React from "react";
import { useNavigate } from "react-router-dom";
import { BsFillCartPlusFill } from 'react-icons/bs'
import { ContextProvider } from "../../Context/Context";
import { DetailProducts } from "../Styles/styled-components";
import ProductsByCategorie from "../Categories/ProductsByCategorie"


export default function DetailProduct({ product }) {
  const { key, image, name, company, categorykey, price, stock, discount, details } = product;
  const { AddToCart } = ContextProvider();
  const navigator = useNavigate();

  return (
    <div>
      <DetailProducts status={stock > 0 ? true : false}>
        <Top state={true} />
        <div className="content-detail-product">
          <h2>{name}</h2>
          <div className="flex-detail-product">

            <div className="image">
              <img src={image.url} alt={name} />
            </div>

            <div className="info">
              <label className="company">Made by: <label className="detail">{company}</label></label>
              <label className="price">Price: <label className="detail">${price}</label></label>
              {discount > 0 ? (<label className="discount">Discount: <label className="detail">{Math.round(discount * 100)}%</label></label>) : null}
              <label className="status">Status: <label className="detail">{stock > 0 ? "In Stock" : "Out Stock"}</label></label>
              <p>{details}</p>
              <div className="buttoms">
                <button className="buttom cart" onClick={() => { if (stock > 0) { AddToCart(key) } }} en>Add to cart <BsFillCartPlusFill className="react-icon" /></button>
                <button className="buttom buy" onClick={() => { if (stock > 0) { AddToCart(key); navigator('/cart') } }}>Buy now</button>
              </div>
            </div>
          </div>
        </div>
      </DetailProducts>
      <h1 className="text-center" style={{ fontWeight: "bold" }}><label style={{ color: "blue", fontWeight: "bold"}}>Releated</label>Products</h1>
      <ProductsByCategorie CategoryKey={categorykey} top={false} style={{marginTop: "-100px"}}/>
    </div>

  )
}