import debug from 'debug'

export const ErrorSystem = (err, req, res, next) => {
    next(err)
    debug(`backend:[Error] ${err.message}`)
    res.status(err.status || 500).json({ message: err.message });
}