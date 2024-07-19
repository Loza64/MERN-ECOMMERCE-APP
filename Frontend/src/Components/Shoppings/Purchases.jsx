import { PDFDownloadLink } from "@react-pdf/renderer";
import { ContextProvider } from "../../Context/ContextConsumer";
import Loading from "../Loading";
import Message from "../Message";
import Title from '../Title'
import Top from "../Top";
import Pagination from "../Pagination";
import Login from "../Login";
import PDF from "./PDF";
import { useEffect, useState } from "react";

export default function Purchases() {

  const { user, loadingSales, getPurchasesByUser, purchases } = ContextProvider();
  const [salePage, setSalePage] = useState(1)

  useEffect(() => {
    getPurchasesByUser(user ? user : "", salePage)
  }, [salePage, user])

  if (user) {
    if (loadingSales) {
      return <Loading />
    } else {
      return (
        purchases.docs.length > 0 ? (
          <div>
            <Top state={true} />
            <Title Title={"My"} SubTitle={"Purchases"} />
            <div className="content-sales">
              <table>
                <thead>
                  <th className="none">Item</th>
                  <th>Codigo</th>
                  <th className="none">Fecha</th>
                  <th className="none">Cant</th>
                  <th className="none">Subtotal</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Factura</th>
                </thead>
                <tbody>
                  {
                    purchases.docs.map(
                      (item, index) => (
                        <tr key={index}>
                          <td className="none">{index + 1}</td>
                          <td>{item.key}</td>
                          <td key={index} className="none">{(new Date(item.date).toDateString())}</td>
                          <td className="none">{item.cant}</td>
                          <td className="none">${item.subtotal}</td>
                          <td >${item.total}</td>
                          <td >{item.state}</td>
                          <td>
                            <PDFDownloadLink document={
                              <PDF
                                total={item.total}
                                factura={item.key}
                                state={item.state}
                                products={item.details}
                                subtotal={item.subtotal}
                                usuario={`${user.names} ${user.surnames}`}
                                date={(new Date(item.date).toDateString())}
                              />
                            }
                              fileName={item.key}
                            >
                              {
                                ({ loading }) => loading ? (
                                  <button>loading...</button>
                                ) : (
                                  <button>Download</button>
                                )
                              }
                            </PDFDownloadLink>
                          </td>
                        </tr>
                      )
                    )
                  }
                </tbody>
              </table>
            </div>
            <Pagination Page={purchases.page} Pages={purchases.totalPages} Prev={purchases.hasPrevPage} Next={purchases.hasNextPage} PrevItem={purchases.prevPage} NextItem={purchases.nextPage} setPage={setSalePage} />
          </div>
        ) : <Message title={"Your purchase history is currently empty."} />
      )
    }
  } else {
    return <Login />
  }
}