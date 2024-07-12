import { Session } from "../Config.js"
import { VerifyToken } from "../Libraries/jsonwebtoken.js"
import { Users } from "../Models/Model.js"

export const isAutenticate = async (req, res, next) => {
    if ((req.session && req.session.token)) {
        const token = await VerifyToken(req.session.token)
        if (token) {
            const profile = await Users.findById(token)
            if (profile) {
                next()
                Session("is authorized")
            } else {
                Session("has removed")
                next('Session has removed')
                req.session.destroy()
                return res.status(410).json({ state: false, details: "Your account has been deleted" }) 
            }
        } else {
            Session("has expired")
            next('Session has expired')
            return res.status(401).json({ state: false, details: "Your session does not exist, please login" })
        }
    } else {
        Session("has expired")
        next('Session has expired')
        return res.status(401).json({ state: false, details: "Your session does not exist, please login" })
    }
}