const express = require('express');
const calendarController = require('../controllers/calendarController');

const router = express.Router();

router.get('/:id', calendarController.calendar_show);

module.exports = router;