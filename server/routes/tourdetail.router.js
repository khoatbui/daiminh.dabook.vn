var express = require('express')
var router = express.Router()
var db = require('../db')
var bodyParser = require('body-parser')

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', (req, res, next) => {
    res.send(db.get('tourDetail').value());
})

router.delete('/:index', function (req, res) {
    db.get('tourDetail').value().splice(req.params.index, 1)
})

router.get('/des/:id', (req, res, next) => {
    var id = req.params.id;
    var tours = db.get('tourDetail').find({ destinationId: id });
    res.send(tours);
})

router.get('/tstyle/:id', (req, res, next) => {
    var id = req.params.id;
    var tours = db.get('tourDetail').find({ travelStyleId: id });
    res.send(tours);
})

router.post('/insert', jsonParser, function (req, res) {
    db.get('tourDetail')
        .push(req.body)
        .write()
    res.send('CREATE COMPLETED')
})

router.post('/update', jsonParser, function (req, res) {
    db.get('tourDetail')
        .filter({ tourId: req.body.tourId })
        .filter( v=> v.lang=== req.body.lang || v.lang=== "")
        .assign(req.body)
        .write()
    res.send('CREATE COMPLETED')
})
module.exports = router