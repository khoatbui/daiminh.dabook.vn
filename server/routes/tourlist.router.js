var express = require('express')
var router = express.Router()
var db = require('../db')
var bodyParser = require('body-parser')

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', (req, res, next) => {
    res.send(db.get('tourList').value());
})

router.delete('/:index', function (req, res) {
    db.get('tourList').value().splice(req.params.index, 1)
    console.log(req.params.index);
})

router.get('/des/:id', (req, res, next) => {
    var id = req.params.id;
    var tours = db.get('tourList').find({ destinationId: id });
    res.send(tours);
})

router.get('/tstyle/:id', (req, res, next) => {
    var id = req.params.id;
    var tours = db.get('tourList').find({ travelStyleId: id });
    res.send(tours);
})

router.post('/insert', jsonParser, function (req, res) {
    db.get('tourList')
        .push(req.body)
        .write()
    res.send('CREATE COMPLETED')
})

router.post('/update', jsonParser, function (req, res) {
    db.get('tourList')
        .filter({ tourId: req.body.tourId })
        .find({ lang: req.body.lang })
        .assign(req.body)
        .write()
    res.send('CREATE COMPLETED')
})
module.exports = router