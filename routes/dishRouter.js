const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Dishes = require('../models/dishes');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
    .get(function (req, res, next) {
        Dishes.find({})
            .then(function (dishes) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dishes);
            }, function (err) {
                next(err);
            })
            .catch(function (err) {
                next(err);
            })
    })
    .post(function (req, res, next) {
        Dishes.create(req.body)
            .then(function (dish) {
                console.log('Dish created', dish);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, function (err) {
                next(err);
            })
            .catch(function (err) {
                next(err);
            })
    })
    .put(function (req, res, next) {
        res.statusCode = 403;
        res.end('PUT operation not supported on /dishes');
    })

    .delete(function (req, res, next) {
        Dishes.remove({})
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

dishRouter.route('/:dishId')
    .get(function (req, res, next) {
        Dishes.findById(req.params.dishId)
            .then(function (dish) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, function (err) {
                next(err);
            })
            .catch(function (err) {
                next(err);
            })
    })
    .post(function (req, res, next) {
        res.statusCode = 403;
        res.end('POST operation not supported on /dishes/' + req.params.dishId);
    })
    .put(function (req, res, next) {
        Dishes.findByIdAndUpdate(req.params.dishId, {
            $set: req.body
        }, {new: true})
            .then(function (dish) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, function (err) {
                next(err);
            })
            .catch(function (err) {
                next(err);
            })
    })
    .delete(function (req, res, next) {
        Dishes.findByIdAndRemove(req.params.dishId)
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


module.exports = dishRouter;
/*
app.get('/dishes/:dishId', function (req, res, next) {
    res.end('Will send details of the dish: ' + req.params.dishId + ' to you!');
});

app.post('/dishes/:dishId', function (req, res, next) {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/' + req.params.dishId);
});

app.put('/dishes/:dishId', function (req, res, next) {
    res.statusCode = 403;
    res.write('Updating the dish ' + req.params.dishId + '\n');
    res.end('Will update the dish: ' + req.body.name +
        ' with details: ' + req.body.description);
});

app.delete('/dishes/:dishId', function (req, res, next) {
    res.end('Deleting dish: ' + req.params.dishId);
});
*/