'use strict'
var app = require('./app');
const mongoose = require('mongoose'); 
const config = require('./config');

mongoose.connect(config.bdClever,{useNewUrlParser:true},(err)=>{
    if(err) throw err;
    console.log('Conectado a la base de datos');
    app.listen( config.port,()=>{
        console.log('El servidor corre en el puesto 3000');
    });
});
