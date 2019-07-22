/*=======SUPPLIER======
+ Duong dan hinh anh
+ Link
+ Title
+ Noi dung
==================================*/
var express = require('express')
var bodyParser = require('body-parser')
var controller=require('../controllers/tourtype.controller')

var router = express.Router()
// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/',controller.index)

router.get('/getpromotetourtype',controller.getPromoteTourType)

router.delete('/:_id', controller.deleteTourType)

router.post('/insert',jsonParser, controller.insertTourType)

router.post('/update/:_id', jsonParser,controller.updateTourType)
module.exports = router