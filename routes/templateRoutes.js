const express = require('express');
const templateControllers = require('../controllers/templateControllers');

const router = express.Router();

//SHOW

router.get('/:id', templateControllers.template_show);

//ADD

router.get('/add/:id', templateControllers.template_add_show);

//SAVE

router.post('/save', templateControllers.template_add_save);

//DELETE

router.post('/delete', templateControllers.template_delete);

module.exports = router;