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
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/',authMiddleware.requireLogin,controller.index)

router.delete('/:index', controller.deleteCity)

router.post('/insert', jsonParser,controller.insertCity)

router.post('/update/:_id', jsonParser,controller.updateCity)
module.exports = router