import {addMessage, getMessagesByConversationId} from "../controllers/messagesController.js"


import Express from "express";  
const router = Express.Router();

   
router.post("/", addMessage);   
router.get("/:conversationId", getMessagesByConversationId);   
export default router;  
