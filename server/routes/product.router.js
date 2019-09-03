/*=======GET TRAVEL STYLE LIST======
+ Duong dan hinh anh
+ Link
+ Title
+ Noi dung
==================================*/
var express = require('express')
var bodyParser = require('body-parser')
var controller=require('../controllers/product.controller')

var router = express.Router()
// create application/json parser
var jsonParser = bodyParser.json({limit: '50mb', extended: true})

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({limit: '50mb', extended: true})


router.get('/',controller.index)

router.get('/getused',controller.getUsed)

router.get('/combobox/product/:index',controller.getProductBySupplier)

router.get('/combobox/productbysuppliercode/:index',controller.getProductBySupplierCode)

router.get('/combobox/promoteproductbysuppliercode/:index',controller.getPromoteProductBySupplierCode)

router.delete('/:_id',controller.deleteProduct)

router.post('/insert', jsonParser,controller.insertProduct)

router.post('/update/:_id', jsonParser, controller.updateProduct)

// MOBILE

router.get('/m/getlistproductpromotion',controller.getmListProductWithPromotion)

router.get('/m/getlistproduct',controller.getmListProduct)

router.get('/m/getproductbyid/:_id',controller.getmProductById)

router.get('/m/getlistproductpromotebysuppliercode/:_id',controller.getmListProductPromotionBySupplier)

router.post('/m/postproductbysearch', jsonParser,controller.getmProductBySearch)
router.post('/m/postpromotionproductbysearch', jsonParser,controller.getmPromotionProductBySearch)

module.exports = router