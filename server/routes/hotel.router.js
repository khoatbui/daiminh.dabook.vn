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

router.get('/combobox/promotehotelbysuppliercode/:index',controller.getPromoteHotelBySupplierCode)

router.delete('/:_id',controller.deleteHotel)

router.post('/insert', jsonParser,controller.insertHotel)

router.post('/update/:_id', jsonParser, controller.updateHotel)

// MOBILE

router.get('/m/getlisthotelpromotion',controller.getmListHotelWithPromotion)

router.get('/m/getlisthotel',controller.getmListHotel)

router.get('/m/getlisthotelpromotebysuppliercode/:_id',controller.getmListHotelPromotionBySupplier)

router.post('/m/posthotelbysearch', jsonParser,controller.getmHotelBySearch)
router.post('/m/postpromotionhotelbysearch', jsonParser,controller.getmPromotionHotelBySearch)

module.exports = router