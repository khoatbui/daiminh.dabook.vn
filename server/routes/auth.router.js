var express = require('express')
var controller=require('../controllers/auth.controller')
var bodyParser = require('body-parser')

var router = express.Router()
// create application/json parser
var jsonParser = bodyParser.json({limit: '50mb', extended: true})

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({limit: '50mb', extended: true})


router.get('/login',controller.login)
router.post('/login',jsonParser,controller.postLogin)

router.delete('/:index', controller.deleteUser)

router.post('/insert', jsonParser,controller.insertUser)

router.post('/update/:_id', jsonParser,controller.updateUser)
module.exports = router