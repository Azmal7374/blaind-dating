import express from "express";
import {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  getUsers,
  getCurrentUser,
} from "../controllers/userController.js";

const router = express.Router();

// POST /api/users/register
router.post("/register", createUser);

// GET /api/users/filtered (filtered users)
router.get("/filtered", getUsers);

// GET /api/users/current
router.get("/current", getCurrentUser);

// GET /api/users/:id
router.get("/:id", getUser);

// GET /api/users
router.get("/", getAllUsers);

// PUT /api/users/:id
router.put("/:id", updateUser);

export default router;