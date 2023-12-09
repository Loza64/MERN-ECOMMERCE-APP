import debug from 'debug'

export const ErrorSystem = (err, req, res, next) => {
    next(err.message)
    debug(`backend:[Error system]: ${err.message}`)
    res.status(err.status || 500).json({ message: err.message });
}