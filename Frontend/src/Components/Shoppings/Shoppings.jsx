import { useState } from "react";
import { ContextProvider } from "../../Context/ContextConsumer";
import Loading from "../Loading";
import Title from '../Title'
import Top from "../Top";
import Pagination from "../Pagination";
import Login from "../Login";

export default function Shoppings() {
  const { sales, loading, setSalePage, user } = ContextProvider();
  const [show, setShow] = useState(false)
  setTimeout(() => { setShow(true) }, 1000)

  return loading || !show ? (
    <Loading title={"Loading sales"} />
  ) : user ? (
    (
      <div className="sales">
        <Top state={true} />
        <Title Title={"My"} SubTitle={"Shoppings"} />
        <div className="content-sales">
          <table>
            <thead>
              <th className="none">Item</th>
              <th>Codigo</th>
              <th>Fecha</th>
              <th className="none">Products</th>
              <th className="none">Subtotal</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Factura</th>
            </thead>
            <tbody>
              {
                sales.docs.map(
                  (item, index) => (
                    <tr key={index}>
                      <td className="none">{index + 1}</td>
                      <td>{item.key}</td>
                      <td key={index}>{(new Date(item.date).toDateString())}</td>
                      <td className="none">{item.details.length}</td>
                      <td className="price none">${item.subtotal}</td>
                      <td className="price">${item.total}</td>
                      <td className="state">{item.state}</td>
                      <td>Download</td>
                    </tr>
                  )
                )
              }
            </tbody>
          </table>
        </div>
        <Pagination Page={sales.page} Pages={sales.totalPages} Prev={sales.hasPrevPage} Next={sales.hasNextPage} PrevItem={sales.prevPage} NextItem={sales.nextPage} setPage={setSalePage} />
      </div>
    )
  ) : <Login />
}