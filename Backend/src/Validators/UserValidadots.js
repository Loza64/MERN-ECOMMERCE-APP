import { body } from 'express-validator'

export const ValidateSignUp = [
    body('username').isString().withMessage('Please enter valid username').trim().notEmpty().withMessage('username must be required').
        isLength({ min: 9 }).withMessage('username should have at least 9 characters'),

    body('names').isString().withMessage('Please enter valid name').trim().notEmpty().withMessage('names must be required').
        isLength({ min: 3 }).withMessage('name should have at least 3 characters'),

    body('surnames').isString().withMessage('Please enter valid surname').trim().notEmpty().withMessage('surnames must be required').
        isLength({ min: 4 }).withMessage('surname should have at least 4 characters'),

    body('address').isString().withMessage('Please enter valid address').trim().notEmpty().withMessage('address must be required').
        isLength({ min: 6 }).withMessage('address should have at least 6 characters'),

    body('email').isEmail().withMessage('Please enter valid email').trim().notEmpty().withMessage('email must be required').
        isLength({ min: 14 }).withMessage('email should have at least 14 characters'),

    body('birthdate').isString().withMessage('Please enter valid date').trim().notEmpty().withMessage('birthdate must be required'),

    body('phone').isNumeric().withMessage('Please enter valid phone number').trim().notEmpty().withMessage('phone must be required').
        isLength({ min: 8 }).withMessage('phone should have least 8 characters'),

    body('pass').isString().withMessage('Please enter valid pass').trim().notEmpty().withMessage('pass must be required')
        .isLength({ min: 4 }).withMessage('pass should have at least 4 characters'),
]