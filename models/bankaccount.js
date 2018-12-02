'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const backacconutSchema = new Schema({
    user_openpay: { type: String, required: [true, ' El usuario duelo de la cuenta en open pay es obligatorio'] },
    id_openpay: { type: String, required: [true, ' El id con el que se guardo la cuenta en openpay es obligatorio'] },
    clave: { type: String, required: true },
    alias: { type: String, required: true },
    holder_name: { type: String, required: true }
})