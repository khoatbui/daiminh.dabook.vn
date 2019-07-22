/*=======SEND MAI AUTOMATIC======
+ Khi nhận request từ khách hàng, sẽ gửi emal tới nhân viên + email confirm cho khách
+ Code duoc sinh tu dong và luu vao database
==================================*/
var express = require('express')
var controller=require('../controllers/mail.controller')
var router = express.Router()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/hotel-booking', jsonParser,controller.sendHotelBookingEmail )

router.post('/m/hotel-booking',jsonParser,controller.sendMobileHotelBookingEmail)

router.post('/m/car-booking',jsonParser,controller.sendMobileCarBookingEmail)

router.post('/m/tour-booking',jsonParser,controller.sendMobileTourBookingEmail)

router.post('/tour-booking', jsonParser,controller.sendTourBookingEmail)

router.post('/car-booking', jsonParser, )

module.exports = router