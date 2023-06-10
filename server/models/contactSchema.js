import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const contactSchema = new Schema({
  contactName: { type: String },
  contactEmail: { type: String },
  contactMessage: { type: String },
});

const ContactCollection = model("contactmessages", contactSchema);

export default ContactCollection;
