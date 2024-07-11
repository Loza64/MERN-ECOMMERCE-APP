import debug from "debug"
import { VerifyToken } from "../Libraries/jsonwebtoken.js"
import { Users } from "../Models/Model.js"

const session = debug('backend:[Session]')

export const isAutenticate = async (req, res, next) => {
    if ((req.session && req.session.token)) {
        const token = await VerifyToken(req.session.token)
        if (token) {
            const profile = await Users.findById(token)
            if (profile) {
                next()
                session("is authorized")
            } else {
                session("has removed")
                next('Session has removed')
                req.session.destroy()
                return res.status(410).json({ state: false, details: "Your account has been deleted" }) 
            }
        } else {
            session("has expired")
            next('Session has expired')
            return res.status(401).json({ state: false, details: "Your session does not exist, please login" })
        }
    } else {
        session("has expired")
        next('Session has expired')
        return res.status(401).json({ state: false, details: "Your session does not exist, please login" })
    }
}