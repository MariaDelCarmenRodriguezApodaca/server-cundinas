'use strict'
const express = require('express');
const router = express.Router();
const md_auth = require('../middlewares/authenticated');
const bankaccountCtrl = require('../controllers/bakaccount');

router.post('/add', md_auth.ensureAuth, bankaccountCtrl.addBankaccount);

module.exports = router;