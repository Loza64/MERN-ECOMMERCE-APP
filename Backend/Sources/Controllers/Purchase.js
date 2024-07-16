import uniquid from 'uniquid'
import { Products, Purchase } from '../Models/Model.js'

export const MakePurchase = async (req, res, next) => {
    const { user, cant, subtotal, total } = req.body

    const details = req.session.cart
    const date = Date.now()
    const key = uniquid()

    try {
        new Purchase({ key, user, date, cant, subtotal, total, details }).save().then(data => {
            data.details.map(async (item) => {
                const product = await Products.findById(item.id)
                if (product) {
                    const newStock = product.stock - item.quantity > 0 ? product.stock - item.quantity : 0
                    Products.findByIdAndUpdate(item.id, { stock: newStock }).then((data) => {
                        console.log(`The stock product: ${product.name}, went from ${data.stock} to ${newStock}`)
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

export const GetPurchaseByUser = async (req, res) => {
    const { User, Page } = req.query
    try {
        const purchases = await Purchase.paginate({ user: User }, { page: Page, limit: 9, sort: { date: -1 } })
        res.status(200).json({ state: true, purchases })
    } catch (error) {
        next(error.message)
        return res.status(500).json({ state: false, message: error.message })
    }
}