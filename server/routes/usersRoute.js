import express from 'express';
import {
	createUser,
	readUser,
	readAllUsers,
} from '../controllers/usersController.js';

const router = express.Router();

router.post('/', createUser);
router.get('/', readAllUsers);
router.get('/:id', readUser);

export default router;
