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
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/',controller.index)

router.delete('/:_id', controller.deleteOptionService)

router.post('/insert', jsonParser,controller.insertOptionService)

router.post('/update/:_id', jsonParser,controller.updateOptionService)

router.get('/combobox/optionbysupplierid/:_id', jsonParser,controller.getOptionServiceBySupplierId)

router.get('/combobox/optionbysuppliercode/:_id', jsonParser,controller.getOptionServiceBySupplierCode)
module.exports = router