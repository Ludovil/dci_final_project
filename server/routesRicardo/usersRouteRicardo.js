// ADD SO MANY MIDDLEWARES AS NECESSARY

// NAQVI HAS ALSO A LOGINUSER ROUTE AND HIS PLACE IN THE CODE IS AN SPECIFIC PLACE. DO WE NEED IT? (I THINK YES)

// NAQVI HAS ALSO CREATED HERE FOR '/REFRHESPAGE' AND NOT IMPORT IT FROM ANYWHERE. DO WE NEED IT?

// ==========================================================================================//

import express from 'express';
import {
  createUserRicardo,
  deleteUserRicardo,
  getAllUsersRicardo,
  getUserByIdRicardo,
  updateUserRicardo,
} from '../controllersRicardo/usersControllerRicardo.js';
import { validationRulesRicardo } from '../middlewaresRicardo/validationRulesRicardo.js';
import { isAdministratorRicardo } from '../middlewaresRicardo/isAdministratorRicardo.js';
import { authorizedUserRicardo } from '../middlewaresRicardo/authorizedUserRicardo.js';

const router = express.Router();

// Create a new user
//router.post('/', validationRulesRicardo, createUserRicardo);
router.post('/', validationRulesRicardo, createUserRicardo);

// Get all users
router.get('/', isAdministratorRicardo, getAllUsersRicardo);

// Get a specific user by ID
router.get(
  '/:id',
  isAdministratorRicardo,
  authorizedUserRicardo,
  getUserByIdRicardo
);

// Update a specific user by ID
router.patch(
  '/:id',
  isAdministratorRicardo,
  authorizedUserRicardo,
  updateUserRicardo
);

// Delete a specific user by ID
router.delete(
  '/:id',
  isAdministratorRicardo,
  authorizedUserRicardo,
  deleteUserRicardo
);

export default router;
