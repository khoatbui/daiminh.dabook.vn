/*=======GET TRAVEL STYLE LIST======
+ Duong dan hinh anh
+ Link
+ Title
+ Noi dung
==================================*/
var express = require('express')
var bodyParser = require('body-parser')
var controller=require('../controllers/cartype.controller')

var router = express.Router()

// create application/json parser
var jsonParser = bodyParser.json({limit: '50mb', extended: true})

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({limit: '50mb', extended: true})


router.get('/',controller.index)

router.get('/getused',controller.getUsed)

router.delete('/:_id', controller.deleteCarType)

router.post('/insert', jsonParser, controller.insertCarType)

router.post('/update/:_id', jsonParser, controller.updateCarType)

router.get('/combobox/cartype/:index',controller.getCarTypeBySupplier)

router.get('/combobox/cartypebysupplierCode/:index',controller.getCarTypeBySupplierCode)

router.get('/m/getcartypebyid/:_id',controller.getCarTypeById)
module.exports = router