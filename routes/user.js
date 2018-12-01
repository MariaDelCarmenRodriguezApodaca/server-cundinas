'use strict'
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/add', userCtrl.addUser);
router.post('/update/:id', userCtrl.updateUser);
router.post('/login', userCtrl.login)

module.exports = router