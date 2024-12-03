const express = require('express')
const router = express.Router()
const { Users, Projects, Tasks, ProjectJoineds, AssignedTos } = require('../models')
const { validateToken } = require('../middleware/auth')
const { where } = require('sequelize')


// Task belongsTo Project  ======================================================== author: Hai
// get all tasks of 1 project <participants only: all member> -------------------------
// GET: http://localhost:3001/tasks/
/*
{
    project_id: 
}
*/
router.get('/', validateToken, async (req, res) => {
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
        const tasks = await Tasks.findAll({
            where: {
                project_id
            }
        });

        if (!tasks) {
            const err = new Error(`Server: This project<id:${project_id}> has 0 task !`);
            err.status = 400;
            throw err;
        }

        return res.json({ success: true, message: "Response all tasks in this projects ", tasks })

    } catch (err) {
        return res.status(err.status || 500).json({
            success: false,
            message: err.message
        });
    }
})



// create new task <manager only>-------------------------------------------
// POST: http://localhost:3001/tasks/create-task
router.post('/create-task', validateToken, async (req, res) => {
    const { project_id, name, description, status, priority, type, start_date, end_date } = req.body
    // manager -
    const manager_id = req.user['user'].id;

    try {
        // check isManger ------------------------------
        const Joined_record = await ProjectJoineds.findOne({
            where: {
                project_id: project_id,
                participant_id: manager_id,
                isManager: true
            }
        })
        if (!Joined_record) {
            const err = new Error(`Server: Logined user does not as MANAGER in project with ID: ${project_id}, maybe project with this id isnot exist`);
            err.status = 400;
            throw err;
        }
        //----------------------------------------------

        const newTask = await Tasks.create({
            project_id, name, description, status, priority, type, start_date, end_date
        })
        if (!newTask) {
            const err = new Error(`Server: Cannot create a newTask !`);
            err.status = 400;
            throw err;
        }

        return res.json({ success: true, message: `Server: Created new task in project<id:${project_id} >`, id: newTask.id })
    } catch (err) {
        return res.status(err.status || 500).json({
            success: false,
            message: err.message
        });
    }
})


// delete task   <manager only> ------------------------------------------------
// DELETE: http://localhost:3001/tasks/delete-task
/*
{
    task_id: ,
    project_id: 
}
*/
router.delete('/delete-task', validateToken, async (req, res) => {
    const manager_id = req.user['user'].id;
    const { task_id, project_id } = req.body

    try {
        // check isManger -----------------------------
        const Joined_record = await ProjectJoineds.findOne({
            where: {
                project_id: project_id,
                participant_id: manager_id,
                isManager: true
            }
        })
        if (!Joined_record) {
            const err = new Error(`Server: Logined user does not as MANAGER in project with ID: ${project_id}`);
            err.status = 400;
            throw err;
        }
        //----------------------------------------------
        await Tasks.destroy({
            where: {
                id: task_id
            }
        })

        return res.json({ success: true, message: `Task ID:${task_id} deleted !` });
    } catch (err) {
        return res.status(err.status || 500).json({
            success: false,
            message: err.message
        });
    }

})


// assign task  <manager only>-------------------------------------------------
// POST: http://localhost:3001/tasks/assign-task
/*
{
    task_id: ,
    user_id: 
}
*/
router.post('/assign-task', validateToken, async (req, res) => {
    const { task_id, user_id } = req.body
    const manager_id = req.user['user'].id;

    try {
        const task = await Tasks.findByPk(task_id)
        if (!task) {
            const err = new Error(`Server: Task with id:${task_id}is not exist !`);
            err.status = 400;
            throw err;
        }
        const project_id = task["project_id"]
        // check isManger -----------------------------
        const manager_Joined = await ProjectJoineds.findOne({
            where: {
                project_id: project_id,
                participant_id: manager_id,
                isManager: true
            }
        })
        if (!manager_Joined) {
            const err = new Error(`Server: Logined user does not as MANAGER in project with ID: ${project_id}, maybe project with this id isnot exist`);
            err.status = 400;
            throw err;
        }
        //----------------------------------------------

        // check isJoiner ------------------------------
        const joiner_Joined = await ProjectJoineds.findOne({
            where: {
                project_id: project_id,
                participant_id: user_id,
                isManager: false
            }
        })
        if (!joiner_Joined) {
            const err = new Error(`User<id:${user_id}> is not in this project<id:${project_id}> as a member <not manager>`);
            err.status = 400;
            throw err;
        }
        // ---------------------------------------------

        // check isExist -------------------------------
        const isExistTask = await AssignedTos.findOne({
            where: {
                task_id, user_id
            }
        })
        if (isExistTask) {
            const err = new Error(`Server: This assign task  already exists !`);
            err.status = 400;
            throw err;
        }
        // ----------------------------------------------

        const newAssign = await AssignedTos.create({ task_id, user_id })
        if (!newAssign) {
            const err = new Error(`Server: Assign task id:${task_id} false !`);
            err.status = 400;
            throw err;
        }

        return res.json({ success: true, message: `Assigned task<id:${task_id} to member<id:${user_id}>`, assignId: newAssign.id })

    } catch (err) {
        return res.status(err.status || 500).json({
            success: false,
            message: err.message
        });
    }

})


// update task  -------------------------------
// PUT: 
router.put('/update', validateToken, async function (req, res) {
    const taskData_update = req.body
    const { project_id, task_id } = req.query;
    const manager_id = req.user['user'].id;
    try {
        // check isManger -----------------------------
        const manager_Joined = await ProjectJoineds.findOne({
            where: {
                project_id: project_id,
                participant_id: manager_id,
                isManager: true
            }
        })
        if (!manager_Joined) {
            const err = new Error(`Server: Logined user does not as MANAGER in project with ID: ${project_id}`);
            err.status = 400;
            throw err;
        }
        //----------------------------------------------

        const task = Tasks.findByPk(task_id)
        await Tasks.update({
            name: taskData_update.name != null ? taskData_update.name : task.name,
            description: taskData_update.description !== null ? taskData_update.description : task.description,
            priority: taskData_update.priority !== null ? taskData_update.priority : task.priority,
            type: taskData_update.type !== null ? taskData_update.type : task.type,
            start_date: taskData_update.start_date !== null ? taskData_update.start_date : task.start_date,
            end_date: taskData_update.end_date !== null ? taskData_update.end_date : task.start_date
        }, { where: { id: task_id } });

        return res.json({ success: true, message: `Updated task<id:${task_id} ` })
    } catch (err) {
        return res.status(err.status || 500).json({
            success: false,
            message: err.message
        });
    }
})

module.exports = router