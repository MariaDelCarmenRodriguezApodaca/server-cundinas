'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let cardSchema = new Schema({
    user: { type: Schema.ObjectId, ref: 'User', required: true },
    user_openpay: { type: String, required: true },
    id_openpay: { type: String, required: [true, 'El id de openpay identifica a la tarjeta en openpay'] },
    card_number: { type: String, required: true },
    holder_name: { type: String, required: true },
    expiration_year: { type: String, required: true },
    expiration_month: { type: String, required: true },
    cvv2: { type: String, required: true }
});

module.exports = mongoose.model('Card', cardSchema);