import jwt from 'jsonwebtoken';
import UserCollectionRicardo from '../modelsRicardo/userSchemaRicardo.js';

export const authorizedUserRicardo = async (req, res, next) => {
  try {
    const token = req.headers.token;

    const payload = jwt.verify(token, process.env.SIGNATURE); // CORREGIR ESTO DE LA SIGNATURE
    const user = await UserCollectionRicardo.findById(payload._id);

    req.user = user;
    next();
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
