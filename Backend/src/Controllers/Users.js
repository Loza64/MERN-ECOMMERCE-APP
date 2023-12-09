import { GenerateToken, VerifyToken } from "../Libraries/jsonwebtoken.js"
import { EncryptPass, ComparePass } from '../Libraries/bcrypt.js'
import { Users } from "../Models/Model.js"
import uniquid from 'uniquid'

export const SignUp = async (req, res, next) => {
    const { username, names, surnames, address, birthdate, email, phone, pass } = req.body
    try {
        const checkuser = await Users.findOne({ username })
        const checkemail = await Users.findOne({ email })
        const checkphone = await Users.findOne({ phone })
        if (checkemail || checkphone || checkuser) {
            res.status(200).json({ state: false, message: "Username, email or phone already exist." })
        } else {
            const key = uniquid()
            const date = new Date(birthdate)
            const password = await EncryptPass(pass)
            new Users({ key, username, names, surnames, date, email, address, phone, password }).save().then(() => {
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
        const user = await Users.findOne({ username: username })
        if (user != null && (await ComparePass(password, user.password))) {
            const token = await GenerateToken(user);
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
        const token = await VerifyToken(TokenKey)
        if (token) {
            res.status(200).json({ state: true, result: { ...token.data } })
        } else {
            res.status(200).json({ state: false, result: null })
        }
    } catch (error) {
        next(error.message)
        res.status(500).json({ state: false, message: error.message })
    }
}