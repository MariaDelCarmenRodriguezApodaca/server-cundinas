'use strict'
var jwt = require('jwt-simple');
var config = require('../config');
const moment = require('moment');
var secret = config.secret_jwt;

exports.create = (user) => {
    let payload = {
        'sub': user['_id'],
        'name': user['name'],
        'last_name': user['last_name'],
        'email': user['email'],
        'phone_number': user['phone_number'],
        'address': user['address'] || null,
        'role': user['role'],
        'url_image': user['url_image'] || null,
        'iat': moment().unix(),
        'exp': moment().add(60, 'days'),
    }
    return jwt.encode(payload, secret);
};