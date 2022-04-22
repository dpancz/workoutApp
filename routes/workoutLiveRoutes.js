const express = require('express');
const workoutLiveController = require('../controllers/workoutLiveController');

const router = express.Router();

router.get('/:id', workoutLiveController.start_workout);

router.post('/done', workoutLiveController.workout_done);

router.post('/save', workoutLiveController.workout_save);

module.exports = router;