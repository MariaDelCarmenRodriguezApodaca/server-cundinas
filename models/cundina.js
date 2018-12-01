'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let cundinaSchema = new Schema({
    id_admin:{type:Schema.ObjectId, ref:'user', required:[true,'El campo id_admin de la cundina es obligatorio']},
    name:{type:String, required:[true,'El campo name de la cundina es obligatorio']},
    tiempo:{type:Number, required:[true,'El campo tiempo de la cundina es obligatorio: son el numero de pagos que habra']},
    cantidad:{type:Number, required:true},
    fecha_inicio:{type:String, required:[true,'El campo fecha_inicio de la cundina es obligatorio']},
    fecha_fin:{type:String, required:[true,'El campo fecha_fin de la cundina es obligatorio']},
    numero_clientes:{type:Number, required:[true,'El campo numero_clientes de la cundina es obligatorio']},
});

module.exports = mongoose.model('user',cundinaSchema);