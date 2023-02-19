const express = require('express');
const asyncHandler = require('express-async-handler');
const { List } = require('../../db/models');

const router = express.Router();

router.get(
    '/:userId',
    asyncHandler(async (req, res) => {
        const lists = await List.findAll({
            where: { userId: req.params.userId }
        });
        return res.json(lists);
    })
);

router.post(
    '/:userId',
    asyncHandler(async (req, res) => {
        const list = await List.create(req.body);
        return res.json(list)
    })
);

module.exports = router;
