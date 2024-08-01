import express from "express";
import {
  login,
  logout,
  Register,
  bookmarks,
  follow,
  getMyProfile,
  getOtherUserProfile,
} from "../controllers/userController.js";
import isAuthenticated from "../config/auth.js";
import { googleLogin } from "../controllers/googleAuthController.js";

const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/bookmark/:id").put(isAuthenticated, bookmarks);
router.route("/profile/:id").get(isAuthenticated, getMyProfile);
router
  .route("/profile/otheruser/:id")
  .get(isAuthenticated, getOtherUserProfile);
router.route("/follow/:id").post(isAuthenticated, follow);
router.route("/google-login").post(googleLogin);

export default router;
