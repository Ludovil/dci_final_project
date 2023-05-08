import mongoose from "mongoose";
import { Schema, model } from 'mongoose';

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Conversation = model('conversation', ConversationSchema);

export default Conversation;