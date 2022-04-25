const express = require('express');
const shareControllers = require('../controllers/shareControllers');

const router = express.Router();

router.get('/:workoutID', shareControllers.share_show);

module.exports = router;