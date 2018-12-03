'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let cundinaSchema = new Schema({
    user: { type: Schema.ObjectId, ref: 'User', required: [true, 'El campo user de la cundina es obligatorio'] },
    title: { type: String, required: [true, 'El campo name de la cundina es obligatorio'] },
    tipo: { type: String, required: [true, 'El tipo puede ser Mensual, Quicena, Semanal'] },
    time: { type: String, required: [true, 'El campo tiempo de la cundina es obligatorio: son el numero de pagos que habra'] },
    cantidad: { type: String, required: true },
    creation: { type: String, required: [true, 'Fecha de cracion de cundina es obligatorio'] },
    start: { type: String },
    end: { type: String },
    integrantes: { type: String, required: [true, 'El campo integrantes indica el numero de personas que pueden pertenecer a una cundina y es obligatorio'] },
    pago_individual: { type: String, required: [true, 'El campo pago indivicual indica de cuanto sera cada pago'] },
    status: { type: String, required: true }
});

module.exports = mongoose.model('Cundina', cundinaSchema);