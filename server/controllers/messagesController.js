import Message from "../models/messageSchema.js";

export const addMessage = async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getMessagesByConversationId = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    }).populate("sender");
    console.log("messages", messages);
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};
