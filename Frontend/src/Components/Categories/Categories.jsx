import { React } from 'react'
import Top from '../Top'
import CategorieList from './CategorieList'

export default function Categories({ SubTopic, Topic }) {
  return (
    <div>
      <Top/>
      <h1 className="text-center" style={{ fontWeight: "bold" }}><label style={{ color: "blue", fontWeight: "bold" }}>{SubTopic}</label> {Topic}</h1>
      <CategorieList />
    </div>
  )
}