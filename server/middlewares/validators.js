import { body, validationResult } from "express-validator";

export const validationRules = [
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),
  // .matches(/\./)
  // .withMessage("Please specify the domain"),
  // .matches(/@/)
  // .withMessage('Please include the "@" symbol in the email address'),
  body("password")
    .isString()
    .withMessage("The Password should be a string")
    .isLength({ min: 6 })
    .withMessage("The Password is too short")
    .matches(/[\W_]/)
    .withMessage("The password should contain at least one special character"),

  (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if (errors.isEmpty()) {
      next();
    } else {
      res.json({
        success: false,
        message: errors.array().map((err) => ({ error: err.msg })),
      });
    }
  },
];
