const express = require("express");
const router = express.Router();
const { Reports, Tasks, Users, AssignedTos } = require("../models");
const { validateToken } = require("../middleware/auth");

// Check if user is assigned to a task
const isUserAssignedToTask = async (userId, taskId) => {
  const assignment = await AssignedTos.findOne({
    where: { user_id: userId, task_id: taskId },
  });
  return !!assignment;
};

// Get all reports for a specific task by the logged-in user
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
        .json({ error: "You do not have access to this task." });
    }

    const reports = await Reports.findAll({
      where: { user_id: userId, task_id: taskId },
    });

    res.json(reports);
  } catch (error) {
    console.error("Error fetching reports by task: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all reports created by the logged-in user
router.get("/user", validateToken, async (req, res) => {
  const userId = req.user["user"].id;

  try {
    const reports = await Reports.findAll({ where: { user_id: userId } });
    res.json(reports);
  } catch (error) {
    console.error("Error fetching reports by user: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create a new report for a task
router.post("/", validateToken, async (req, res) => {
  const userId = req.user["user"].id;
  const { task_id, description, attachment } = req.body;

  try {
    const task = await Tasks.findByPk(task_id);
    if (!task) {
      return res.status(404).json({ error: "Task not found." });
    }
    if (!(await isUserAssignedToTask(userId, task_id))) {
      return res
        .status(403)
        .json({ error: "You do not have permission to report on this task." });
    }

    const newReport = await Reports.create({
      task_id,
      user_id: userId,
      description,
      attachment,
    });

    const detailedReport = await Reports.findByPk(newReport.id, {
      include: [
        { model: Tasks, attributes: ["name"] },
        { model: Users, attributes: ["username"] },
      ],
    });

    res.status(201).json(detailedReport);
  } catch (error) {
    console.error("Error creating report: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update a report by ID
router.put("/:id", validateToken, async (req, res) => {
  const userId = req.user["user"].id;
  const { id } = req.params;
  const { description, attachment } = req.body;

  try {
    const report = await Reports.findByPk(id);

    if (!report) {
      return res.status(404).json({ error: "Report not found." });
    }

    // Check if the logged-in user is the creator of the report
    if (report.user_id !== userId) {
      return res
        .status(403)
        .json({ error: "You do not have permission to update this report." });
    }

    // Update report
    report.description = description || report.description;
    report.attachment = attachment || report.attachment;
    await report.save();

    res.json(report);
  } catch (error) {
    console.error("Error updating report: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a report by ID
router.delete("/:id", validateToken, async (req, res) => {
  const userId = req.user["user"].id;
  const { id } = req.params;

  try {
    const report = await Reports.findByPk(id);

    if (!report) {
      return res.status(404).json({ error: "Report not found." });
    }

    // Check if the logged-in user is the creator of the report
    if (report.user_id !== userId) {
      return res
        .status(403)
        .json({ error: "You do not have permission to delete this report." });
    }

    await report.destroy();
    res.status(200).json({ message: "Report deleted successfully." });
  } catch (error) {
    console.error("Error deleting report: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;