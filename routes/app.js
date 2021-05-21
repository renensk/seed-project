var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/message', function (req, res, next) {
    res.render('node', { message: 'Olá nova rota de mensagem.' });
});

router.post('/message', function (req, res, next) {
    var messageVar = req.body.messageBody;
    res.redirect('/message/' + messageVar);
});

// " : " indica que esta parte da URL é alguma variável com dado
router.get('/message/:msgParam', function (req, res, next) {
    res.render('node', { message: req.params.msgParam });
});
module.exports = router;


var User = require('../models/user');
router.get('/node-mongodb-mongoose-user', function (req, res, next) {
    res.render('node');
});

router.post('/node-mongodb-mongoose-user', function (req, res, next) {
    var emailVar = req.body.emailBody;
    var userObject = new User({
        firstName: 'Cassiano',
        lastName: 'Silva',
        password: 'Segredo',
        email: emailVar
    });
    userObject.save();

    res.redirect('/node-mongodb-mongoose-user');
});

router.get('/node-mongodb-mongoose-user-busca', function (req, res, next) {
    User.findOne({}, function (err, documents) {
        if (err) {
            return res.send('Error!! :-(');
        }
        res.render('node', {
            firstNameV: documents.firstName,
            lastNameV: documents.lastName,
            passwordV: documents.password,
            emailV: documents.email,
            messagesV: documents.message
        });
    });
});