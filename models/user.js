'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    id_openpay: { type: String, required: [true, 'Este campo indica el id que relaciona a este cliente co el de openPay'] },
    name: { type: String, required: [true, 'El campo name del usuario es obligatorio'] },
    last_name: { type: String, required: [true, 'El campo id_openpay del usuario es obligatorio'] },
    email: { type: String, required: [true, 'El campo telefono del usuario es obligatorio'] },
    phone_number: String,
    address: { type: String, required: [true, 'El campo email del usuario es obligatorio'] },
    password: { type: String, required: [true, 'El campo password del usuario es obligatorio'] },
    role: { type: String, require: true }
});

module.exports = mongoose.model('User', userSchema);