/*=======GET TRAVEL STYLE LIST======
+ Duong dan hinh anh
+ Link
+ Title
+ Noi dung
==================================*/
var express = require('express')
var controller=require('../controllers/travelstyle.controller')
var authMiddleware=require('../middleware/auth.middleware')
var bodyParser = require('body-parser')

var router = express.Router()
// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/',controller.index)

router.get('/m/gettravelstylebyid/:_id',controller.getmTravelStyleById)

router.delete('/:_id', controller.deleteTravelStyle)

router.post('/insert', jsonParser,controller.insertTravelStyle)

router.post('/update/:_id', jsonParser,controller.updateTravelStyle)
module.exports = router