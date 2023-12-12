import debug from "debug"

const session = debug('backend:[Session]')

export const isAutenticate = (req, res, next) => {
    if (!req.session || !req.session.User) {
        session("authentication failed")
        next()
    }
    next()
}