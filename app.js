'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
var cors = require('cors');

var app = express();

/**
 * OPENPAY CONFIG
 */
var Openpay = require('openpay'); //class
var openpay = new Openpay('m0402xnzlpxadtw4jpgn', 'sk_8aa66416a2964c51a1372a4159633705'); //intance (id de comerciante, clave privada)


const userRoutes = require('./routes/user');

/**
 * MIDDLEARES
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

//configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('access-control-allow-origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-Whith, Content-Type, Accept, Access-Control-Allow-Request-Method'),
        res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE'),
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
/**
 * ROUTES
 */

app.get('/', (req, res) => {
    res.status(200).send({ message: `Hola` });
})

app.use('/user', userRoutes);

app.post('/charge', (req, res) => {
    console.log(req.body);
    var data = req.body;


    var chargeRequest = {
        'source_id': data.id,
        'method': 'card',
        'amount': 100,
        'currency': 'MXN',
        'description': 'Cargo de prueba',
        'device_session_id': data.deviceSessionId,
        'customer': {
            'name': data.card.holder_name,
            'email': 'sadasd@adsasd.com'
        }
    }
    openpay.charges.create(chargeRequest, function(err, charge) {
        if (err) {
            console.log(err);
            return res.status(500).send({ message: `Error: ${err}` });
        }
        console.log(charge);
        res.status(200).send({ charge });
    });
});


app.post('/tarjeta', (req, res) => {

    var cardRequest = {
        'card_number': '4658285101700791',
        'holder_name': 'Maria del carmen',
        'expiration_year': '22',
        'expiration_month': '11',
        'cvv2': '042'
    };

    openpay.customers.cards.create('a0visto5jvlz1ecadhav', cardRequest, function(err, card) {
        if (err) {
            console.log(err);
            return res.status(500).send({ message: `Error ${err}` });
        }
        console.log(card);
        res.status(200).send({ card });
    });
});


app.post('/pay', (req, res) => {
    let data = res.body;
    var payoutRequest = {
        'method': 'bank_account',
        'destination_id': 'kxx7crvssx2o5tnjs2sy',
        'amount': 10.50,
        'description': 'Retiro de saldo semanal',
        'order_id': 'oid-00021'
    };
    //QWERTYUIOPASDFGHJKLÑZXCVBNM,.-
    openpay.customers.payouts.create('afydgqjwyhxhhgcqjp7s', payoutRequest, function(err, payout) {
        if (err) {
            console.log(err);
            return res.status(500).send({ message: err });
        }
        console.log(payout);
        res.status(200).send({ payout });
    });
})

app.post('/pay2', (req, res) => {
    var payoutRequest = {
        'method': 'card',
        'bank_account': {
            'card_number': '4658285101700791',
            'holder_name': 'Maria Rodriguez'
        },
        'amount': 500,
        'description': 'Pago a tercero'
    };


    openpay.payouts.create(payoutRequest, (err, payout) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ message: err });
        }
        console.log(payout);
        res.status(200).send({ payout });
    })
})

module.exports = app;