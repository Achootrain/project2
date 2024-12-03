const express = require("express");
const router = express.Router();
const { validateToken } = require("../middleware/auth");
const { Projects, ProjectJoineds, Users } = require("../models");
const { Op } = require("sequelize");

// Create a new project
router.get('/create', async (req, res) => {
  res.send("Create project route");
});

router.post('/create', validateToken, async (req, res) => {
  const {
    name,
    description,
    start_date,
    end_date,
    code,
    model,
    accessibility,
  } = req.body;
  const userId = req.user["user"].id;
  if (!name && !description) {
    return res.status(400).json({
      error: "Please provide name,description for the project.",
    });
  }

  try {


    const newProject = await Projects.create({
      name: name,
      description: description,
      start_date: start_date,
      end_date: end_date,
      code: code,
      model: model,
      accessibility: accessibility,
    });

    await ProjectJoineds.create({
      project_id: newProject.id,
      participant_id: userId,
      isManager: true,
    });

    res.status(201).json({
      message: "Project created successfully and user assigned as manager.",
      project: newProject,
    });
  } catch (error) {
    console.error("Error creating project:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while creating the project." });
  }
})

router.get('/', async (req, res) => {
  res.send("Projects route");
});


// Get all projects joined
router.get('/fetch', validateToken, async (req, res) => {
  const userId = req.user["user"].id;
  try {
    const joinedProjects = await Projects.findAll({
      attributes: { exclude: ['accessibility', 'code', 'model'] },
      include: [
        {
          model: ProjectJoineds,
          where: { participant_id: userId },
          required: true,
          attributes: [],
        },
      ],
    });

    if (joinedProjects.length === 0) {
      return res.json({});

    }
    for (let projects of joinedProjects) {

      const avt = await ProjectJoineds.findAll({
        attributes: [],
        include: [
          {
            model: Users,
            attributes: ['avatar']
          }
        ],
        where: {
          project_id: projects.id,
        },

      });
      const avtPlain = avt.map(entry => entry.toJSON()); // Converts each Sequelize instance to a plain object
      projects.dataValues.avatars = avtPlain.map(entry => entry.User ? entry.User.avatar : null);


    }

    res.json(joinedProjects);
  } catch (error) {
    console.error("Error fetching joined projects:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving joined projects." });
  }
});

// get one project with ID ========== author : Hai
router.get('/getone', validateToken, async (req, res) => {
  const user_id = req.user['user'].id
  const { project_id } = req.query;
  try {
    // check isParticipant-------
    const joiner_Joined = await ProjectJoineds.findOne({
      where: {
        project_id: project_id,
        participant_id: user_id
      }
    })
    if (!joiner_Joined) {
      const err = new Error(`User<id:${user_id}> is not in this project<id:${project_id}> as a member or a manager !`);
      err.status = 400;
      throw err;
    }
    //---------------------------

    const project = await Projects.findByPk(project_id)
    res.json({ success: true, project })

  } catch (err) {
    return res.status(err.status || 500).json({
      success: false,
      message: err.message
    });
  }
})


module.exports = router
