import mongoose, { Schema } from "mongoose";


const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "conversations",
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);
const Message = mongoose.model("messages", MessageSchema);   

export default Message; 
