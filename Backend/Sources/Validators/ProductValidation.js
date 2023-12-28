import { body } from "express-validator";

export const ValidateProduct = [
    body("name").notEmpty().withMessage("Name is required").isString().withMessage("Please enter valid name").trim().
        isLength({ min: 6 }).withMessage('Name should have at least 6 characters'),

    body("categorykey").notEmpty().withMessage("Categorie is required").isString().withMessage("Please enter valid categorie").trim().
        isLength({ min: 6 }).withMessage('Categorie should have at least 6 characters'),

    body("company").notEmpty().withMessage("Company is required").isString().withMessage("Please enter valid company").trim().
        isLength({ min: 3 }).withMessage('Company should have at least 3 characters'),

    body("details").notEmpty().withMessage("Details is required").isString().withMessage("Please enter valid details").trim().
        isLength({ min: 30 }).withMessage('Details should have at least 30 characters'),

    body("discount").notEmpty().withMessage("Discount is required").isNumeric().withMessage("Please enter valid discount").trim(),

    body("stock").notEmpty().withMessage("Stock is required").isNumeric().withMessage("Please enter valid stock").trim(),

    body("price").notEmpty().withMessage("Price is required").isNumeric().withMessage("Please enter valid price").trim(),
]