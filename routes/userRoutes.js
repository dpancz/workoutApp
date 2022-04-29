const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

//LOGIN REGISTER

router.post('/login', userController.user_login);

router.post('/register', userController.user_create);

router.get('/:id', userController.user_logged);

router.get('/register/:id', userController.user_registered);

//DELETE ACCOUNT

router.get('/delete/:id/:deleteStatus', userController.user_deleteShow);

router.post('/delete', userController.user_delete);

//SHOW PROFILE

router.get('/profile/:id', userController.user_profileShow);

router.post('/profile/save', userController.user_profileSave);

router.get('/profile/password/:id/:changeStatus', userController.user_profilePasswordShow);

router.post('/profile/password', userController.user_profilePasswordSave);

//SETTINGS

router.get('/settings/:id', userController.user_settingsShow);

router.post('/settings', userController.user_settingsSave); 

//

module.exports = router;