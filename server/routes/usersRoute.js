import express from 'express';
import {
  createUser,
  readUser,
  readAllUsers,
  loginUser,
} from '../controllers/usersController.js';
import { authorized } from '../middlewares/authorized.js';

const router = express.Router();

router.post('/', createUser);
router.post('/login', loginUser);
router.get('/refresh', authorized, (req, res) => {
  res.json({ success: true, data: req.user });
});
router.get('/', readAllUsers);
router.get('/:id', readUser);

export default router;
