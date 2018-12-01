'use strict'
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/add', userCtrl.addUser);
router.put('/update/:id', userCtrl.updateUser);
router.post('/login', userCtrl.login)
router.delete('/delete/:id', userCtrl.deleteUser);

module.exports = router