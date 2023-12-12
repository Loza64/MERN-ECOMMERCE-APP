import debug from "debug"

const session = debug('backend:[Session]')

export const isAutenticate = (req, res, next) => {
    if (!req.session || !req.session.user || !req.session.token) {
        next()
        session("authentication failed")
        res.status(401).json({ state: false, session: null })
    }
    next()
}