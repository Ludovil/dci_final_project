import axios from 'axios';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserCollection from '../models/usersSchema.js';
import ProfileImageCollection from '../models/profileImagesSchema.js';

const API_KEY = 'c53b5cb2b6794d1881e5704b0a5f1ea0';

export const createUser = async (req, res) => {
  try {
    const {
      userName,
      email,
      password,
      city,
      country,
      street,
      housenumber,
      postcode,
      profile_image,
    } = req.body;

    const response = await axios.get(
      `https://api.geoapify.com/v1/geocode/search?housenumber=${housenumber}&street=${street}&postcode=${postcode}&city=${city}&country=germany&format=json&apiKey=${API_KEY}`
    );

    // Extract latitude and longitude from the response data
    const lat = response.data.results[0].lat;
    const lon = response.data.results[0].lon;

    // Extract formatted address
    const formatted_address = response.data.results[0].formatted;
    console.log(formatted_address);

    // hashing the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = new UserCollection({
      userName,
      email,
      password: hashedPassword,
      profile_image,
      address: {
        country,
        city,
        postcode,
        street,
        housenumber,
      },
      geocode: [lat, lon],
      formatted_address: formatted_address,
    });

    // store profile image
    if (req.files) {
      const image = new ProfileImageCollection({
        filename: new Date().getTime() + '_' + req.files.profilePicture.name,
        data: req.files.profilePicture.data,
        userId: user._id,
      });
      await image.save();
      user.profileImage = `http://localhost:4000/images/${image.filename}`;
    }

    try {
      await user.save();
      res.status(201).json({ success: true, data: user });
    } catch (err) {
      res.status(500).json({ err: 'Failed to create user' });
    }
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

//login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserCollection.findOne({ email });
    if (user) {
      const verifyPassword = bcrypt.compareSync(password, user.password);
      if (verifyPassword) {
        const token = jwt.sign(
          { _id: user._id, email: user.email },
          process.env.SIGNATURE,
          { expiresIn: '1h', issuer: 'Ludo' }
        );
        res.header('token', token).json({ success: true, data: user });
      } else {
        res.json({
          success: false,
          message: 'The password does not match',
        });
      }
    } else {
      res.json({
        success: false,
        message: 'This email does not exist',
      });
    }
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
//
export const readUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserCollection.findById(id);
    if (user) {
      res.json({ success: true, data: user });
    } else {
      res.json({ success: false, message: 'not valid id' });
    }
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export const readAllUsers = async (req, res) => {
  try {
    const users = await UserCollection.find();
    res.json({ success: true, data: users });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
