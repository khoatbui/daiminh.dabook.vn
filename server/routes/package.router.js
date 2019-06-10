/*=======GET TRAVEL STYLE LIST======
+ Duong dan hinh anh
+ Link
+ Title
+ Noi dung
==================================*/
var express = require('express')
var controller=require('../controllers/package.controller')
var bodyParser = require('body-parser')

var router = express.Router()
// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/',controller.index)

router.delete('/:_id', controller.deletePackage)

router.post('/insert', jsonParser, controller.insertPackage)

router.post('/update/:_id', jsonParser, controller.updatePackage)

router.get('/combobox/package/:_id',controller.getPackageBySupplier)
module.exports = router