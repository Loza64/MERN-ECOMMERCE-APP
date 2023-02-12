const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
  key: { type: String, require: true, unique: true },
  username: { type: String, require: true, unique: true },
  names: { type: String, require: true },
  surnames: { type: String, require: true },
  date: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  phone: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  type: { type: String, default: "cliente", require: true },
})

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
})

const category = new Schema({
  key: { type: String, require: true, unique: true },
  image: { public_id: String, url: String },
  name: { type: String, require: true, unique: true }
})

const sale = new Schema({
  key: { type: String, require: true, unique: true },
  clientkey: { type: String, require: true, },
  cantproducts: { type: Number, require: true },
  subtotal: { type: Number, require: true },
  total: { type: Number, require: true },
  state: { type: String, require: true, default: "Proceso" },
})

const detailsale = new Schema({
  salekey: { type: String, require: true },
  productkey: { type: String, require: true },
  cant: { type: Number, require: true },
  subtotal: { type: Number, require: true },
  total: { type: Number, require: true },
})

module.exports = {
  Users: mongoose.model("users", user),
  Products: mongoose.model("products", product),
  Categories: mongoose.model("categories", category),
  Sales: mongoose.model("sales", sale),
  Detailsales: mongoose.model("detailsales", detailsale)
}