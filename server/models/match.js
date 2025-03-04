import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  user1: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who liked
  user2: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who was liked
  compatibilityScore: { type: Number, required: true }, // Score based on interests and traits
  matchedAt: { type: Date, default: Date.now }, // Timestamp of the match
});

export default mongoose.model('Match', matchSchema);