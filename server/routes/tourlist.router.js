/*=======GET TRAVEL STYLE LIST======
+ Duong dan hinh anh
+ Link
+ Title
+ Noi dung
==================================*/
var express = require('express')
var controller=require('../controllers/tourlist.controller')
var authMiddleware=require('../middleware/auth.middleware')
var bodyParser = require('body-parser')

var router = express.Router()
// create application/json parser
var jsonParser = bodyParser.json({limit: '50mb', extended: true})

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({limit: '50mb', extended: true})


router.get('/',controller.index)

router.get('/getused',controller.getUsed)

router.get('/m/gettourlistbyid/:_id',controller.getmTourListById)

router.get('/m/getalltourpromotion',controller.getmAllTourPromotion)

router.get('/m/gettop10tourpromotion',controller.getmTop10AllTourPromotion)

router.get('/m/getalltour',controller.getmAllTour)

router.get('/m/getalltourbycity/:_id',controller.getmAllTourByCity)

router.get('/m/getalltourbydestination/:_id',controller.getmAllTourByDestination)

router.get('/m/getalltourbystyle/:_id',controller.getmAllTourByStyle)

router.get('/m/gettourbytravelstyle/:_id',controller.getmTourByTravelStyle)

router.delete('/:_id', controller.deleteTourList)

router.post('/insert', jsonParser,controller.insertTourList)

router.post('/m/getalltourbysearch', jsonParser,controller.getmAllTourBySearch)

router.post('/update/:_id', jsonParser,controller.updateTourList)
module.exports = router