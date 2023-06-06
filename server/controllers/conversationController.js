import Conversation from '../models/conversationSchema.js';
import UserCollection from '../models/usersSchema.js';

//
export const newConversation = async (req, res) => {
  const count = await Conversation.findOne({
    guest: req.body.guest,
    host: req.body.host,
  });
  if (count) {
    return res.status(200).json(count);
  } else {
    try {
      const newConversation = new Conversation(req.body);

      const savedConversation = await newConversation.save();
      const guest = await UserCollection.findByIdAndUpdate(req.body.guest, {
        $push: {
          conversations: savedConversation._id,
        },
      });
      const host = await UserCollection.findByIdAndUpdate(req.body.host, {
        $push: {
          conversations: savedConversation._id,
        },
      });
      res.status(200).json(savedConversation);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

export const getConversationById = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id)
      .populate('host')
      .populate('guest');
    res.status(200).json(conversation);
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }
};

export const getConversationByUserIds = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: {
        $all: [req.params.firstUserId, req.params.secondUserId],
      },
    });

    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteConversation = async (req, res) => {
  const { id } = req.params;
  try {
    // Find the user by userId
    const conversation = await Conversation.findById(id);
    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }
    // Find the user by userId

    const guest = await UserCollection.findByIdAndUpdate(
      conversation.guest,
      { $pull: { conversations: id } },
      { new: true }
    ).populate('conversations');

    const host = await UserCollection.findByIdAndUpdate(
      conversation.host,
      { $pull: { conversations: id } },
      { new: true }
    ).populate('conversations');
    console.log(req.user._id);
    let user;
    if (guest) {
      user = req.user._id === guest._id ? guest : host;
    } else {
      user = req.user._id === host._id ? host : guest;
    }
    // Delete the conversation document
    await Conversation.findByIdAndRemove(id);

    return res.status(200).json({ succes: true, data: user });
  } catch (error) {
    console.error('Error deleting conversation:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
