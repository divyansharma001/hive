import express from "express"
import { login, logout, Register } from "../controllers/userController.js";
import { bookmarks } from "../controllers/postcontroller.js";
import isAuthenticated from "../config/auth.js";

const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route('/bookmark/:id').put(isAuthenticated, bookmarks)


export default router;