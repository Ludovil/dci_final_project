import axios from 'axios';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import UserCollection from '../models/usersSchema.js';

//const API_KEY = 'c53b5cb2b6794d1881e5704b0a5f1ea0';
const API_KEY = process.env.API_KEY;

export const createUser = async (req, res) => {
  try {
    const { userName, email, password, address, profile_image } = req.body;

    const response = await axios.get(
      `https://api.geoapify.com/v1/geocode/search?housenumber=${address.housenumber}&street=${address.street}&postcode=${address.postcode}&city=${address.city}&country=germany&format=json&apiKey=${API_KEY}`
    );

    // Extract latitude and longitude from the response data
    const lat = response.data.results[0].lat;
    const lon = response.data.results[0].lon;

    // Extract formatted address
    const formatted_address = response.data.results[0].formatted;
    console.log(formatted_address);

    // hashing the password,
    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = new UserCollection({
      userName,
      email,
      password: hashedPassword,
      profile_image,
      address,
      geocode: [lat, lon],
      formatted_address: formatted_address,
    });

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
    const user = await UserCollection.findOne({ email }).populate({
      path: 'conversations',
      populate: [
        {
          path: 'host',
          model: 'users',
        },
        {
          path: 'guest',
          model: 'users',
        },
      ],
    });
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

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { password, address, ...userData } = req.body;
    if (password) {
      const hashedPassword = bcrypt.hashSync(password, 10);
      userData.password = hashedPassword;
    }
    if (address) {
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/search?housenumber=${address.housenumber}&street=${address.street}&postcode=${address.postcode}&city=${address.city}&country=germany&format=json&apiKey=${API_KEY}`
      );
      // Extract latitude and longitude from the response data
      const lat = response.data.results[0].lat;
      const lon = response.data.results[0].lon;

      // Extract formatted address
      const formatted_address = response.data.results[0].formatted;

      // Update the user with the new address, geocode, and formatted_address fields
      userData.address = address;
      userData.geocode = [lat, lon];
      userData.formatted_address = formatted_address;
    }
    const user = await UserCollection.findByIdAndUpdate(id, userData, {
      new: true,
    });
    res.json({ success: true, data: user });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
