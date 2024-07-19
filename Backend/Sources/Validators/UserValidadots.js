import { body } from 'express-validator'
import { VerifyAge } from '../Middlewares/VerifyAge.js'

export const ValidateSignUp = [
    body('username').matches(/^[a-zA-ZÁ-ÿ0-9]{6,40}$/).withMessage("Please enter valid username")
    .isLength({min:9}).withMessage("Username should have at least 3 characters")
    .trim().notEmpty().withMessage("username must be required"),

    body('names').matches(/^[a-zA-ZÁ-ÿ\s]{3,40}$/).withMessage("Please enter valid name")
    .isLength({min:9}).withMessage("Username should have at least 3 characters")
    .trim().notEmpty().withMessage("username must be required"),

    body('surnames').matches(/^[a-zA-ZÁ-ÿ\s]{5,40}$/).withMessage("Please enter valid surname")
    .isLength({min:9}).withMessage("Username should have at least 3 characters")
    .trim().notEmpty().withMessage("username must be required"),

    body('address').matches(/^[a-zA-ZÁ-ÿ0-9\s-,().,]{5,240}$/).withMessage("Please enter valid address")
    .isLength({min:9}).withMessage("Username should have at least 3 characters")
    .trim().notEmpty().withMessage("username must be required"),

    body('email').matches(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/).withMessage("Please enter valid email")
    .isLength({min:9}).withMessage("Username should have at least 3 characters")
    .trim().notEmpty().withMessage("username must be required"),

    body('date').isISO8601().toDate().withMessage("Please enter valid date").custom(VerifyAge),

    body('phone').isNumeric().withMessage('Please enter valid phone number')
    .trim().notEmpty().withMessage('phone must be required')
    .isLength({ min: 8 }).withMessage('phone should have least 8 characters'),

    body('pass').matches(/^[a-zA-ZÁ-ÿ0-9\s-,().,]{5,40}$/).withMessage("Please enter valid pass")
    .isLength({ min: 5 }).withMessage('pass should have at least 4 characters')
    .trim().notEmpty().withMessage('pass must be required')
]