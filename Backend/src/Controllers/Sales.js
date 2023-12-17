import uniquid from 'uniquid'
import { Products, Sales } from '../Models/Model.js'

export const GenerateSale = async (req, res, next) => {
    const { user, products, subtotal, total } = req.body
    const date = new Date(req.body.date)
    const details = req.session.cart
    const key = uniquid()
    try {
        const sales = await new Sales({ key, user, date, products, subtotal, total, details }).save()
        if (sales) {
            sales.details.map(async (item) => {
                const product = await Products.findById(item.id)
                if (product) {
                    const stock = product.stock - item.quantity > 0 ? product.stock - item.quantity : 0
                    Products.findByIdAndUpdate(item.id, { stock })
                }
            });
            req.session.cart = []
            res.status(200).json({ state: true, cart: req.session.cart, message: 'The purchase was completed successfully.' })
        }
    } catch (error) {
        next(error.message)
        res.status(500).json({ state: false, message: error.message })
    }
}