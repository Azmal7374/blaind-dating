import Match from '../models/match.js';
import User from '../models/user.js';
import { calculateCompatibility } from '../utlis/compatibility.js';

export const createMatch = async (req, res) => {
  const { user1, user2, action } = req.body; // action: 'like' or 'pass'

  try {
    // Fetch user data
    const user1Data = await User.findById(user1);
    const user2Data = await User.findById(user2);

    if (!user1Data || !user2Data) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Calculate compatibility score (only for likes)
    const compatibilityScore = action === 'like' ? calculateCompatibility(user1Data, user2Data) : 0;

    // Create a new match
    const match = new Match({ user1, user2, compatibilityScore });
    await match.save();

    // Check if it's a mutual like
    if (action === 'like') {
      const mutualMatch = await Match.findOne({ user1: user2, user2: user1 });

      if (mutualMatch) {
        // Notify both users of a mutual match
        return res.status(201).json({ message: 'It\'s a match!', match });
      }
    }

    res.status(201).json({ message: `${action === 'like' ? 'Like' : 'Pass'} recorded`, match });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};