'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');
const secret = config.secret_jwt;

exports.ensureAuth = (req, res, next) => {
    if (req.headers.authorization) {
        let token = req.headers.authorization.replace('\"', '');
        try {
            var payload = jwt.decode(token, secret); //decodificamos el header que recivimos pasandolo junto con el secret
            if (payload.exp <= moment().unix()) return res.status(403).send({ message: `El token ha expirado` });
        } catch (error) {
            console.log(token);
            return res.status(500).send({ message: `El token no es valido ${error}` });
        }
        req.user = payload; //le añadimos el atributo user a la peticion
        next();
    } else return res.status(403).send({ message: `Tu no tienes permiso de estar aqui` });
}

exports.isAdmin = (req, res, next) => {
    if (req.user.role != 'Admin') {
        next();
    } else res.status(403).send({ message: `No cuentas con los permisos para estar aqui!` })
}