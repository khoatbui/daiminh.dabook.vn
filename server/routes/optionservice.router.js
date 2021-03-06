/*=======GET TRAVEL STYLE LIST======
+ Duong dan hinh anh
+ Link
+ Title
+ Noi dung
==================================*/
var express = require('express')
var bodyParser = require('body-parser')
var controller=require('../controllers/optionservice.controller')

var router = express.Router()
// create application/json parser
var jsonParser = bodyParser.json({limit: '50mb', extended: true})

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({limit: '50mb', extended: true})


router.get('/',controller.index)

router.get('/getused',controller.getUsed)

router.delete('/:_id', controller.deleteOptionService)

router.post('/insert', jsonParser,controller.insertOptionService)

router.post('/update/:_id', jsonParser,controller.updateOptionService)

router.get('/combobox/optionbysupplierid/:_id', jsonParser,controller.getOptionServiceBySupplierId)

router.get('/combobox/optionbysupplierhotelroomtype/supplier/:supplierId/hotel/:hotelId/roomType/:roomTypeId', jsonParser,controller.getOptionServiceBySupplierHotelRoomType)

router.get('/combobox/optionbysuppliercode/:_id', jsonParser,controller.getOptionServiceBySupplierCode)
module.exports = router