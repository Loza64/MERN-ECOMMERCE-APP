import { React } from 'react'
import Top from '../Top'
import CategorieList from './CategorieList'

export default function Categories({ SubTopic, Topic }) {
  return (
    <div>
      <Top state={true} />
      <h1 className="text-center py-2" style={{ fontWeight: "bold" }}><label style={{ color: "blue", fontWeight: "bold" }}>{SubTopic}</label> {Topic}</h1>
      <CategorieList />
    </div>
  )
}