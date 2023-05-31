import axios from 'axios';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserCollection from '../models/usersSchema.js';
dotenv.config();
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

    // Hash the password
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

    await user.save();
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to create user' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserCollection.findOne({ email }).populate([
      {
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
      },
      {
        path: 'reviews',
        populate: {
          path: 'reviewerUser',
          model: 'users',
        },
      },
    ]);

    if (!user) {
      return res.json({ success: false, message: 'This email does not exist' });
    }

    const verifyPassword = bcrypt.compareSync(password, user.password);
    if (!verifyPassword) {
      return res.json({
        success: false,
        message: 'The password does not match',
      });
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.SIGNATURE,
      { expiresIn: '1h', issuer: 'Ludo' }
    );

    res.header('token', token).json({ success: true, data: user });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export const readUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserCollection.findById(id);
    if (!user) {
      return res.json({ success: false, message: 'Invalid user ID' });
    }
    res.json({ success: true, data: user });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export const readAllUsers = async (req, res) => {
  try {
    const users = await UserCollection.find().populate([
      {
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
      },
      {
        path: 'reviews',
        populate: {
          path: 'reviewerUser',
          model: 'users',
        },
      },
    ]);
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

export const getUserAverageRating = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserCollection.findById(id).populate('reviews');

    if (!user) {
      return res.json({ success: false, message: 'User does not exist' });
    }

    const reviewCount = user.reviews.length;
    let totalRating = 0;

    for (const review of user.reviews) {
      totalRating += review.rating;
    }

    const averageRating = reviewCount > 0 ? totalRating / reviewCount : 0;

    res.json({ success: true, data: { averageRating, reviewCount } });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
