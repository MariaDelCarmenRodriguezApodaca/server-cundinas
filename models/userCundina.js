'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userCundinaSchema = new Schema({
    cundina: { type: Schema.ObjectId, ref: 'Cundina', required: true },
    user_admin: { type: Schema.ObjectId, ref: 'User', required: true },
    user: { type: Schema.ObjectId, ref: 'User', required: true },
    status: { type: String, required: true }
})

module.exports = mongoose.model('UserCundina', userCundinaSchema);