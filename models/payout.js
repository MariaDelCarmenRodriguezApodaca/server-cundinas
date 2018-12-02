'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let payoutSchema = new Schema({

});

module.exports = mongoose.model('Payout', payoutSchema);