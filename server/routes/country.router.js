/*=======GET TRAVEL STYLE LIST======
+ Duong dan hinh anh
+ Link
+ Title
+ Noi dung
==================================*/
var express = require('express')
var controller=require('../controllers/country.controller')
var authMiddleware=require('../middleware/auth.middleware')
var bodyParser = require('body-parser')

var router = express.Router()
// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/',controller.index)

router.get('/m/getcountrybyid/:_id',controller.getmCountryById)

router.delete('/:_id', controller.deleteCountry)

router.post('/insert', jsonParser,controller.insertCountry)

router.post('/update/:_id', jsonParser,controller.updateCountry)
module.exports = router