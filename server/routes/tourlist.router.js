var express = require('express')
var router = express.Router()
var db = require('../db')
var bodyParser = require('body-parser')

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// View all
router.get('/', (req, res, next) => {
    res.send(db.get('tourList').value());
})

// Xoa ban ghi
router.delete('/:index', function (req, res) {
    db.get('tourList').value().splice(req.params.index, 1)
    console.log(req.params.index);
})

// Them moi ban ghi
router.post('/insert', jsonParser, function (req, res) {
    db.get('tourList')
        .push(req.body)
        .write()
    res.send('CREATE COMPLETED')
})

// Update ban ghi
router.post('/update', jsonParser, function (req, res) {
    db.get('tourList')
        .filter({ tourId: req.body.tourId })
        .filter( v=> v.lang=== req.body.lang || v.lang=== "")
        .assign(req.body)
        .write()
    res.send('CREATE COMPLETED')
})

// Tim kiem ban ghi theo destination
router.get('/destination-search/:id', (req, res, next) => {
    var id = req.params.id;
    var tours = db.get('tourList').filter({ destinationId: id });
    res.send(tours);
})


// Tim kiem ban ghi theo travel style
router.get('/travelstyle-search/:id', (req, res, next) => {
    var id = req.params.id;
    var tours = db.get('tourList').filter({ travelStyleId: id});
    res.send(tours);
})

// Tim kiem ban ghi theo city
router.get('/city-search/:id', (req, res, next) => {
    var id = req.params.id;
    var tours = db.get('tourList').filter({ cityId: id});
    res.send(tours);
})
module.exports = router