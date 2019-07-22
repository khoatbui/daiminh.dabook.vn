/*=======GET TRAVEL STYLE LIST======
+ Duong dan hinh anh
+ Link
+ Title
+ Noi dung
==================================*/
var express = require('express')
var controller=require('../controllers/destination.controller')
var authMiddleware=require('../middleware/auth.middleware')
var bodyParser = require('body-parser')

var router = express.Router()
// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/',controller.index)

router.get('/m/getdestinationbyid/:_id',controller.getmDestinationById)

router.get('/m/gettop10destination',controller.getmTop10Destination)

router.delete('/:_id', controller.deleteDestination)

router.post('/insert', jsonParser,controller.insertDestination)

router.post('/update/:_id', jsonParser,controller.updateDestination)
module.exports = router