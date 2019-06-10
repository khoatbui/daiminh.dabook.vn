/*=======GET TRAVEL STYLE LIST======
+ Duong dan hinh anh
+ Link
+ Title
+ Noi dung
==================================*/
var express = require('express')
var bodyParser = require('body-parser')
var controller=require('../controllers/hotel.controller')

var router = express.Router()
// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/',controller.index)

router.get('/combobox/hotel/:index',controller.getHotelBySupplier)

router.get('/combobox/hotelbysuppliercode/:index',controller.getHotelBySupplierCode)

router.get('/combobox/roomtype/:index',controller.getRoomTypeBySupplier)

router.get('/combobox/addition-service/:index',controller.getAdditionServiceBySupplier)

router.delete('/:_id',controller.deleteHotel)

router.post('/insert', jsonParser,controller.insertHotel)

router.post('/update/:_id', jsonParser, controller.updateHotel)

router.post('/price-searching', jsonParser, controller.priceSearch)

module.exports = router