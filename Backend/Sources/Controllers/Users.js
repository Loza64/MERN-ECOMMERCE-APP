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
            res.status(409).json({ state: false, message: "Username, email or phone already exist." })
        } else {
            const password = await EncryptPass(pass)
            const saveUser = new Users({ key, username, names, surnames, birthdate, email, address, phone, password }).save()
            if(saveUser){
                res.status(200).json({ state: true, message: "Your account has been registered" })
            }else{
                res.status(500).json({ state: true, message: "Error to register your account" })
            }
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
            const { _id } = getUser
            const token = await GenerateToken(_id);
            req.session.token = token
            req.session.cart = []
            res.status(200).json({ state: true, message: "Successful login" })
        } else {
            res.status(401).json({ state: false, message: "User or password incorrect" })
        }
    } catch (error) {
        next(error.message)
        res.status(500).json({ state: false, message: error.message })
    }
}

export const Profile = async (req, res) => {
    try {
        const { token } = req.session;
        const idUser = await VerifyToken(token);
        const profile = await Users.findById(idUser)
        res.status(200).json({ ...profile._doc })
    } catch (error) {
        next(error.message)
        res.status(500).json({ state: false, message: error.message })
    }
}

export const Logout = (req, res) => {
    req.session.destroy(err => {
        if (!err) {
            res.status(200).json({ state: true, message: "Your session has been destroyed" })
        }
    })
}