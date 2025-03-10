import Match from "../models/match.js";
import User from "../models/user.js";
import { calculateCompatibility } from "../utlis/compatibility.js";

export const createMatch = async (req, res) => {
  const { user1, user2, action } = req.body;

  try {
    const user1Data = await User.findById(user1);
    const user2Data = await User.findById(user2);

    if (!user1Data || !user2Data) {
      return res.status(404).json({ error: "User not found" });
    }

    const compatibilityScore =
      action === "like" ? calculateCompatibility(user1Data, user2Data) : 0;

    console.log(`Compatibility Score: ${compatibilityScore}`);

    if (action === "like" && compatibilityScore < 80) {
      return res
        .status(200)
        .json({ message: "Compatibility score too low. Match not saved." });
    }

    const match = new Match({ user1, user2, compatibilityScore });
    await match.save();

    if (action === "like") {
      const mutualMatch = await Match.findOne({ user1: user2, user2: user1 });

      if (mutualMatch) {
        return res.status(201).json({ message: "It's a match!", match });
      }
    }

    res.status(201).json({
      message: `${action === "like" ? "Like" : "Pass"} recorded`,
      match,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



export const getMatches = async (req, res) => {
  const { userId } = req.params; // Get the user ID from the request parameters

  try {
    // Find all matches where the user is either user1 or user2
    const matches = await Match.find({
      $or: [{ user1: userId }, { user2: userId }],
    })
      .populate("user1", "username interests personalityTraits") // Populate user1 details
      .populate("user2", "username interests personalityTraits"); // Populate user2 details

    if (!matches || matches.length === 0) {
      return res.status(404).json({ message: "No matches found for this user." });
    }

    // Format the matches to include only the other user's details
    const formattedMatches = matches.map((match) => {
      const otherUser =
        match.user1._id.toString() === userId ? match.user2 : match.user1;
      return {
        matchId: match._id,
        compatibilityScore: match.compatibilityScore,
        matchedAt: match.matchedAt,
        user: otherUser,
      };
    });

    res.status(200).json({ matches: formattedMatches });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};