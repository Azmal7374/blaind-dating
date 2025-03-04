import User from '../models/user.js'; 
import Match from '../models/match.js'; 
import multer from 'multer';
import path from 'path';

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

export const createUser = [
  upload.array('profile_pics', 10),
  async (req, res) => {
    try {
      if (!req.files || req.files.length < 2) {
        return res.status(400).json({ error: 'At least two profile pictures are required.' });
      }

      const profile_pics = req.files.map((file) => file.path);

      const {
        name,
        email,
        gender,
        country,
        dob,
        bio,
        looking_for,
        interests,
        personalityTraits,
      } = req.body;

      // Validate required fields
      if (!name || !email || !gender || !country || !dob) {
        return res.status(400).json({ error: 'All required fields must be filled.' });
      }

      const user = new User({
        name,
        email,
        gender,
        country,
        dob: new Date(dob),
        bio,
        profile_pics,
        looking_for,
        interests: interests ? interests.split(',') : [], 
        personalityTraits: personalityTraits ? personalityTraits.split(',') : [], 
      });

     
      await user.save();

      res.status(201).json({ message: 'User created successfully', user });
    } catch (err) {
      console.error(err); 
      if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message });
      }
      if (err.code === 11000) {
        return res.status(400).json({ error: 'Email already exists.' });
      }
      res.status(500).json({ error: 'Failed to register user. Please try again.' });
    }
  },
];

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    const totalUsers = users.length;
    res.status(200).json({
      totalUsers, 
      users,   
    });;
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } 
    );
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};




export const getUsers = async (req, res) => {
  const { userId } = req.query;

  try {
    // Fetch current user
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Fetch profiles excluding already liked/passed users
    const matches = await Match.find({ user1: userId });
    const seenUserIds = matches.map(match => match.user2);

    const users = await User.find({
      _id: { $ne: userId, $nin: seenUserIds }, // Exclude current user and seen profiles
      looking_for: currentUser.gender, // Filter based on preferences
    });

    res.status(200).json({ users });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};