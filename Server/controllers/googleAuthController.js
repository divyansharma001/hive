import { OAuth2Client } from 'google-auth-library';
import db from "../config/database.js";
import { createSigner } from "fast-jwt";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const signer = createSigner({ key: process.env.TOKEN_SECRET, expiresIn: "7d" });
const googleAuthMarker = process.env.GOOGLE_AUTH_USER;

export const googleLogin = async (req, res) => {

  async function generateUniqueUsername(name) {
    let baseUsername = name.replace(/\s+/g, '').toLowerCase();
    let username = baseUsername;
    let counter = 1;

    try {
      while (true) {
        const result = await db.query("SELECT * FROM users WHERE username = $1", [username]);

        if (result.rows.length === 0) {
          console.log("Unique username generated:", username); // Debugging line
          return username;
        }

        username = `${baseUsername}${counter}`;
        counter++;
      }
    } catch (error) {
      console.error("Database query error:", error);
      throw new Error("Failed to generate unique username. Please try again later.");
    }
  }

  try {
    const { credential } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    let userResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    let user = userResult.rows[0];

    if (!user) {
      const uniqueUsername = await generateUniqueUsername(name);
      console.log("Username to be inserted:", uniqueUsername); // Debugging line
      const result = await db.query(
        "INSERT INTO users (email, name, profile_picture, username, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [email, name, picture, uniqueUsername, googleAuthMarker]
      );
      user = result.rows[0];
    }

    // Generate token
    const token = signer({ userId: user.id });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: `Welcome ${user.name}`,
      user,
      success: true,
    });

  } catch (error) {
    console.error('Google login error:', error);
    return res.status(500).json({
      message: "An error occurred during Google login",
      success: false,
    });
  }
};
