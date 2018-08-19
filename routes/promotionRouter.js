const express = require('express');
const bodyParser = require('body-parser');

const promotionRouter = express.Router();

promotionRouter.use(bodyParser.json());

promotionRouter.route('/')
    .all(function (req, res, next) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get(function (req, res, next) {
        res.end('Will send all the promotions to you!');
    })

    .post(function (req, res, next) {
        res.end('Will add the promotion: ' + req.body.name +
            ' with details: ' + req.body.description);
    })
    .put(function (req, res, next) {
        res.statusCode = 403;
        res.end('PUT operation not supported on /promotions');
    })

    .delete(function (req, res, next) {
        res.end('Deleting all the promotions!');
    });

promotionRouter.route('/:promotionId')
    .get(function (req, res, next) {
        res.end('Will send details of the promotion: ' + req.params.promotionId + ' to you!');
    })
    .post(function (req, res, next) {
        res.statusCode = 403;
        res.end('POST operation not supported on /promotions/' + req.params.promotionId);
    })
    .put(function (req, res, next) {
        res.statusCode = 403;
        res.write('Updating the promotion ' + req.params.promotionId + '\n');
        res.end('Will update the promotion: ' + req.body.name +
            ' with details: ' + req.body.description);
    })
    .delete(function (req, res, next) {
        res.end('Deleting promotion: ' + req.params.promotionId);
    });


module.exports = promotionRouter;