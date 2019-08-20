/*=======SUPPLIER======
+ Duong dan hinh anh
+ Link
+ Title
+ Noi dung
==================================*/
var express = require('express')
var bodyParser = require('body-parser')
var controller=require('../controllers/toursupplier.controller')

var router = express.Router()
// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/',controller.index)

router.get('/getused',controller.getUsed)

router.get('/getpromotesupplier',controller.getPromoteSupplier)

router.delete('/:_id', controller.deleteSupplier)

router.post('/insert',jsonParser, controller.insertSupplier)

router.post('/update/:_id', jsonParser,controller.updateSupplier)
module.exports = router