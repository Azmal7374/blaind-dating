import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  matchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Match', required: true }, // Match ID
  messages: [
    {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Sender ID
      content: { type: String, required: true }, // Message content
      timestamp: { type: Date, default: Date.now }, // Timestamp of the message
    },
  ],
});

export default mongoose.model('Chat', chatSchema);