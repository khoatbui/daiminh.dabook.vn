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
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/',controller.index)

router.delete('/:_id', controller.deleteRoomType)

router.post('/insert', jsonParser, controller.insertRoomType)

router.post('/update/:_id', jsonParser, controller.updateRoomType)

router.get('/combobox/roomtype/:index',controller.getRoomTypeByHotel)
module.exports = router