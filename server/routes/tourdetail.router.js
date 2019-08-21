/*=======GET TRAVEL STYLE LIST======
+ Duong dan hinh anh
+ Link
+ Title
+ Noi dung
==================================*/
var express = require('express')
var controller=require('../controllers/tourdetail.controller')
var authMiddleware=require('../middleware/auth.middleware')
var bodyParser = require('body-parser')

var router = express.Router()
// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/',controller.index)

router.get('/getused',controller.getUsed)

router.get('/m/gettourdetailbyid/:_id',controller.getmTourDetailById)

router.delete('/:_id', controller.deleteTourDetail)

router.post('/insert', jsonParser,controller.insertTourDetail)

router.post('/update/:_id', jsonParser,controller.updateTourDetail)
module.exports = router