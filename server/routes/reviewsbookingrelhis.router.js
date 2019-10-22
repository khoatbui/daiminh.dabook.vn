/*=======GET TRAVEL STYLE LIST======
+ Duong dan hinh anh
+ Link
+ Title
+ Noi dung
==================================*/
var express = require('express')
var controller=require('../controllers/reviewsbookingrelhis.controller')
var authMiddleware=require('../middleware/auth.middleware')
var bodyParser = require('body-parser')

var router = express.Router()
// create application/json parser
var jsonParser = bodyParser.json({limit: '50mb', extended: true})

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({limit: '50mb', extended: true})


router.get('/',controller.index)

router.get('/getused',controller.getUsed)

router.get('/m/getreviewsbookingrelbyid/:_id',controller.getmReviewsBookingRELHISById)

router.get('/getreviewsbookingrelhisbybooking/:_id',controller.getmReviewsBookingRELHISByBooking)

router.delete('/:_id', controller.deleteReviewsBookingRELHIS)

router.post('/insert', jsonParser,controller.insertReviewsBookingRELHIS)

router.post('/update/:_id', jsonParser,controller.updateReviewsBookingRELHIS)
module.exports = router