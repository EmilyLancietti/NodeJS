const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Promotions = require('../models/promotions');

const promotionRouter = express.Router();

promotionRouter.use(bodyParser.json());

promotionRouter.route('/')
    .get(function (req, res, next) {
        Promotions.find({})
            .then(function (promotions) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotions);
            }, function (err) {
                next(err);
            })
            .catch(function (err) {
                next(err);
            })
    })
    .post(function (req, res, next) {
        Promotions.create(req.body)
            .then(function (promotion) {
                console.log('Promotion created', promotion);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            }, function (err) {
                next(err);
            })
            .catch(function (err) {
                next(err);
            })
    })
    .put(function (req, res, next) {
        res.statusCode = 403;
        res.end('PUT operation not supported on /promotions');
    })

    .delete(function (req, res, next) {
        Promotions.remove({})
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

promotionRouter.route('/:promotionId')
    .get(function (req, res, next) {
        Promotions.findById(req.params.promotionId)
            .then(function (promotion) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promotion);
            }, function (err) {
                next(err);
            })
            .catch(function (err) {
                next(err);
            });
    })
    .post(function (req, res, next) {
        res.statusCode = 403;
        res.end('POST operation not supported on /promotions/' + req.params.promotionId);
    })
    .put(function (req, res, next) {
       Promotions.findByIdAndUpdate(req.params.promotionId, {$set: req.body}, {new: true})
           .then(function (promotion) {
               res.statusCode = 200;
               res.setHeader('Content-Type', 'application/json');
               res.json(promotion);
           }, function (err) {
               next(err);
           })
           .catch(function (err) {
               next(err);
           });
    })
    .delete(function (req, res, next) {
        Promotions.findByIdAndRemove(req.params.promotionId)
            .then(function (resp) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, function (err) {
                next(err);
            })
            .catch(function (err) {
                next(err);
            });
    });

module.exports = promotionRouter;