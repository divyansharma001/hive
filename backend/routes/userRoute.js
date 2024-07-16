import express from "express"
import { login, Register } from "../controllers/userController.js";

const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(login)

export default router;