import uniquid from 'uniquid'
import { Products, Sales } from '../Models/Model.js'

export const GenerateSale = async (req, res, next) => {
    const { user, products, subtotal, total } = req.body
    const date = new Date(req.body.date)
    const details = req.session.cart
    const key = uniquid()
    try {
        new Sales({ key, user, date, products, subtotal, total, details }).save().then(sales => {
            sales.details.map(async (item) => {
                const product = await Products.findById(item.id)
                if (product) {
                    const newStock = product.stock - item.quantity > 0 ? product.stock - item.quantity : 0
                    Products.findByIdAndUpdate(item.id, { stock: newStock }).then((data) => {
                        console.log(`The stock product went from ${data.stock} to ${newStock}`)
                    })
                }
            });
        })
    } catch (error) {
        next(error.message)
        return res.status(500).json({ state: false, message: error.message })
    } finally {
        req.session.cart = []
        res.status(200).json({ state: true, cart: req.session.cart, message: 'The purchase was completed successfully.' })
    }
}