var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/user');

var passport = require('passport');

var router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
})

router.post('/signup', function (req, res, next) {
    User.register(new User({username: req.body.username}),
        req.body.password,
        function (err, user) {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({err: err});
            } else {
                passport.authenticate('local')(req, res, function () {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({
                        success: true,
                        status: 'Registration Successful!',
                        user: user
                    });
                });
            }
        });
});


router.post('/login', passport.authenticate('local'), function (req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({
        success: true,
        status: 'You are successfully logged in!'
    });
});

    router.get('/logout', function (req, res, next) {
        if (req.session) {
            req.session.destroy();
            res.clearCookie('session_id');
            res.redirect('/');
        } else {
            var err = new Error('You are not logged in!');
            err.status = 403;
            return next(err);
        }
    });

    module.exports = router;
