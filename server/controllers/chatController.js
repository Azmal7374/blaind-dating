import Chat from '../models/chat.js'
export const sendMessage = async (req, res) => {
  const { matchId, sender, content } = req.body;

  try {
    const chat = await Chat.findOne({ matchId });
    if (!chat) {
      const newChat = new Chat({ matchId, messages: [{ sender, content }] });
      await newChat.save();
      return res.status(201).json(newChat);
    }

    chat.messages.push({ sender, content });
    await chat.save();
    res.status(200).json(chat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getChatHistory = async (req, res) => {
  try {
    const chat = await Chat.findOne({ matchId: req.params.matchId }).populate(
      'messages.sender',
      'name'
    ); 
    res.status(200).json(chat);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
