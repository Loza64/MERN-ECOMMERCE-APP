import { remove } from 'fs-extra'
import { validationResult } from 'express-validator'
import { Error, Success } from '../Config.js';


export const ValidationResult = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {

        const message = errors.array().map(item => item.msg)
        if (req.files) { remove(req.files.photo.tempFilePath) }

        message.map(item => Error(item))
        next("Error with input parameters body")
        return res.status(400).json({ state: false, message });
    } else {
        next()
        Success("input's body requests is valid.")
    };

}