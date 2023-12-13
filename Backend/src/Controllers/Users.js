import { GenerateToken, VerifyToken } from "../Libraries/jsonwebtoken.js"
import { EncryptPass, ComparePass } from '../Libraries/bcrypt.js'
import { Users } from "../Models/Model.js"
import uniquid from 'uniquid'

export const SignUp = async (req, res, next) => {
    const { username, names, surnames, address, date, email, pass } = req.body
    const key = uniquid()
    const birthdate = new Date(date)
    const phone = Number(req.body.phone)
    try {
        const checkuser = await Users.findOne({ username })
        const checkemail = await Users.findOne({ email })
        const checkphone = await Users.findOne({ phone })
        if (checkemail || checkphone || checkuser) {
            res.status(200).json({ state: false, message: "Username, email or phone already exist." })
        } else {
            const password = await EncryptPass(pass)
            new Users({ key, username, names, surnames, birthdate, email, address, phone, password }).save().then(() => {
                res.status(200).json({ state: true, message: "Register success" })
            }).catch(error => {
                next(error.message)
                res.status(500).json({ state: false, message: error.message })
            });
        }
    } catch (error) {
        next(error.message)
        res.status(500).json({ state: false, message: error.message })
    }
}

export const Login = async (req, res, next) => {
    const { username, password } = req.body
    try {
        const getUser = await Users.findOne({ username: username })
        if (getUser != null && (await ComparePass(password, getUser.password))) {
            const { _id, key, username, names, surnames, address, birthdate, email, phone, type } = getUser
            const user = { _id, key, username, names, surnames, address, birthdate, email, phone, type };
            const token = await GenerateToken(user);
            req.session.token = token
            req.session.cart = []
            res.status(200).json({ state: true, details: "Successful login" })
        } else {
            res.status(200).json({ state: false, details: "User or password incorrect" })
        }
    } catch (error) {
        next(error.message)
        res.status(500).json({ state: false, message: error.message })
    }
}

export const GetSession = async (req, res) => {
    const { token, cart } = req.session;
    res.status(200).json({ state: true, session: { token, cart } })
}

export const GetInfoUser = async (req, res) => {
    const { token } = req.session;
    const result = await VerifyToken(token);
    res.status(200).json({ state: true, result })
}