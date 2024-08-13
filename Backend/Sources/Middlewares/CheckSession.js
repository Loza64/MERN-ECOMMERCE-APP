import { Session } from "../Config.js"
import { VerifyToken } from "../Libraries/jsonwebtoken.js"
import { Users } from "../Models/Model.js"

export const isAutenticate = async (req, res, next) => {
    try {
        if (req.session) {
            const token = await VerifyToken(req.session.token)
            if (token) {
                const profile = await Users.findById(token)
                if (profile) {
                    next()
                    Session("authorized")
                } else {
                    Session("has removed")
                    req.session.destroy()
                    return res.status(410).json({ state: false, message: "Your account has been deleted due to violations of our policies." }) 
                }
            } else {
                Session("not authorized or not exist")
                return res.status(401).json({ state: false, message: "Your session has been finished." })
            }
        } else {
            Session("not authorized or not exist")
            return res.status(401).json({ state: false, message: "Your session has been finished." })
        }
    } catch (error) {
        return res.status(500).json({ state: false, message: error.message })
    }
}