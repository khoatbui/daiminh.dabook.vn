/*=======GET TRAVEL STYLE LIST======
+ Duong dan hinh anh
+ Link
+ Title
+ Noi dung
==================================*/
var express = require('express')
var controller=require('../controllers/areacountry.controller')
var authMiddleware=require('../middleware/auth.middleware')
var bodyParser = require('body-parser')

var router = express.Router()
// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/',controller.index)

router.get('/m/getareacountrybyid/:_id',controller.getmAreaCountryById)

router.delete('/:_id', controller.deleteAreaCountry)

router.post('/insert', jsonParser,controller.insertAreaCountry)

router.post('/update/:_id', jsonParser,controller.updateAreaCountry)
module.exports = router