import debug from 'debug'
import { validationResult } from 'express-validator'

const error = debug('backend:[Error]')

export const ValidationResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().map(item => error(item.msg))
        res.status(400).json({ state: false, message: errors.array().map(item => item.msg) });
    }
    next();
}