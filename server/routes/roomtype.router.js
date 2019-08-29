/*=======GET TRAVEL STYLE LIST======
+ Duong dan hinh anh
+ Link
+ Title
+ Noi dung
==================================*/
var express = require('express')
var bodyParser = require('body-parser')
var controller=require('../controllers/roomtype.controller')

var router = express.Router()

// create application/json parser
var jsonParser = bodyParser.json({limit: '50mb', extended: true})

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({limit: '50mb', extended: true})


router.get('/',controller.index)

router.get('/getused',controller.getUsed)

router.delete('/:_id', controller.deleteRoomType)

router.post('/insert', jsonParser, controller.insertRoomType)

router.post('/update/:_id', jsonParser, controller.updateRoomType)

router.get('/combobox/roomtype/:_id',controller.getRoomTypeByHotel)

router.get('/combobox/roomtypebyhotelcode/:index',controller.getRoomTypeByHotelCode)

router.get('/m/getroomtypebyhotel/:_id',controller.getRoomTypeByHotel)

router.get('/m/getroomtypebyid/:_id',controller.getRoomTypeById)

router.get('/getroomtypebysupplier/:_id',controller.getRoomTypeBySupplier)
module.exports = router