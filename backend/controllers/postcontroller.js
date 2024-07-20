import db from "../config/database.js";

export const createPost = async (req, res) => {
  try {
    const { description, id } = req.body;
    if (!description || !id) {
      return res.status(401).json({
        message: "Fields are required.",
        success: false,
      });
    }
    await db.query(
      "INSERT INTO posts (id, description) VALUES ($1, $2) RETURNING *",
      [id, description]
    );
    return res.status(201).json({
      message: "Post created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(`DELETE FROM posts WHERE id = $1`, [id]);
    return res.status(200).json({
      message: "Tweet deleted successfully",
    });
  } catch (error) {}
};

export const likeOrDislike = async (req, res) => {
  try {
    const loggedInUserId = req.body.id;
    const postId = req.params.id;

    console.log(`Received request to like/dislike post. User ID: ${loggedInUserId}, Post ID: ${postId}`);

    const posts = await db.query("SELECT * FROM posts WHERE id=$1", [postId]);
    const post = posts.rows[0];

    if (!post) {
      return res.status(404).json({
        message: "Post not found.",
        success: false,
      });
    }

    const loggedInUserIdJsonb = JSON.stringify(loggedInUserId);
console.log(typeof(loggedInUserIdJsonb));
    console.log(`Post found: ${JSON.stringify(post)}`);
    
    console.log(`Checking if user has already liked the post. User ID JSONB: ${loggedInUserIdJsonb}`);

    if (post.likes.includes(+loggedInUserIdJsonb)) {
      post.likes.includes(loggedInUserIdJsonb, "json")
      console.log(`User has already liked the post. Removing like.`);
      await db.query(
        "UPDATE posts SET likes = array_remove(likes, $1::jsonb) WHERE id = $2",
        [loggedInUserIdJsonb, postId]
      );
      return res.status(200).json({
        message: "Disliked successfully",
      });
    } else {
      console.log(`User has not liked the post yet. Adding like.`);
      await db.query(
        "UPDATE posts SET likes = array_append(likes, $1::jsonb) WHERE id = $2",
        [loggedInUserIdJsonb, postId]
      );
      return res.status(200).json({
        message: "Liked successfully",
      });
    }
  } catch (error) {
    console.error(`Error in likeOrDislike function: ${error.message}`);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};
