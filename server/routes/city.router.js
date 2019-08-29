/*=======GET TRAVEL STYLE LIST======
+ Duong dan hinh anh
+ Link
+ Title
+ Noi dung
==================================*/
var express = require('express')
var controller=require('../controllers/city.controller')
var authMiddleware=require('../middleware/auth.middleware')
var bodyParser = require('body-parser')

var router = express.Router()
// create application/json parser
var jsonParser = bodyParser.json({limit: '50mb', extended: true})

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({limit: '50mb', extended: true})


router.get('/',controller.index)

router.get('/getused',controller.getUsed)

router.get('/m/getcitybyid/:_id',controller.getmCityById)

router.get('/m/gettop10city',controller.getmTop10City)

router.get('/m/getcitybyareacountry',controller.getmCityByAreaCountry)

router.get('/m/gettop10citybycountry/:_id',controller.getmTop10CityByCountry)

router.delete('/:_id', controller.deleteCity)

router.post('/insert', jsonParser,controller.insertCity)

router.post('/update/:_id', jsonParser,controller.updateCity)
module.exports = router