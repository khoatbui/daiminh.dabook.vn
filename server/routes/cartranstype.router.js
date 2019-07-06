/*=======GET TRAVEL STYLE LIST======
+ Duong dan hinh anh
+ Link
+ Title
+ Noi dung
==================================*/
var express = require('express')
var bodyParser = require('body-parser')
var controller=require('../controllers/cartranstype.controller')

var router = express.Router()

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/',controller.index)

router.delete('/:_id', controller.deleteCarTransType)

router.post('/insert', jsonParser, controller.insertCarTransType)

router.post('/update/:_id', jsonParser, controller.updateCarTransType)

router.get('/combobox/roomtype/:index',controller.getCarTransTypeByHotel)

router.get('/combobox/roomtypebyhotelcode/:index',controller.getCarTransTypeByHotelCode)
module.exports = router