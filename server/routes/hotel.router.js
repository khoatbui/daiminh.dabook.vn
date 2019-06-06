/*=======GET TRAVEL STYLE LIST======
+ Duong dan hinh anh
+ Link
+ Title
+ Noi dung
==================================*/
var express = require('express')
var router = express.Router()
var db = require('../db')
var bodyParser = require('body-parser')

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/',(req,res,next) => {
    res.send(db.get('hotel').value());
})
router.get('/combobox/hotel/:index',(req,res,next) => {
    res.send(db.get('hotel').filter({ supplierId: req.params.index }).value());
})
router.get('/combobox/package/:index',(req,res,next) => {
    res.send(db.get('package').filter({ supplierId: req.params.index }).value());
})
router.get('/combobox/roomtype/:index',(req,res,next) => {
    res.send(db.get('roomType').filter({ supplierId: req.params.index }).value());
})
router.get('/combobox/addition-service/:index',(req,res,next) => {
    res.send(db.get('optionService').filter({ supplierId: req.params.index }).value());
})
router.delete('/:index', function (req, res) {
    db.get('hotel').value().splice(req.params.index, 1)
})

router.post('/insert', jsonParser, function (req, res) {
    db.get('hotel')
        .push(req.body)
        .write()
    res.send('CREATE COMPLETED')
})

router.post('/update', jsonParser, function (req, res) {
    db.get('hotel')
        .filter({ hotelId: req.body.hotelId })
        .assign(req.body)
        .write()
    res.send('UPDATE COMPLETED')
})

router.post('/price-searching', jsonParser, function (req, res) {
    db.get('hotel')
        .filter({ hotelId: req.body.hotelId })
        .assign(req.body)
        .write()
    res.send('UPDATE COMPLETED')
})
module.exports = router