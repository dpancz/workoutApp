const express = require('express');
const workoutAddController = require('../controllers/workoutAddController');

const router = express.Router();

router.get('/:id', workoutAddController.show_add);

router.post('/save', workoutAddController.send_workout);

module.exports = router;