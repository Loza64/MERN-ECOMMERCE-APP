import { React, useState } from 'react'
import Top from '../Top'
import CategorieList from './CategorieList'
import Loading from '../Loading';
import { ContextProvider } from '../../Context/ContextConsumer';
import Message from '../Message';

export default function Categories({ SubTopic, Topic }) {
  const [loading, setLoading] = useState(0);
  const { system, categories } = ContextProvider();

  if (system) {
    const timeId = setTimeout(() => { setLoading(loading + 1) }, 1000);
    if (loading >= 1) {
      clearTimeout(timeId);
      return categories.length > 0 ? (
        <div>
          <Top state={true} />
          <h1 className="text-center py-2" style={{ fontWeight: "bold" }}><label style={{ color: "blue", fontWeight: "bold" }}>{SubTopic}</label> {Topic}</h1>
          <CategorieList />
        </div>
      ) : <Message title={"Categories not found"} />
    } else {
      return <Loading title={"Loading categories...."} />
    }
  } else {
    return null
  }
}
