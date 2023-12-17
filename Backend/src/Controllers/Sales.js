import uniquid from 'uniquid'
import { Products, Sales } from '../Models/Model.js'

export const GenerateSales = (req, res, next) => {
    const { user, products, subtotal, total } = req.body
    const date = new Date(req.body.date)
    const details = req.session.cart
    const key = uniquid()
    try {
        const sales = new Sales({ key, user, date, products, subtotal, total, details }).save()
        if (sales) {
            sales.details.map(async (element) => {
                const product = await Products.findById(element.id)
                if (product) {
                    const stock = product.stock - element.quantity > 0 ? product.stock - element.quantity : 0
                    Products.updateOne({ _id: product._id }, { stock })
                }
            });
            res.status(200).json({ state: true, message: 'The purchase was completed successfully.' })
        }
    } catch (error) {
        next(error.message)
        res.status(500).json({ state: false, message: error.message })
    }
}