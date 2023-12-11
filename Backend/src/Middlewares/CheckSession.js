import debug from "debug"

const session = debug('backend:[Session]')

export const isAutenticate = (req, res, next) => {
    if (req.isAutenticate()) {
        session("autenticate successfully")
        next()
    } else {
        res.state(404).json({ state: false, message: "session not found" })
    }
}