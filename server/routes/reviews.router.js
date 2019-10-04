/*=======GET TRAVEL STYLE LIST======
+ Duong dan hinh anh
+ Link
+ Title
+ Noi dung
==================================*/
var express = require('express')
var controller=require('../controllers/reviews.controller')
var authMiddleware=require('../middleware/auth.middleware')
var bodyParser = require('body-parser')

var router = express.Router()
// create application/json parser
var jsonParser = bodyParser.json({limit: '50mb', extended: true})

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({limit: '50mb', extended: true})


router.get('/',controller.index)

router.get('/getused',controller.getUsed)

router.get('/m/getreviewsbyid/:_id',controller.getmReviewsById)

router.delete('/:_id', controller.deleteReviews)

router.post('/insert', jsonParser,controller.insertReviews)

router.post('/postinsertnewreviews', jsonParser,controller.insertReviews)

router.post('/update/:_id', jsonParser,controller.updateReviews)
module.exports = router