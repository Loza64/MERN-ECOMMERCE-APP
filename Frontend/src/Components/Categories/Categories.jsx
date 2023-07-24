import { React, useState } from 'react'
import Top from '../Top'
import CategorieList from './CategorieList'
import Loading from '../Loading';
import { useEffect } from 'react';
import { ContextProvider } from '../../Context/Context';
import Swal from 'sweetalert2';
import Message from '../Message';

export default function Categories({ SubTopic, Topic }) {
  const [time, setTime] = useState(0);
  const timeId = setTimeout(() => { setTime(time + 1) }, 1000);
  const { getCategories, categories } = ContextProvider();

  useEffect(() => {
    getCategories().catch((err) => {
      Swal.fire({
        title: 'Connection server error',
        text: 'Bug name: ' + err + ', we will solve this problem as soon as possible.',
        icon: 'error',
        button: "Aceptar",
        footer: '<a href="mailto:ufostartservices@gmail.com">Report problem</a>'
      })
    });
  }, []);

  if (time >= 1) {
    if (categories.length > 0) {
      clearTimeout(timeId)
      return (
        <div>
          <Top state={true} />
          <h1 className="text-center py-2" style={{ fontWeight: "bold" }}><label style={{ color: "blue", fontWeight: "bold" }}>{SubTopic}</label> {Topic}</h1>
          <CategorieList />
        </div>
      )
    } else {
      if (time <= 50) {
        return <Loading title={"Loading..."} />
      } else {
        clearTimeout(timeId)
        return <Message title={"Categories not found, reload this page!"} />
      }
    }
  } else {
    return <Loading title={"loading categories..."} />
  }
}
