import debug from "debug"
import { VerifyToken } from "../Libraries/jsonwebtoken.js"

const session = debug('backend:[Session]')

export const isAutenticate = async (req, res, next) => {
    if (req.session && req.session.token) {
        const result = await VerifyToken(req.session.token)
        if (result) {
            next()
            session("is authorized")
        } else {
            session("has expired")
            next('Session has expired')
            return res.status(401).json({ state: false, details: "Your session has expired or does not exist" })
        }
    } else {
        session("has expired")
        next('Session has expired')
        return res.status(401).json({ state: false, details: "Your session has expired or does not exist" })
    }
}