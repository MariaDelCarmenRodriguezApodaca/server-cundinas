'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let pagoSchema = new Schema({
    cundina: { type: Schema.ObjectId, ref: 'Cundina' },
    user: { type: Schema.ObjectId, ref: 'User' },
    cantidad: String,
    fecha: String,
    type: String,
    status: String,
});

module.exports = mongoose.model('Pago', pagoSchema);