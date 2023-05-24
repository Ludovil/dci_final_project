import express from 'express';
import {
  createUser,
  readUser,
  readAllUsers,
  loginUser,
  updateUser,
} from '../controllers/usersController.js';
import { authorized } from '../middlewares/authorized.js';

const router = express.Router();

router.get('/', readAllUsers);
router.post('/', createUser);
router.post('/login', loginUser);
router.get('/refresh', authorized, (req, res) => {
  res.json({ success: true, data: req.user });
});
router.patch('/:id', authorized, updateUser);
router.get('/', readAllUsers);
router.get('/:id', readUser);
router.patch('/:id', authorized, updateUser);
router.delete('/:id/apartments', authorized, deleteApartmentsFromUser);

export default router;
