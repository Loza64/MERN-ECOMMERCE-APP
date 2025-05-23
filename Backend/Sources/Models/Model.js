import { Schema, model } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const user = new Schema({
  key: { type: String, require: true, unique: true },
  username: { type: String, require: true, unique: true },
  names: { type: String, require: true },
  surnames: { type: String, require: true },
  address: { type: String, require: true },
  birthdate: { type: Date, require: true },
  email: { type: String, require: true, unique: true },
  phone: { type: Number, require: true, unique: true },
  password: { type: String, require: true },
  type: { type: String, require: true, default: "Cliente" },
}, { versionKey: false }).plugin(mongoosePaginate)

const product = new Schema({
  key: { type: String, require: true, unique: true },
  image: { type: Object, required: true, default: { public_id: "", url: "" } },
  category: { type: String, require: true, ref: 'categories' },
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

const purchase = new Schema({
  key: { type: String, require: true, unique: true },
  user: { type: String, require: true, },
  date: { type: Date, require: true },
  cant: { type: Number, require: true },
  subtotal: { type: Number, require: true },
  total: { type: Number, require: true },
  details: { type: Array, require: true },
  state: { type: String, require: true, default: "Pendiente" },
}, { versionKey: false }).plugin(mongoosePaginate)


export const Users = model("users", user)
export const Products = model("products", product)
export const Categories = model("categories", category)
export const Purchase = model("purchases", purchase)