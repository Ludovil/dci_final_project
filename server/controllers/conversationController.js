import Conversation from "../models/conversationSchema.js";
import UserCollection from "../models/usersSchema.js";

// 
export const newConversation = async (req, res) => {
  const count = await Conversation.findOne({
    guest:req.body.guest,
    host:req.body.host
  }) 
  if(count){  
    return res.status(200).json(count)  
  } else{  
    try {
  const newConversation = new Conversation(
    req.body
    );
  
    const savedConversation = await newConversation.save();
    const guest = await UserCollection.findByIdAndUpdate(req.body.guest, {  
      $push: {  
        conversations: savedConversation._id  
      } 
    })
    const host = await UserCollection.findByIdAndUpdate(req.body.host, {  
      $push: {  
        conversations: savedConversation._id  
      } 
    }) 
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
}
};

export const getConversationById = async (req, res) => {
  try {
    const conversation = await Conversation.findById(
      req.params.id
    ).populate("host").populate("guest")
    res.status(200).json(conversation);
  } catch (err) {
    console.log(err.message)
    res.status(500).json(err);
  }
};

export const getConversationByUserIds = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    })

    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
};    


