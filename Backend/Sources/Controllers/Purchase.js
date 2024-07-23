import uniquid from 'uniquid'
import { Products, Purchase } from '../Models/Model.js'
import { Error, Success } from '../Config.js'

export const MakePurchase = async (req, res, next) => {
    const { user, cant, subtotal, total } = req.body

    const details = req.session.cart
    const date = Date.now()
    const key = uniquid()

    try {
        const upload = await new Purchase({ key, user, date, cant, subtotal, total, details }).save()
        if (!upload) {
            return res.status(500).json({ state: false, message: "No se pudo guardar la compra" })
        }
        for (const item of details) {
            const product = await Products.findById(item.id)
            if (!product) {
                Error(`Product: ${item.id} not found`)
                console.warn(`Product: ${item.id} not found to make purchase`)
            } else {
                const newStock = product.stock - item.quantity
                await Products.findByIdAndUpdate(item.id, { stock: newStock > 0 ? newStock : 0 })
                Success(`The stock product: ${product.name}, went from ${product.stock} to ${newStock}`)
            }
        }
    } catch (error) {
        next(error.message)
        return res.status(500).json({ state: false, message: error.message })
    } finally {
        req.session.cart = []
        return res.status(201).json({ state: true, message: 'The purchase was completed successfully.' })
    }
}
export const GetPurchaseByUser = async (req, res) => {
    const { User, Page } = req.query
    try {
        const result = await Purchase.paginate({ user: User }, { page: Page, limit: 9, sort: { date: -1 } })
        return res.status(200).json({ state: true, result })
    } catch (error) {
        next(error.message)
        return res.status(500).json({ state: false, message: error.message })
    }
}