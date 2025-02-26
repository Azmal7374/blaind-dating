import Match from '../models/match.js'

// Create a new match
export const createMatch = async (req, res) => {
  const { user1, user2, compatibilityScore } = req.body;

  try {
    const match = new Match({ user1, user2, compatibilityScore });
    await match.save();
    res.status(201).json(match);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all matches for a user
export const getUserMatches = async (req, res) => {
  try {
    const userId = req.params.userId;
    const matches = await Match.find({ $or: [{ user1: userId }, { user2: userId }] })
      .populate('user1 user2', 'name age gender interests'); 
    res.status(200).json(matches);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
