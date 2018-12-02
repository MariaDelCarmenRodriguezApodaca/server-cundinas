'use strict'
const express = require('express');
const router = express.Router();
const cardCtrl = require('../controllers/card');
const md_auth = require('../middlewares/authenticated');

router.post('/add', md_auth.ensureAuth, cardCtrl.addCard);
router.delete('/delete/:id', md_auth.ensureAuth, cardCtrl.deleteCard);
router.get('/getTodas/:id', md_auth.ensureAuth, cardCtrl.getCardsForUser);

module.exports = router;