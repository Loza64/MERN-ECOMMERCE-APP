import { GenerateToken, VerifyToken } from "../Libraries/jsonwebtoken.js"
import { EncryptPass, ComparePass } from '../Libraries/bcrypt.js'
import { Users } from "../Models/Model.js"

export const SignUp = async (req, res) => {
    const { username, names, surnames, address, birthdate, email, phone, pass } = req.body
    try {
        const check = await Users.findOne({ username: username }, { email: email }, { phone: phone })
        if (check != null) {
            res.send(false)
        } else {
            const password = await EncryptPass(pass)
            const key = uniquid()
            const date = new Date(birthdate)
            new Users({ key, username, names, surnames, date, email, address, phone, password }).save().then(() => {
                res.status(200).json({ state: true, message: "Register success" })
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const Login = async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await Users.findOne({ username: username })
        if (user != null && (await ComparePass(password, user.password))) {
            const token = GenerateToken(user);
            res.status(200).json({ state: true, token })
        } else {
            res.status(200).json({ state: false, token: null })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const CheckToken = (req, res) => {
    const { TokenKey } = req.params;
    try {
        const data = VerifyToken(TokenKey);
        if (data) {
            res.status(200).json({ state: true, result: { ...data.user } })
        } else {
            res.status(200).json({ state: false, result: null })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}