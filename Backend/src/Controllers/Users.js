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
            req.session.Token = token
            req.session.User = user
            req.session.Cart = []
            res.status(200).json({ state: true, token })
        } else {
            res.status(200).json({ state: false, token: null })
        }
    } catch (error) {
        next(error.message)
        res.status(500).json({ state: false, message: error.message })
    }
}

export const CheckToken = async (req, res, next) => {
    const { TokenKey } = req.params;
    try {
        const result = await VerifyToken(TokenKey)
        if (result) {
            res.status(200).json({ state: true, result })
        } else {
            res.status(200).json({ state: false, result: null })
        }
    } catch (error) {
        next(error.message)
        res.status(500).json({ state: false, message: error.message })
    }
}

export const GetUserSession = (req, res) => {
    if (req.session.User && req.session.Token) {
        const { Token, User, Cart } = req.session;
        res.status(200).json({ state: true, Session: { Token, User, Cart } })
    } else {
        res.status(401).json({ state: true, session: null })
    }
}