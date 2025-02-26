import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  user1: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User ID 1
  user2: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User ID 2
  compatibilityScore: { type: Number, required: true }, // Compatibility score (0-100)
  matchedAt: { type: Date, default: Date.now }, // Timestamp of the match
});

export default mongoose.model('Match', matchSchema);