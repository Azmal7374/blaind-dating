import express from 'express';
import { createMatch} from '../controllers/matchController.js'; // 
const router = express.Router();

router.post('/matches', createMatch);
// router.get('/user/:userId', getUserMatches);

export default router;