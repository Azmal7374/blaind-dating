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

    res
      .status(201)
      .json({
        message: `${action === "like" ? "Like" : "Pass"} recorded`,
        match,
      });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
