/*=======GET TRAVEL STYLE LIST======
+ Duong dan hinh anh
+ Link
+ Title
+ Noi dung
==================================*/
var express = require('express')
var controller=require('../controllers/travelservice.controller')
var authMiddleware=require('../middleware/auth.middleware')
var bodyParser = require('body-parser')

var router = express.Router()
// create application/json parser
var jsonParser = bodyParser.json({limit: '50mb', extended: true})

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({limit: '50mb', extended: true})


router.get('/',controller.index)

router.get('/m/gettravelservicebycode/:_id',controller.getmTravelServiceByCode)

router.get('/getused',controller.getUsed)

router.get('/m/gettravelservicebyid/:_id',controller.getmTravelServiceById)

router.delete('/:_id', controller.deleteTravelService)

router.post('/insert', jsonParser,controller.insertTravelService)

router.post('/update/:_id', jsonParser,controller.updateTravelService)
module.exports = router