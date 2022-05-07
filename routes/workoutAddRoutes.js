const express = require('express');
const workoutAddController = require('../controllers/workoutAddController');

const router = express.Router();

router.get('/:id', workoutAddController.show_add);

router.get('/:id/:date', workoutAddController.show_add_date);

router.post('/save', workoutAddController.send_workout);

module.exports = router;