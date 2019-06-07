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
    res.send(db.get('packageHotelREL').value());
})

router.delete('/:index', function (req, res) {
    db.get('packageHotelREL').value().splice(req.params.index, 1)
})

router.post('/insert', jsonParser, function (req, res) {
    db.get('packageHotelREL')
        .push(req.body)
        .write()
    res.send('CREATE COMPLETED')
})

router.post('/update', jsonParser, function (req, res) {
    db.get('packageHotelREL')
        .filter({ areaId: req.body.areaId })
        .filter({ lang: req.body.lang })
        .assign(req.body)
        .write()
    res.send('UPDATE COMPLETED')
})

router.get('/combobox/package-by-hotel-roomtype/hotel/:hotelId/roomType/:roomTypeId',(req,res,next) => {
    res.send(db.get('packageHotelREL')
    .filter({ hotelId: req.params.hotelId })
    .filter({ roomTypeId: req.params.roomTypeId }).value());
})
router.get('/price/hotel/:hotelId/roomType/:roomTypeId/package/:packageId',(req,res,next) => {
    console.log(req.params);
    res.send(db.get('packageHotelREL')
    .filter({ hotelId: req.params.hotelId })
    .filter({ roomTypeId: req.params.roomTypeId })
    .filter({ packageId: req.params.packageId }).value());
})
router.post('/price', jsonParser,(req,res,next) => {
    console.log(req.body);
    res.send(db.get('packageHotelREL')
    .filter({ hotelId: req.body.hotelId })
    .filter({ roomTypeId: req.body.roomTypeId })
    .filter({ packageId: req.body.packageId }).value());
})
module.exports = router