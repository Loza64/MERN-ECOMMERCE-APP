import { Products } from "../Models/Model.js";

export const Cart = (req, res) => {
    const { cart } = req.session;
    res.status(200).json({ state: true, cart })
}

export const AddToCart = async (req, res, next) => {
    const { Key } = req.params;
    try {
        const product = await Products.findOne({ key: Key })
        if (product && product.stock > 0) {
            const cart = req.session.cart;
            const { _id, key, name, image, price, discount } = product
            const checkProduct = cart.find(item => item.key === Key)
            const modifyCart = cart.map(item => item.key === Key ? { ...item, quantity: item.quantity < product.stock ? ++item.quantity : product.stock } : item)
            const saveProduct = [...cart, { id: _id.toString(), key, name, image: image.url, price, quantity: 1, discount }]
            const CartList = checkProduct ? modifyCart : saveProduct
            req.session.cart = CartList
            res.status(200).json({ state: true, cart: req.session.cart })
        } else {
            res.status(404).json({ state: false, message: 'Product not available' });
        }
    } catch (error) {
        next(error.message)
        res.status(500).json({ state: false, message: error.message })
    }
}

export const Quantity = async (req, res) => {
    const { Key, Type } = req.params;
    try {
        const product = await Products.findOne({ key: Key })
        if (product) {
            if (Type === "Addition") {
                req.session.cart.map(
                    item => item.key === Key ? { ...item, quantity: item.quantity < product.stock ? ++item.quantity : stock } : item
                )
                res.status(200).json({ state: true, cart: req.session.cart })
            } else if (Type === "Subtraction") {
                req.session.cart.map(
                    item => item.key === Key ? { ...item, quantity: item.quantity > 1 ? --item.quantity : 1 } : item
                )
                res.status(200).json({ state: true, cart: req.session.cart })
            } else {
                res.status(400).json({ state: false, message: 'Invalid option' });
            }
        } else {
            res.status(404).json({ state: false, message: 'Product not found' });
        }

    } catch (error) {
        next(error.message)
        res.status(500).json({ state: false, message: error.message })
    }
}

export const RemoveProductFromCart = (req, res) => {
    const { Key } = req.params;
    const remove = req.session.cart.filter(item => item.key !== Key)
    req.session.cart = remove
    res.status(200).json({ state: true, cart: req.session.cart })
}

export const ClearCart = (req, res) => {
    req.session.cart = []
    res.status(200).json({ state: true, cart: req.session.cart })
}