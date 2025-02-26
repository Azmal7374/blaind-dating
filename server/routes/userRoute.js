import express from 'express';
import { createUser, getUser,getAllUsers } from '../controllers/userController.js'; // Include .js extension

const router = express.Router();

router.post('/register', createUser);
router.get('/:id', getUser);
router.get('/', getAllUsers);

export default router;