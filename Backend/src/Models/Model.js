import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const Schema = mongoose.Schema

const user = new Schema({
  key: { type: String, require: true, unique: true },
  username: { type: String, require: true, unique: true },
  names: { type: String, require: true },
  surnames: { type: String, require: true },
  address: { type: String, require: true },
  birthdate: { type: Date, require: true },
  email: { type: String, require: true, unique: true },
  phone: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  type: { type: String, require: true, default: "Cliente" },
}, { versionKey: false }).plugin(mongoosePaginate)

const product = new Schema({
  key: { type: String, require: true, unique: true },
  image: { type: Object, required: true, default: { public_id: "", url: "" } },
  categorykey: { type: String, require: true },
  name: { type: String, require: true },
  company: { type: String, require: true },
  details: { type: String, require: true },
  stock: { type: Number, require: true },
  price: { type: Number, require: true },
  discount: { type: Number, require: true },
}, { versionKey: false }).plugin(mongoosePaginate)

const category = new Schema({
  key: { type: String, require: true, unique: true },
  image: { type: Object, required: true, default: { public_id: "", url: "" } },
  name: { type: String, require: true, unique: true }
}, { versionKey: false })

const sale = new Schema({
  key: { type: String, require: true, unique: true },
  clientkey: { type: String, require: true, },
  cantproducts: { type: Number, require: true },
  subtotal: { type: Number, require: true },
  total: { type: Number, require: true },
  state: { type: String, require: true, default: "Proceso" },
}, { versionKey: false }).plugin(mongoosePaginate)

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
