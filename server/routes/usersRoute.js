import express from 'express';
import {
	createUser,
	readUser,
	readAllUsers,
	loginUser,
	updateUser,
	getUserAverageRating,
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
router.get('/:id', readUser);
router.get('/:id/averagerating', getUserAverageRating);

export default router;
