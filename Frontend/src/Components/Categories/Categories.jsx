import { React, useState } from 'react'
import Top from '../Top'
import CategorieList from './CategorieList'
import Loading from '../Loading';

export default function Categories({ SubTopic, Topic }) {
  const [time, setTime] = useState(0);
  const timeId = setTimeout(() => { setTime(time + 1) }, 1000);

  if (time >= 1) {
    clearTimeout(timeId)
    return (
      <div>
        <Top state={true} />
        <h1 className="text-center py-2" style={{ fontWeight: "bold" }}><label style={{ color: "blue", fontWeight: "bold" }}>{SubTopic}</label> {Topic}</h1>
        <CategorieList />
      </div>
    )
  } else {
    return <Loading title={"loading categories..."} />
  }
}
