const express = require('express');
const goalsControllers = require('../controllers/goalsControllers');

const router = express.Router();

router.get('/:id', goalsControllers.goals_show);

router.post('/add', goalsControllers.goals_add);

router.post('/save', goalsControllers.goals_save);

module.exports = router;