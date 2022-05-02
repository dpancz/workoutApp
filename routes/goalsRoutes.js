const express = require('express');
const goalsControllers = require('../controllers/goalsControllers');

const router = express.Router();

router.get('/:id', goalsControllers.goals_show);

router.post('/add', goalsControllers.goals_add);

router.post('/save', goalsControllers.goals_save);

//ONE GOAL

router.get('/one/:goalID', goalsControllers.oneGoal_show);

router.post('/delete', goalsControllers.oneGoal_delete);

router.post('/done', goalsControllers.oneGoal_done);

module.exports = router;