import express from 'express';
import {
  createUser,
  readUser,
  readAllUsers,
  loginUser,
  // updateUser,
  // deleteUser
} from '../controllers/usersController.js';
// import { validationRules } from '../middlewares/validationRules.js';
// import { isAdministrator } from '../middlewares/isAdministrator.js';
// import { authorizedUser } from '../middlewares/authorizedUser.js';

const router = express.Router();

router.get('/', readAllUsers); // add auth and admin
router.post('/', createUser); // add validadtion
router.post('/login', loginUser);
// router.get('/refreshpage', auth, (req, res) => {
// 	res.json({ success: true, data: req.user });
//   });
router.get('/:id', readUser); // add auth and admin
// router.patch('/:id'); // add auth and admin
// router.delete('/:id'); // add auth and admin

export default router;
