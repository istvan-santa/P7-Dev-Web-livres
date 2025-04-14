const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth');

router.post('/signup', authCtrl.signup);

module.exports = router;

router.post('/login', authCtrl.login);
