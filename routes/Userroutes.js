import express from "express";

import {
  createUser,
  getUsers,
} from "../config/controllers/userController.js";

const router = express.Router();

router.post("/create", createUser);

router.get("/", getUsers);

export default router;