/*=======GET TRAVEL STYLE LIST======
+ Duong dan hinh anh
+ Link
+ Title
+ Noi dung
==================================*/
var express = require('express')
var controller=require('../controllers/reviewsbookingrel.controller')
var authMiddleware=require('../middleware/auth.middleware')
var bodyParser = require('body-parser')

var router = express.Router()
// create application/json parser
var jsonParser = bodyParser.json({limit: '50mb', extended: true})

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({limit: '50mb', extended: true})


router.get('/',controller.index)

router.get('/getused',controller.getUsed)

router.get('/getactive',controller.getActive)

router.get('/m/getreviewsbookingrelbyid/:_id',controller.getmReviewsBookingRELById)

router.delete('/:_id', controller.deleteReviewsBookingREL)

router.post('/insert', jsonParser,controller.insertReviewsBookingREL)

router.post('/update/:_id', jsonParser,controller.updateReviewsBookingREL)
module.exports = router