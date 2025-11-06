import express from "express";

import {
  displayHome,
  getUsers,
  getUserByID,
  createUser,
  updateUsers,
  deleteUser,
} from "../controllers/comd.js";

import { verifyToken } from "../controllers/sends.js";

const router = express.Router();

router.get("/", verifyToken, displayHome);

router.get("/users", verifyToken, getUsers);

router.get("/users/:id", verifyToken, getUserByID);

router.post("/users", verifyToken, createUser);

router.put("/users/:id", verifyToken, updateUsers);

router.delete("/users/:id", verifyToken, deleteUser);

export default router;
