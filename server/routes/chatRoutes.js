import  Express  from "express";
const router = Express.Router();
import { newConversation, getConversationByUserId, getConversationByUserIds,  } from "../controllers/chatController.js";
import {addMessage, getMessagesByConversationId} from "../controllers/messageController.js";    


router.post("/", newConversation, addMessage);  
router.get("/:userId", getConversationByUserId);
router.get("/:firstUserId/:secondUserId", getConversationByUserIds);    
router.get("/:conversationId", getMessagesByConversationId);
export default router;
