const express = require("express");
const router = express.Router();
const { TaskComments, Tasks, Users, AssignedTos } = require("../models");
const { validateToken } = require("../middleware/auth");

// Check if user is assigned to a task
const isUserAssignedToTask = async (userId, taskId) => {
  const assignment = await AssignedTos.findOne({
    where: { user_id: userId, task_id: taskId },
  });
  return !!assignment;
};

// Get all comments for a specific task of logged-in user
router.get("/task/:taskId", validateToken, async (req, res) => {
  const userId = req.user["user"].id;
  const { taskId } = req.params;

  try {
    const task = await Tasks.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found." });
    }
    if (!(await isUserAssignedToTask(userId, taskId))) {
      return res
        .status(403)
        .json({ error: "You do not have access to this task's comments." });
    }

    const comments = await TaskComments.findAll({ where: { task_id: taskId } });

      if (comments.length === 0) {
        return res
          .status(404)
          .json({ message: "Task does not have any comments." });
      }

    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a single comment by ID of logged-in user
router.get("/:id", validateToken, async (req, res) => {
  const userId = req.user["user"].id;
  const { id } = req.params;

  try {
    const comment = await TaskComments.findByPk(id);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found." });
    }

    if (!(await isUserAssignedToTask(userId, comment.task_id))) {
      return res
        .status(403)
        .json({ error: "You do not have access to this comment." });
    }

    res.json(comment);
  } catch (error) {
    console.error("Error fetching comment: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create a new comment
router.post("/", validateToken, async (req, res) => {
  const userId = req.user["user"].id;
  const { task_id, comment } = req.body;

  try {
    const task = await Tasks.findByPk(task_id);
    if (!task) {
      return res.status(404).json({ error: "Task not found." });
    }
    if (!(await isUserAssignedToTask(userId, task_id))) {
      return res
        .status(403)
        .json({
          error: "You cannot comment on a task you are not assigned to.",
        });
    }

    const newComment = await TaskComments.create({
      task_id,
      user_id: userId,
      comment,
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error creating comment: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update a comment by ID
router.put("/:id", validateToken, async (req, res) => {
  const userId = req.user["user"].id;
  const { id } = req.params;
  const { comment } = req.body;

  try {
    const commentToUpdate = await TaskComments.findByPk(id);

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

// Delete a comment by ID
router.delete("/:id", validateToken, async (req, res) => {
  const userId = req.user["user"].id;
  const { id } = req.params;

  try {
    const commentToDelete = await TaskComments.findByPk(id);

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