import { remove } from 'fs-extra'
import { validationResult } from 'express-validator'
import { Error, Success } from '../Config.js';


export const ValidationResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next("Error with input parameters")
        if (req.files) remove(req.files.photo.tempFilePath)
        errors.array().map(item => { Error(item.msg) })
        return res.status(400).json({ state: false, message: errors.array().map(item => item.msg) });
    } else {
        next()
        Success("input's body requests is valid.")
    };
}