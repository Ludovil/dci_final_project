import  Express  from "express";
const router = Express.Router();
import { newConversation, getConversationById, getConversationByUserIds,  } from "../controllers/conversationController.js"
;    


router.post("/", newConversation);  
router.get("/:id", getConversationById);
router.get("/:firstUserId/:secondUserId", getConversationByUserIds); 
   

export default router;

