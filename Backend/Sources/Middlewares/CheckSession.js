import debug from "debug"
import { VerifyToken } from "../Libraries/jsonwebtoken.js"

const session = debug('backend:[Session]')

export const isAutenticate = async (req, res, next) => {
    if (!(req.session && req.session.token) && !(await VerifyToken(req.session.token))) {
        session("has expired")
        next('Session has expired')
        return res.status(401).json({ state: false, details: "Your session has expired or does not exist" })
    } else {
        next()
        session("is authorized")
    }
}