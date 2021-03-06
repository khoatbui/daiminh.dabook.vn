/*=======GET TRAVEL STYLE LIST======
+ Duong dan hinh anh
+ Link
+ Title
+ Noi dung
==================================*/
var express = require('express')
var controller=require('../controllers/blogdetail.controller')
var authMiddleware=require('../middleware/auth.middleware')
var bodyParser = require('body-parser')

var router = express.Router()
// create application/json parser
var jsonParser = bodyParser.json({limit: '500mb', extended: true})

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({limit: '500mb', extended: true})


router.get('/',controller.index)

router.get('/getused',controller.getUsed)

router.get('/aboutus',controller.getBlogAboutUs)

router.get('/m/getblogdetailbyid/:_id',controller.getmBlogDetailById)

router.delete('/:_id', controller.deleteBlogDetail)

router.post('/insert', jsonParser,controller.insertBlogDetail)

router.post('/update/:_id', jsonParser,controller.updateBlogDetail)
module.exports = router