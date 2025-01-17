import { Products } from "../Models/Model.js";

export const Cart = (req, res) => {
    const { cart } = req.session.data
    return res.status(200).json({ state: true, cart })
}

export const AddToCart = async (req, res, next) => {
    const { Key } = req.params;

    try {
        const product = await Products.findOne({ key: Key });

        if (!product || product.stock <= 0) {
            return res.status(404).json({ state: false, message: 'Product not available' });
        }

        const cart = req.session.data.cart || [];
        const checkProduct = cart.find(item => item.key === Key);

        if (checkProduct) {
            checkProduct.quantity = Math.min(checkProduct.quantity + 1, product.stock);
        } else {
            cart.push({
                id: product._id.toString(),
                key: product.key,
                name: product.name,
                image: product.image.url,
                price: product.price,
                quantity: 1,
                discount: product.discount,
            });
        }

        req.session.data.cart = cart;
        return res.status(200).json({ state: true, cart: req.session.data.cart });

    } catch (error) {
        return res.status(500).json({ state: false, message: 'An error occurred while adding the product to the cart.' });
    }
}

export const Quantity = async (req, res, next) => {
    const { Key, Type } = req.params;

    try {
        const product = await Products.findOne({ key: Key });
        if (!product) return res.status(404).json({ state: false, message: 'Product not found' });

        const updatedCart = req.session.data.cart.map(item => {
            if (item.key !== Key) return item;
            if (Type === "Addition") {
                return { ...item, quantity: Math.min(item.quantity + 1, product.stock) };
            } else if (Type === "Subtraction") {
                return { ...item, quantity: Math.max(item.quantity - 1, 1) };
            }
        });

        req.session.data.cart = updatedCart;
        return res.status(200).json({ state: true, cart: updatedCart });

    } catch (error) {
        return res.status(500).json({ state: false, message: error.message });
    }
}

export const RemoveProductFromCart = (req, res) => {
    const { Key } = req.params;
    const remove = req.session.data.cart.filter(item => item.key !== Key)
    req.session.data.cart = remove
    return res.status(200).json({ state: true, cart: req.session.data.cart })
}

export const ClearCart = (req, res) => {
    req.session.data.cart = []
    return res.status(200).json({ state: true, cart: req.session.data.cart })
}