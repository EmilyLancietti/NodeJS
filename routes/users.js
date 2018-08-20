var express = require('express');
const bodyParser = require('body-parser');
var Users = require('../models/user');

var router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/signup', function (req, res, next) {
    Users.findOne({username: req.body.username})
        .then(function (user) {
            if (user != null) {
                var err = new Error('User ' + req.body.username + ' already exists!');
                err.status = 403;
                next(err);
            } else {
                return Users.create({
                    username: req.body.username,
                    password: req.body.password
                })
                    .then(function (user) {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({status: 'Registration Successful', user: user});
                    }, function (err) {
                        next(err)
                    })
                    .catch(function (err) {
                        next(err);
                    })
            }
        }, function (err) {
            next(err);
        })
        .catch(function (err) {
            next(err);
        })
});

router.post('/login', function (req, res, next) {
    if (!req.session.user) {
        var authHeader = req.headers.authorization;

        if (!authHeader) {
            var err = new Error('You are not authenticated!');
            res.setHeader('WWW-Authenticate', 'Basic');
            err.status = 401;
            return next(err);
        }

        var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
        var username = auth[0];
        var password = auth[1];

        User.findOne({username: username})
            .then(function (user) {
                if (user.username === username && password === password) {
                    req.session.user = 'authenticated';
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/plain');
                    res.end('You are authenticated');
                } else if (user.password != password){
                    var err = new Error('Your password is incorrect!');
                    err.status = 403;
                    return next(err);
                } else if (user == null) {
                    var err = new Error('User does not exist!');
                    err.status = 403;
                    return next(err);
                }
            }, function (err) {
                next(err);
            })
            .catch(function (err) {
                next(err);
            })
    } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('You are already authenticated');
    }
});

router.get('/logout', function (req, res, next) {
    if (req.session) {
        req.session.destroy();
        res.clearCookie('session-id');
        res.redirect('/');
    } else {
        var err = new Error('You are not logged in!');
        err.status = 403;
        return next(err);
    }
});

module.exports = router;
