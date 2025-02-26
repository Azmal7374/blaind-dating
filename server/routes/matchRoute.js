import express from 'express';
import { createMatch, getUserMatches } from '../controllers/matchController.js'; // 
const router = express.Router();

router.post('/create', createMatch);
router.get('/user/:userId', getUserMatches);

export default router;