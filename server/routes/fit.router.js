/*=======GET TRAVEL STYLE LIST======
+ Duong dan hinh anh
+ Link
+ Title
+ Noi dung
==================================*/
var express = require('express')
var controller=require('../controllers/fit.controller')
var authMiddleware=require('../middleware/auth.middleware')
var bodyParser = require('body-parser')

var router = express.Router()
// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/',controller.index)

router.get('/getused',controller.getUsed)

router.get('/m/getfitbyid/:_id',controller.getmFITById)

router.delete('/:_id', controller.deleteFIT)

router.post('/insert', jsonParser,controller.insertFIT)

router.post('/update/:_id', jsonParser,controller.updateFIT)
module.exports = router