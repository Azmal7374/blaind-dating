import express from 'express';
import { createMatch,getMatches} from '../controllers/matchController.js'; // 
const router = express.Router();

router.post('/matches', createMatch);
router.get('/:userId', getMatches);



export default router;