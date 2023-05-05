import express from 'express';
import multerMiddleware from '../middlewares/multer.js';
import {
	createUser,
	readUser,
	readAllUsers,
	loginUser,
} from '../controllers/usersController.js';

const router = express.Router();

// router.post('/', createUser);
router.post('/', multerMiddleware.single('image'), createUser);
router.post('/login', loginUser);
router.get('/', readAllUsers);
router.get('/:id', readUser);

export default router;
