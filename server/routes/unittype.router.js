/*=======GET TRAVEL STYLE LIST======
+ Duong dan hinh anh
+ Link
+ Title
+ Noi dung
==================================*/
var express = require('express')
var controller=require('../controllers/unittype.controller')
var authMiddleware=require('../middleware/auth.middleware')
var bodyParser = require('body-parser')

var router = express.Router()
// create application/json parser
var jsonParser = bodyParser.json({limit: '50mb', extended: true})

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({limit: '50mb', extended: true})


router.get('/',controller.index)

router.get('/getused',controller.getUsed)

router.get('/m/getunittypebyid/:_id',controller.getmUnitTypeById)

router.delete('/:_id', controller.deleteUnitType)

router.post('/insert', jsonParser,controller.insertUnitType)

router.post('/update/:_id', jsonParser,controller.updateUnitType)
module.exports = router