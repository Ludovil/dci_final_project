/**
  body('phone').isMobilePhone('es-ES'),
  body('birthDate').isISO8601().toDate(),
  body('gender').isIn(['male', 'female', 'other']),
  body('address').notEmpty(),
 */

import { body, validationResult } from 'express-validator'; // npm i express-validator

export const validationRulesRicardo = [
  body('email')
    .isEmail()
    .withMessage('Please provide us with a valid email')
    .normalizeEmail()
    .matches(/\./)
    .withMessage('Please use a correct format email'),
  body('password')
    .isString()
    .withMessage('The Password should be a string')
    .isLength({ min: 8 })
    .withMessage('The Password is too short')
    .matches(/[\W_]/)
    .withMessage(
      'You must create a stronger Password. That password should contain at least one special character'
    ),

  (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next();
    } else {
      res.json({
        success: false,
        message: errors.array().map((err) => ({ [err.param]: err.msg })),
      });
    }
  },
];
