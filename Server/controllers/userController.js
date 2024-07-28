import db from "../config/database.js";
import bcryptjs from "bcryptjs";
import { createSigner, createVerifier } from "fast-jwt";

const signer = createSigner({ key: process.env.TOKEN_SECRET, expiresIn: "7d" });
const verifier = createVerifier({ key: process.env.TOKEN_SECRET });
const pepper = process.env.PASSWORD_PEPPER;

export const Register = async (req, res) => {
  try {
    const { email, name, username, password } = req.body;

    if (!email || !name || !username || !password) {
      return res.status(401).json({
        message: "All fields are required",
        success: false,
      });
    }
    const userResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    const user = userResult.rows[0];

    if (user) {
      return res.status(401).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcryptjs.hash(password + pepper, 12);

    await db.query(
      "INSERT INTO users (email, name, username, password) VALUES ($1,$2,$3,$4)",
      [email, name, username, hashedPassword]
    );

    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  const startTime = Date.now();
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ message: "All fields are required" });
    }

    const userResult = await db.query(
      "SELECT id, name, password FROM users WHERE email = $1",
      [email]
    );

    const user = userResult.rows[0];
    if (!user) {
      return res
        .status(401)
        .json({
          message: "User does not exist with this email",
          success: false,
        });
    }

    const isMatched = await bcryptjs.compare(password + pepper, user.password);

    if (!isMatched) {
      return res
        .status(401)
        .json({ message: "Incorrect Credentials", success: false });
    }

    const token = signer({ userId: user.id });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    }); // 7 days
    return res
      .status(200)
      .json({ message: `Welcome back ${user.name}`, success: true });
  } catch (error) {
    console.error(`[${Date.now() - startTime}ms] Login error:`, error);
    return res
      .status(500)
      .json({ message: "An error occurred during login", success: false });
  } finally {
    console.log(`[${Date.now() - startTime}ms] Total login time`);
  }
};

export const logout = (req, res) => {
  return res.cookie("token", "", { expires: new Date(0) }).json({
    message: "User logged out successfully",
    success: true,
  });
};

export const bookmarks = async (req, res) => {
  try {
    const loggedInUserId = req.body.id;
    const postId = req.params.id;

    console.log(
      `Received request to bookmark post. User ID: ${loggedInUserId}, Post ID: ${postId}`
    );

    const response = await db.query("SELECT * FROM users WHERE id = $1", [
      loggedInUserId,
    ]);
    const userDetails = response.rows[0];

    if (!userDetails) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    console.log(`User details: ${JSON.stringify(userDetails)}`);

    const loggedInUserIdJsonb = JSON.stringify(loggedInUserId);

    console.log(userDetails.bookmarks.includes(+loggedInUserIdJsonb));

    if (userDetails.bookmarks.includes(+loggedInUserIdJsonb)) {
      console.log(`User has already bookmarked the post. Removing bookmark.`);
      await db.query(
        "UPDATE users SET bookmarks = array_remove(bookmarks, $1::jsonb) WHERE id = $2",
        [postId, loggedInUserId]
      );
      return res.status(200).json({
        message: "Post removed from bookmarks",
        success: true,
      });
    } else {
      console.log(`User has not bookmarked the post yet. Adding bookmark.`);
      await db.query(
        "UPDATE users SET bookmarks = array_append(bookmarks, $1::jsonb) WHERE id = $2",
        [postId, loggedInUserId]
      );
      return res.status(201).json({
        message: "Post bookmarked successfully",
        success: true,
      });
    }
  } catch (error) {
    console.error(`Error in bookmarks function: ${error.message}`);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const loggedInUserId = req.params.id;
    const response = await db.query(
      "SELECT id, email, name, username, bookmarks, followers, following FROM users WHERE id = $1",
      [loggedInUserId]
    );
    const userDetails = response.rows[0];
    return res.status(200).json({
      message: "User details fetched successfully",
      success: true,
      userDetails,
    });
  } catch (error) {
    console.error(`Error in getMyProfile function: ${error.message}`);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

export const getOtherUserProfile = async (req, res) => {
  try {
    const loggedInUserId = req.params.id;
    const otherUsers = await db.query(
      "SELECT id, email, name, username, bookmarks, followers, following FROM users WHERE id != $1",
      [loggedInUserId]
    );
    if (!otherUsers) {
      return res.status(404).json({
        message: "No other users found.",
        success: false,
      });
    }
    return res.status(200).json({
      message: "User details fetched successfully",
      success: true,
      otherUsers,
    });
  } catch (error) {
    console.error(`Error in getOtherUserProfile function: ${error.message}`);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

export const follow = async (req, res) => {
  try {
    const loggedInUserId = req.body.id; //divyansh sharma (i will follow => mere following me hive ki id store hogi)
    const userId = req.params.id; //hive (will be followed => iske followers me meri id store hogi )
    const loggedInUser = await db.query("SELECT * FROM users WHERE id = $1", [
      loggedInUserId,
    ]);
    const loggedInUserData = loggedInUser.rows[0];
    const user = await db.query("SELECT * FROM users WHERE id = $1", [userId]);
    const userData = user.rows[0];
    console.log(userData.name);
    console.log(loggedInUserData);

    if (!userData.followers.includes(+loggedInUserId)) {
      await db.query(
        "UPDATE users SET followers = array_append(followers, $1::jsonb) WHERE id = $2",
        [loggedInUserId, userId]
      );

      await db.query(
        "UPDATE users SET following = array_append(following, $1::jsonb) WHERE id = $2",
        [userId, loggedInUserId]
      );

      return res.status(200).json({
        message: `${loggedInUserData.name} just followed to ${userData.name}`,
      });
    } else if (userData.followers.includes(+loggedInUserId)) {
      await db.query(
        "UPDATE users SET followers = array_remove(followers, $1::jsonb) WHERE id = $2",
        [loggedInUserId, userId]
      );

      await db.query(
        "UPDATE users SET following = array_remove(following, $1::jsonb) WHERE id = $2",
        [userId, loggedInUserId]
      );

      return res.status(200).json({
        message: `${loggedInUserData.name} just unfollowed to ${userData.name}`,
      });
    } else {
      return res.status(404).json({
        message: `Something went wrong in following/Unfollowing`,
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(404).json({
      message: "Follow/Unfollow functionality isn't working",
      success: false,
    });
  }
};
