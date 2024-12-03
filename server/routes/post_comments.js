const express = require("express");
const router = express.Router();
const { PostComments, Posts, Users } = require("../models");
const { validateToken } = require("../middleware/auth");

// Get all comments for a post with pagination
router.get("/post/:postId", async (req, res) => {
  const { postId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const parsedPage = parseInt(page, 10);
  const parsedLimit = parseInt(limit, 10);

  if (isNaN(parsedPage) || parsedPage < 1) {
    return res.status(400).json({ error: "Invalid page number. Must be a positive integer." });
  }

  const offset = (parsedPage - 1) * parsedLimit;

  try {
    const { count, rows: comments } = await PostComments.findAndCountAll({
      where: { post_id: postId },
      include: [
        { model: Users, attributes: ["id", "username"] },
      ],
      limit: parsedLimit,
      offset,
    });

    const totalPages = Math.ceil(count / parsedLimit);

    if (parsedPage > totalPages && totalPages > 0) {
      return res.status(404).json({
        error: "Page not found.",
        totalPages,
      });
    }

    res.json({
      totalComments: count,
      totalPages,
      currentPage: parsedPage,
      comments,
    });
  } catch (error) {
    console.error("Error fetching comments for post: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a comment by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await PostComments.findByPk(id, {
      include: [
        { model: Users, attributes: ["id", "username"] },
        { model: Posts, attributes: ["id"] },
      ],
    });

    if (!comment) {
      return res.status(404).json({ error: "Comment not found." });
    }

    res.json(comment);
  } catch (error) {
    console.error("Error fetching comment: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create new comment
router.post("/", validateToken, async (req, res) => {
  const userId = req.user["user"].id;
  const { post_id, comment } = req.body;

  try {
    const postExists = await Posts.findByPk(post_id);
    if (!postExists) {
      return res.status(404).json({ error: "Post not found" });
    }

    const newComment = await PostComments.create({
      post_id,
      user_id: userId,
      comment,
    });

    const detailedComment = await PostComments.findByPk(newComment.id, {
      include: [{ model: Users, attributes: ["id", "username"] }],
    });

    res.status(201).json(detailedComment);
  } catch (error) {
    console.error("Error creating comment: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update comment
router.put("/:id", validateToken, async (req, res) => {
  const userId = req.user["user"].id;
  const { id } = req.params;
  const { comment } = req.body;

  try {
    const commentToUpdate = await PostComments.findByPk(id);

    if (!commentToUpdate) {
      return res.status(404).json({ error: "Comment not found." });
    }

    if (commentToUpdate.user_id !== userId) {
      return res
        .status(403)
        .json({ error: "You do not have permission to update this comment." });
    }

    commentToUpdate.comment = comment || commentToUpdate.comment;
    await commentToUpdate.save();

    res.json(commentToUpdate);
  } catch (error) {
    console.error("Error updating comment: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete comment
router.delete("/:id", validateToken, async (req, res) => {
  const userId = req.user["user"].id;
  const { id } = req.params;

  try {
    const commentToDelete = await PostComments.findByPk(id);

    if (!commentToDelete) {
      return res.status(404).json({ error: "Comment not found." });
    }

    if (commentToDelete.user_id !== userId) {
      return res
        .status(403)
        .json({ error: "You do not have permission to delete this comment." });
    }

    await commentToDelete.destroy();
    res.status(200).json({ message: "Comment deleted successfully." });
  } catch (error) {
    console.error("Error deleting comment: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;