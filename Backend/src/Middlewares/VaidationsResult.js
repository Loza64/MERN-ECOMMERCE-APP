import debug from 'debug'
import { remove } from 'fs-extra'
import { validationResult } from 'express-validator'

const error = debug('backend:[Error input]')
const success = debug('backend:[Success input]')

export const ValidationResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next("Error with input parameters")
        if (req.files) remove(req.files.photo.tempFilePath)
        errors.array().map(item => { error(item.msg) })
        res.status(400).json({ state: false, message: errors.array().map(item => item.msg) });
    } else {
        next()
        success("The body of the input requests is valid.")
    };
}