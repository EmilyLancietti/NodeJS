const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Leaders = require('../models/leaders');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
    .get(function (req, res, next) {
        Leaders.find({})
            .then(function (leaders) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leaders);
            }, function (err) {
                next(err);
            })
            .catch(function (err) {
                next(err);
            })
    })
    .post(function (req, res, next) {
        Leaders.create(req.body)
            .then(function (leader) {
                console.log('Leader created', leader);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, function (err) {
                next(err);
            })
            .catch(function (err) {
                next(err);
            })
    })
    .put(function (req, res, next) {
        res.statusCode = 403;
        res.end('PUT operation not supported on /leaders');
    })
    .delete(function (req, res, next) {
       Leaders.remove({})
           .then(function (resp) {
               res.statusCode = 200;
               res.setHeader('Content-Type', 'application/json');
               res.json(resp);
           }, function (err) {
               next(err);
           })
           .catch(function (err) {
               next(err);
           })
    });

leaderRouter.route('/:leaderId')
    .get(function (req, res, next) {
        Leaders.findById(req.params.leaderId)
            .then(function (leader) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, function (err) {
                next(err);
            })
            .catch(function (err) {
                next(err);
            })
    })
    .post(function (req, res, next) {
        res.statusCode = 403;
        res.end('POST operation not supported on /leaders/' + req.params.leaderId);
    })
    .put(function (req, res, next) {
        Leaders.findByIdAndUpdate(req.params.leaderId, {$set: req.body}, {new: true})
            .then(function (leader) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, function (err) {
                next(err);
            })
            .catch(function (err) {
                next(err);
            })
    })
    .delete(function (req, res, next) {
       Leaders.findByIdAndRemove(req.params.leaderId)
           .then(function (resp) {
               res.statusCode = 200;
               res.setHeader('Content-Type', 'application/json');
               res.json(resp);
           }, function (err) {
               next(err);
           })
           .catch(function (err) {
               next(err);
           })
    });


module.exports = leaderRouter;