'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let cardSchema = new Schema({
    user: { type: Schema.ObjectId, ref: 'User', required: true },
    user_openpay: { type: String, required: true },
    id_openpay: { type: String, required: [true, 'El id de openpay identifica a la tarjeta en openpay'] },
    type: { type: String, required: true },
    brand: { type: String, required: true },
    card_number: { type: String, required: true },
    holder_name: { type: String, required: true },
    expiration_year: { type: String, required: true },
    expiration_month: { type: String, required: true },
    cvv2: { type: String, required: true },
    allow_charges: { type: Boolean, required: false },
    allow_payouts: { type: String, required: false },
    creation_date: { type: String, required: true },
    bank_name: { type: String, required: true },
    bank_code: { type: String, required: false },
    money: { type: Number, required: [true, 'Es el dinero con el que cuenta la tarjera y es obligatorio'] }
});

module.exports = mongoose.model('Card', cardSchema);