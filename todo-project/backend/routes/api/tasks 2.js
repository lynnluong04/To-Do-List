const express = require('express');
const asyncHandler = require('express-async-handler');
const { Task } = require('../../db/models');

const router = express.Router();

router.get(
    '/lists/:listId',
    asyncHandler(async (req, res) => {
        const tasks = await Task.findAll({
            where: { listId: req.params.listId }
        });
        return res.json(tasks);
    })
);

router.post(
    '/lists/:listId',
    asyncHandler(async (req, res) => {
        const task = await Task.create(req.body);
        return res.json(task);
    })
);

router.put(
    '/:taskId',
    asyncHandler(async(req, res) => {
        const {id, description, completionStatus} = req.body;
        const task = await Task.findByPk(id);
        task.description = description;
        task.completionStatus = completionStatus;
        await task.save();
        return res.json(task);
    })
)

router.delete(
    '/:taskId',
    asyncHandler(async (req, res) => {
        const task = await Task.findByPk(req.params.taskId);
        let id = task.id;
        await task.destroy();
        return res.json(id);
    })
);

module.exports = router;
