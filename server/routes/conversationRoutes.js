import Express from 'express';
const router = Express.Router();

import {
  newConversation,
  getConversationById,
  getConversationByUserIds,
  deleteConversation,
} from '../controllers/conversationController.js';
import { authorized } from '../middlewares/authorized.js';

router.post('/', newConversation);
router.get('/:id', getConversationById);
router.get('/:firstUserId/:secondUserId', getConversationByUserIds);
router.delete('/:id', authorized, deleteConversation);

export default router;
