import mongoose from 'mongoose'
const Schema = mongoose.Schema

const user = new Schema({
  key: { type: String, require: true, unique: true },
  username: { type: String, require: true, unique: true },
  names: { type: String, require: true },
  surnames: { type: String, require: true },
  address: { type: String, require: true },
  date: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  phone: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  type: { type: String, default: "Cliente", require: true },
}, { versionKey: false })

const product = new Schema({
  key: { type: String, require: true, unique: true },
  image: { public_id: String, url: String },
  categorykey: { type: String, require: true },
  name: { type: String, require: true },
  company: { type: String, require: true },
  details: { type: String, require: true },
  stock: { type: Number, require: true },
  price: { type: Number, require: true },
  discount: { type: Number, require: true },
}, { versionKey: false })

const category = new Schema({
  key: { type: String, require: true, unique: true },
  image: { public_id: String, url: String },
  name: { type: String, require: true, unique: true }
}, { versionKey: false })

const sale = new Schema({
  key: { type: String, require: true, unique: true },
  clientkey: { type: String, require: true, },
  cantproducts: { type: Number, require: true },
  subtotal: { type: Number, require: true },
  total: { type: Number, require: true },
  state: { type: String, require: true, default: "Proceso" },
}, { versionKey: false })

const detailsale = new Schema({
  salekey: { type: String, require: true },
  productkey: { type: String, require: true },
  cant: { type: Number, require: true },
  subtotal: { type: Number, require: true },
  total: { type: Number, require: true },
}, { versionKey: false })

export const Users = mongoose.model("users", user)
export const Products = mongoose.model("products", product)
export const Categories = mongoose.model("categories", category)
export const Sales = mongoose.model("sales", sale)
export const Detailsales = mongoose.model("detailsales", detailsale)
