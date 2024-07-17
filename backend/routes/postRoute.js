import express from "express"
import { login, logout, Register } from "../controllers/userController.js";
import { createPost } from "../controllers/postcontroller.js";
import isAuthenticated from "../config/auth.js";

const router = express.Router();

router.route('/create').post(isAuthenticated, createPost)


export default router;