import debug from "debug"

const session = debug('backend:[Session]')

export const isAutenticate = (req, res, next) => {
    if (req.session && req.session.user && req.session.token) {
        next()
        session("is authorized")
    } else {
        session("is not authorized")
        next('Session is not authorized')
        return res.status(401).json({ state: false, session: null })
    }
}