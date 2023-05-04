// IN THIS CODE THERE IS NOTHING YET ABOUT BCRYPT AND JWT
// import bcrypt from 'bcrypt'; & import jwt from 'jsonwebtoken';

// THERE IS ALSO NOTHING ABOUT IMAGE UPLOADED BY THE USER (NOT THE DEFAULT ONE)

// WE COULD ADD SOME CONDITION TO THE IMAGE_UPLOADING TO ALLOW ONLY AS A PHOTO A JPEG FILE --> IT'D BE GOOD IF WE DO IT AND MAKE SOMETHING NEW

// ==========================================================================================//

import UserCollectionRicardo from '../modelsRicardo/userSchemaRicardo.js';
import ImageCollectionRicardo from '../modelsRicardo/imageSchemaRicardo.js';
import bcrypt from 'bcrypt'; // npm i bcrypt
import jwt from 'jsonwebtoken'; // npm i jsonwebtoken

// Create a new user
export const createUserRicardo = async (req, res) => {
  try {
    const newUser = new UserCollectionRicardo(req.body);

    if (req.files) {
      const image = new ImageCollectionRicardo({
        filename: new Date().getTime() + '_' + req.files.profilePicture.name,
        data: req.files.profilePicture.data,
        userId: newUser._id,
      });
      await image.save();
      newUser.profileImage = `http://localhost:4000/images/${image.filename}`;
    }

    const hashedPasswordRicardo = bcrypt.hashSync(user.password, 12);
    user.password = hashedPasswordRicardo;

    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all users
export const getAllUsersRicardo = async (req, res) => {
  try {
    const users = await UserCollectionRicardo.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific user by ID
export const getUserByIdRicardo = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserCollectionRicardo.findById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a specific user by ID
export const updateUserRicardo = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserCollectionRicardo.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a specific user by ID
export const deleteUserRicardo = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserCollectionRicardo.findByIdAndRemove(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginUserRicardo = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserCollectionRicardo.findOne({ email });

    if (user) {
      const verifyPasswordRicardo = bcrypt.compareSync(password, user.password);
      if (verifyPasswordRicardo) {
        const token = jwt.sign(
          { _id: user._id, email: user.email }, //
          process.env.SIGNATURE, // TENGO QUE CREARLA
          { expiresIn: '1h', issuer: 'Lili', audience: 'e-store-user' } // MIRAR QUÉ ES ESTO BIEN
        );
        res.header('token', token).json({ success: true, data: user });
      } else {
        res.json({ success: false, message: 'The password does not match' });
      }
    } else {
      res.json({
        success: false,
        message: 'The email does not exist in our database',
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
