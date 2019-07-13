/*=======GET TRAVEL STYLE LIST======
+ Duong dan hinh anh
+ Link
+ Title
+ Noi dung
==================================*/
var express = require('express')
var bodyParser = require('body-parser')
var controller=require('../controllers/cardetailprice.controller')

var router = express.Router()

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/',controller.index)

router.delete('/:_id', controller.deleteCarDetailPrice)

router.post('/insert', jsonParser, controller.insertCarDetailPrice)

router.post('/update/:_id', jsonParser, controller.updateCarDetailPrice)

router.get('/combobox/roomtype/:index',controller.getCarDetailPriceByHotel)

router.get('/combobox/roomtypebyhotelcode/:index',controller.getCarDetailPriceByHotelCode)


// MOBILE
router.get('/m/getallpromotioncarprice',controller.getmAllPromotionCarDetailPrice)

router.get('/m/getallcarprice',controller.getmAllCarDetailPrice)

router.get('/m/getallcarpricebysupplier/:_id',controller.getmAllCarDetailPriceBySupplier)

router.get('/m/getallcarpricebycartranstype/:_id',controller.getmAllCarDetailPriceByCarTransType)

router.get('/m/getallcarpricebycartype/:_id',controller.getmAllCarDetailPriceByCarType)
module.exports = router