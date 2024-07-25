import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  likeOrDislike,
} from "../controllers/postcontroller.js";
import isAuthenticated from "../config/auth.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, createPost);
router.route("/delete/:id").delete(isAuthenticated, deletePost);
router.route("/like/:id").put(isAuthenticated, likeOrDislike);
router.route("/getAllPosts/:id").get(isAuthenticated, getAllPosts)

export default router;
