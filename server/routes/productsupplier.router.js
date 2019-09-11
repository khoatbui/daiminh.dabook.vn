/*=======SUPPLIER======
+ Duong dan hinh anh
+ Link
+ Title
+ Noi dung
==================================*/
var express = require('express')
var bodyParser = require('body-parser')
var controller=require('../controllers/productsupplier.controller')

var router = express.Router()
// create application/json parser
var jsonParser = bodyParser.json({limit: '50mb', extended: true})

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({limit: '50mb', extended: true})


router.get('/',controller.index)

router.get('/getused',controller.getUsed)

router.get('/getpromoteproductsupplier',controller.getPromoteProductSupplier)

router.delete('/:_id', controller.deleteProductSupplier)

router.post('/insert',jsonParser, controller.insertProductSupplier)

router.post('/update/:_id', jsonParser,controller.updateProductSupplier)
module.exports = router