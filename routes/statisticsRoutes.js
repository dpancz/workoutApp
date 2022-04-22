const express = require('express');
const statisticsController = require('../controllers/statisticsController');

const router = express.Router();

router.get('/personalBest/:id', statisticsController.personalBest_show);

router.get('/yourWeight/:id', statisticsController.yourWeight_show);

router.post('/yourWeight', statisticsController.yourWeight_save);

router.get('/workoutStats/:id', statisticsController.stats_show);

module.exports = router;