/*=======GET TRAVEL STYLE LIST======
+ Duong dan hinh anh
+ Link
+ Title
+ Noi dung
==================================*/
var express = require('express')
var controller=require('../controllers/mice.controller')
var authMiddleware=require('../middleware/auth.middleware')
var bodyParser = require('body-parser')

var router = express.Router()
// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/',controller.index)

router.get('/getused',controller.getUsed)

router.get('/m/getmicebyid/:_id',controller.getmMICEById)

router.delete('/:_id', controller.deleteMICE)

router.post('/insert', jsonParser,controller.insertMICE)

router.post('/update/:_id', jsonParser,controller.updateMICE)
module.exports = router