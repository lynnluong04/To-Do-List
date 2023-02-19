const express = require('express');
const asyncHandler = require('express-async-handler');
const { List } = require('../../db/models');

const router = express.Router();

router.get(
    '/user/:userId',
    asyncHandler(async (req, res) => {
        const lists = await List.findAll({
            where: { userId: req.params.userId }
        });
        return res.json(lists);
    })
);

router.post(
    '/user/:userId',
    asyncHandler(async (req, res) => {
        const list = await List.create(req.body);
        return res.json(list)
    })
);

router.delete('/:listId',
    asyncHandler(async (req, res) => {
        const list = await List.findByPk(req.params.listId);
        let id = list.id
        await list.destroy()
        return res.json(id)
    })
);

module.exports = router;
