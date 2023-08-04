import { React, useState } from 'react'
import Top from '../Top'
import CategorieList from './CategorieList'
import Loading from '../Loading';
import { ContextProvider } from '../../Context/ContextConsumer';
import Message from '../Message';
import Title from '../Title';

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
          <Title Title={"Look at out"} SubTitle={"Categories"} />
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
