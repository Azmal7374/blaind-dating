import express from 'express';
const router = express.Router();
import {sendMessage,getChatHistory} from '../controllers/chatController.js'

router.post('/send', sendMessage);
router.get('/history/:matchId', getChatHistory);

export default router;