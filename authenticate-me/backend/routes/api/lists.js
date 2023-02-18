const express = require('express');
const asyncHandler = require('express-async-handler');
const { List } = require('../../db/models');

const router = express.Router();

router.get(
    '/:userId',
    asyncHandler(async (req, res) => {
        const lists = await List.findAll({
            where: { userId: req.params.userId }
        })
        return res.json(lists)
    })
)

module.exports = router;
