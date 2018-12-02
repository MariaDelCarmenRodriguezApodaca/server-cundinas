'use strict'
// const moment = require('moment');
var Openpay = require('openpay'); //class
var openpay = new Openpay('m0402xnzlpxadtw4jpgn', 'sk_8aa66416a2964c51a1372a4159633705'); //intance (id de comerciante, clave privada)
const Card = require('../models/card');


function addCard(req, res) {
    //tienen que mandar los datos de la tarjeta y id del usuario y el id del usuario en openpay
    var idUser = req.user.sub;
    var data = req.body;
    if (!data.card_number ||
        !data.holder_name ||
        !data.expiration_year ||
        !data.expiration_month ||
        !data.cvv2
    ) return res.status(404).send({ message: `No se mandaron todos los campos` });
    var idUserOpenPay = req.user.id_openpay;
    console.log(idUserOpenPay);
    var cardRequest = {
        // 'user_openpay': req.user.id_openpay,
        'card_number': data.card_number,
        'holder_name': data.holder_name,
        'expiration_year': data.expiration_year,
        'expiration_month': data.expiration_month,
        'cvv2': data.cvv2
    };
    openpay.customers.cards.create(idUserOpenPay, cardRequest, function(err, cardSaved) {
        if (err) return res.status(500).send({ message: err, punto: 'si' });
        let card = new Card();
        card.user = idUser;
        card.user_openpay = idUserOpenPay;
        card.id_openpay = cardSaved.id;
        card.card_number = data.card_number;
        card.holder_name = data.holder_name;
        card.expiration_year = data.expiration_year;
        card.expiration_month = data.expiration_month;
        card.cvv2 = data.cvv2;
        card.save((err, cardSaved) => {
            if (err) return res.status(500).send({ message: `Error al guardar la tarjeta ${err}` });
            if (!cardSaved) return res.status(404).send({ message: `Error desconocido al guardar la tarjeta` });
            return res.status(200).send({ card: cardSaved });
        })
    });

}

function getCardsForUser(req, res) {
    let user_openpay = req.params.id; //id del dueño de las tarjetas en openpay
    openpay.customers.cards.list(user_openpay, (err, list) => {
        if (err) return res.status(500).send({ message: err, punto: 'si' });
        Card.find({ user_openpay: user_openpay }, (err, cards) => {
            if (err) return res.status(500).send({ message: `Error al obtener las tarjetas ${err}` });
            if (!cards) return res.status(404).send({ message: `no hay tarjetas guardadas` });
            return res.status(200).send({
                cards: cards,
                cards_openpay: list
            })
        })
    });
}

function deleteCard(req, res) {
    let card = req.body
    let id = req.params.id;
    if (!card.id_openpay ||
        !card.user_openpay
    ) return res.status(404).send({ message: `No se mandaron todos los campos` })

    openpay.customers.cards.delete(card.user_openpay, card.id_openpay, function(err) {
        if (err) return res.status(500).send({ message: err, punto: 'si' });
        Card.findByIdAndDelete(id, (err, cardDeleted) => {
            if (err) return res.status(500).send({ message: `Error al eliminar la tarjeta ${err}` });
            if (!cardDeleted) return res.status({ message: `No se encontro tarjeta` })
            return res.status(200).send({ card: 'cardDeleted' });
        })
    });
}

module.exports = {
    addCard,
    getCardsForUser,
    deleteCard
}