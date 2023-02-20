import { React } from 'react'
import CategorieList from './CategorieList'

export default function Categories({ SubTopic, Topic }) {
  return (
    <div>
      <h1 className="text-center mt-2" style={{ fontWeight: "bold" }}><label style={{ color: "blue", fontWeight: "bold" }}>{SubTopic}</label> {Topic}</h1>
      <CategorieList />
    </div>
  )
}