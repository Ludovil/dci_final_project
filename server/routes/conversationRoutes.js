import  Express  from "express";
const router = Express.Router();
import { newConversation, getConversationByUserId, getConversationByUserIds,  } from "../controllers/conversationController.js"
;    


router.post("/", newConversation);  
router.get("/:userId", getConversationByUserId);
router.get("/:firstUserId/:secondUserId", getConversationByUserIds); 
   

export default router;

