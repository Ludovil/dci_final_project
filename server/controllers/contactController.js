import ContactCollection from "../models/contactSchema.js";

export const createContactMessage = async (req, res) => {
  try {
    const { contactName, contactEmail, contactMessage } = req.body;
    console.log(contactName, contactEmail, contactMessage);
    const message = new ContactCollection({
      contactName,
      contactEmail,
      contactMessage,
    });

    await message.save();
    res.status(201).json({ success: true, data: message });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};
