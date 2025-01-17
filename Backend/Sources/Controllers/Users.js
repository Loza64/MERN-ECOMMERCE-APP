import { GenerateToken, VerifyToken } from "../Libraries/jsonwebtoken.js"
import { EncryptPass, ComparePass } from '../Libraries/bcrypt.js'
import { Users } from "../Models/Model.js"
import uniquid from 'uniquid'
import { encrypt, decrypt } from "../Libraries/crypto.js"

export const SignUp = async (req, res, next) => {
    const { username, names, surnames, address, date, email } = req.body
    const key = uniquid()
    const birthdate = new Date(date)
    const phone = Number(req.body.phone)
    try {
        const existingUser = await Users.findOne({ $or: [{ username }, { email }, { phone }] })
        if (existingUser) {
            return res.status(409).json({ state: false, message: "Username, email or phone number are already used by another user" })
        } else {
            const password = await EncryptPass(req.body.password)
            const saveUser = new Users({ key, username, names, surnames, birthdate, email, address, phone, password }).save()
            if (saveUser) {
                return res.status(201).json({ state: true, message: "Your account has been registered" })
            } else {
                return res.status(500).json({ state: true, message: "Error to register your account" })
            }
        }
    } catch (error) {
        return res.status(500).json({ state: false, message: error.message })
    }
}

export const Login = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const getUser = await Users.findOne({ username });

        if (!getUser) {
            return res.status(401).json({ state: false, message: "Incorrect username or password" });
        }

        const passwordMatch = await ComparePass(password, getUser.password);
        if (!passwordMatch) {
            return res.status(401).json({ state: false, message: "Incorrect username or password" });
        }

        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const token = await GenerateToken(getUser._id);
        const agent = req.headers['user-agent'];

        req.session.data = encrypt(JSON.stringify({ ip, agent, token }));
        req.session.data.cart = [];

        return res.status(200).json({ state: true, message: "Successful login", profile: getUser });
    } catch (error) {
        return res.status(500).json({ state: false, message: error.message });
    }
};

export const Profile = async (req, res) => {
    try {
        const { token } = decrypt(req.session.data)
        const idUser = await VerifyToken(token);
        const profile = await Users.findById(idUser)
        return res.status(200).json({ ...profile._doc })
    } catch (error) {
        return res.status(500).json({ state: false, message: error.message })
    }
}

export const Logout = (req, res) => {
    req.session.destroy(err => {
        if (!err) {
            return res.status(200).json({ state: true, message: "Your session has been destroyed" })
        }
    })
}