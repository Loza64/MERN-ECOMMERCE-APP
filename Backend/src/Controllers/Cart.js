export const Cart = async (req, res) => {
    const { cart } = req.session;
    res.status(200).json({ state: true, cart })
}

export const AddToCart = (req, res, next) => {

}