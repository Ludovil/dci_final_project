import mongoose from "mongoose";
import { Schema, model } from 'mongoose';

const ConversationSchema = new mongoose.Schema(
  {
    host: {type: Schema.Types.ObjectId, ref: 'users'},
    guest: {type: Schema.Types.ObjectId, ref: 'users'},
  },
  { timestamps: true }
);

const Conversation = model('conversations', ConversationSchema);

export default Conversation;