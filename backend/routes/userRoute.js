import express from "express"
import { login, logout, Register } from "../controllers/userController.js";
import { bookmarks, getMyProfile, getOtherUserProfile } from "../controllers/postcontroller.js";
import isAuthenticated from "../config/auth.js";

const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route('/bookmark/:id').put(isAuthenticated, bookmarks)
router.route('/profile/:id').get(isAuthenticated, getMyProfile)
router.route('/profile/otheruser/:id').get(isAuthenticated, getOtherUserProfile)


export default router;