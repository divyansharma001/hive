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

    console.log(
      `Received request to like/dislike post. User ID: ${loggedInUserId}, Post ID: ${postId}`
    );

    const posts = await db.query("SELECT * FROM posts WHERE id=$1", [postId]);
    const post = posts.rows[0];

    if (!post) {
      return res.status(404).json({
        message: "Post not found.",
        success: false,
      });
    }

    const loggedInUserIdJsonb = JSON.stringify(loggedInUserId);
    console.log(typeof loggedInUserIdJsonb);
    console.log(`Post found: ${JSON.stringify(post)}`);

    console.log(
      `Checking if user has already liked the post. User ID JSONB: ${loggedInUserIdJsonb}`
    );

    console.log(post.likes.includes(+loggedInUserIdJsonb));
    if (post.likes.includes(+loggedInUserIdJsonb)) {
      console.log(post.likes.includes(+loggedInUserIdJsonb));
      post.likes.includes(loggedInUserIdJsonb, "json");
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

export const getAllPosts = async (req, res) => {
  try {
    const id = req.params.id;
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    const loggedInUser = await db.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    const loggedInUserData = loggedInUser.rows[0];

    if (!loggedInUserData) {
      return res.status(404).json({ message: "User not found" });
    }

    const allUserIds = [id, ...loggedInUserData.following];

    const allPosts = await db.query(
      `
      SELECT
        users.name,
        users.username,
        users.profile_picture,
        posts.created_at,
        posts.description,
        posts.likes
      FROM
        users
      INNER JOIN
        posts ON users.id = posts.user_id
      WHERE
        posts.user_id = ANY($1)
      ORDER BY
        posts.created_at DESC
      LIMIT $2 OFFSET $3
      `,
      [allUserIds, limit, offset]
    );

    return res.status(200).json({
      posts: allPosts.rows,
      hasMore: allPosts.rows.length === limit,
      nextPage: page + 1,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Error fetching posts",
      error: error.message,
    });
  }
};
