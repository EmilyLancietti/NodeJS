const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
    .all(function (req, res, next) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get(function (req, res, next) {
        res.end('Will send all the dishes to you!');
    })

    .post(function (req, res, next) {
        res.end('Will add the dish: ' + req.body.name +
            ' with details: ' + req.body.description);
    })
    .put(function (req, res, next) {
        res.statusCode = 403;
        res.end('PUT operation not supported on /dishes');
    })

    .delete(function (req, res, next) {
        res.end('Deleting all the dishes!');
    });

dishRouter.route('/:dishId')
    .get(function (req, res, next) {
        res.end('Will send details of the dish: ' + req.params.dishId + ' to you!');
    })
    .post(function (req, res, next) {
        res.statusCode = 403;
        res.end('POST operation not supported on /dishes/' + req.params.dishId);
    })
    .put(function (req, res, next) {
        res.statusCode = 403;
        res.write('Updating the dish ' + req.params.dishId + '\n');
        res.end('Will update the dish: ' + req.body.name +
            ' with details: ' + req.body.description);
    })
    .delete(function (req, res, next) {
        res.end('Deleting dish: ' + req.params.dishId);
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