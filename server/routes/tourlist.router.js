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
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/',controller.index)

router.get('/m/gettourlistbyid/:_id',controller.getmTourListById)

router.get('/m/getalltourpromotion',controller.getmAllTourPromotion)

router.get('/m/gettop10tourpromotion',controller.getmTop10AllTourPromotion)

router.get('/m/getalltour',controller.getmAllTour)

router.get('/m/getalltourbycity/:_id',controller.getmAllTourByCity)

router.delete('/:_id', controller.deleteTourList)

router.post('/insert', jsonParser,controller.insertTourList)

router.post('/m/getalltourbysearch', jsonParser,controller.getmAllTourBySearch)

router.post('/update/:_id', jsonParser,controller.updateTourList)
module.exports = router