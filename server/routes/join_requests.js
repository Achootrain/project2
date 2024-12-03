const express = require('express')
const router = express.Router()
const { JoinRequests, ProjectJoineds, Projects } = require('../models')
const { validateToken } = require('../middleware/auth');
const { where } = require('sequelize');
const join_requests = require('../models/join_requests');
require('dotenv').config();


// Get request ==============================================
// <manager only> -------------------------------------------
// http://localhost:3001/requests/project/:project_id
router.get("/project/:project_id", validateToken, async (req, res) => {
    const manager_id = req.user['user'].id;
    const project_id = req.params.project_id;

    try {
        const isManager = await ProjectJoineds.findOne({
            where: {
                project_id,
                participant_id: manager_id,
                isManager: true
            }
        })
        if (!isManager) throw new Error(`User is not manager in project with ID:${project_id}`);

        const requests = await JoinRequests.findAll({
            where:
            {
                project_id
            }
        })


        return res.json({
            success: true,
            requests
        })

    } catch (err) {
        return res.status(err.status || 500).json({
            success: false,
            message: err.message
        });
    }
})

// <user request sent> -------------------------------------------
// http://localhost:3001/requests/sent
router.get("/sent", validateToken, async (req, res) => {
    const user_id = req.user['user'].id

    try {
        const requests = await JoinRequests.findAll({ where: { user_id } })
        if (!requests) throw new Error("Get sent requests false !")

        return res.json({
            success: true,
            requests
        })

    } catch (err) {
        return res.status(err.status || 500).json({
            success: false,
            message: err.message
        });
    }
})

// Create a request =========================================
router.post("/create", validateToken, async (req, res) => {
    const { code } = req.body;
    const user_id = req.user['user'].id

    try {
        const project_id = await Projects.findOne({
            where: {
                code
            }
        }).then((project) => project ? project.id : null)
        if (!project_id) throw new Error(`Project code:${code} not found !`);
        const isJoined = await ProjectJoineds.findOne({
            where: {
                project_id, participant_id: user_id
            }
        })
        if (isJoined) throw new Error("User has already joined this project!")

        // request existed ?
        const isExist = await JoinRequests.findOne({
            where: {
                project_id, user_id
            }
        })
        if (isExist) {
            // delete old request
            const delete_old_Request = await JoinRequests.destroy({
                where: {
                    project_id, user_id
                }
            })
            if (!delete_old_Request) throw new Error("Delete old request false !")
        }


        const request = await JoinRequests.create({
            project_id, user_id
        })
        if (!request) throw new Error("Create request false !")
        return res.json({ success: true, message: "Request create success !" })

    } catch (err) {
        return res.status(err.status || 500).json({
            success: false,
            message: err.message
        });
    }
})

// Update request ==============================================
// <manager only> ---------------------------------------------
// http://localhost:3001/requests/request_id   : {state}
router.put('/:id', validateToken, async (req, res) => {
    const request_id = req.params.id;
    const manager_id = req.user['user'].id
    const { state } = req.body

    try {
        const request = await JoinRequests.findByPk(request_id);
        if (!request) throw new Error(`Request id: ${request_id} not found !`)
        if (request.state != "Pending") throw new Error("This request has already Accepted or Rejected!")
        const project_id = request.project_id;

        const isManager = await ProjectJoineds.findOne({ where: { project_id, participant_id: manager_id, isManager: true } })
        if (!isManager) throw new Error(`User is not manager of project id:${project_id}`);

        await JoinRequests.update({ state }, { where: { id: request_id } })

        return res.json({ success: true, message: `${state} request id:${request_id} successful !` })
    } catch (err) {
        return res.status(err.status || 500).json({
            success: false,
            message: err.message
        });
    }
})

module.exports = router