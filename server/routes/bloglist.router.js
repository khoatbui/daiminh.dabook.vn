/*=======GET TRAVEL STYLE LIST======
+ Duong dan hinh anh
+ Link
+ Title
+ Noi dung
==================================*/
var express = require('express')
var controller=require('../controllers/bloglist.controller')
var authMiddleware=require('../middleware/auth.middleware')
var bodyParser = require('body-parser')

var router = express.Router()
// create application/json parser
var jsonParser = bodyParser.json({limit: '50mb', extended: true})

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({limit: '50mb', extended: true})


router.get('/',controller.index)

router.get('/getused',controller.getUsed)

router.get('/getusedblog',controller.getUsedBlog)

router.get('/getusedhotblog',controller.getUsedHotBlog)

router.get('/m/getbloglistbyid/:_id',controller.getmBlogListById)

router.get('/m/getallblogpromotion',controller.getmAllBlogPromotion)

router.get('/m/gettop10blogpromotion',controller.getmTop10AllBlogPromotion)

router.get('/m/getallblog',controller.getmAllBlog)

router.get('/m/getallblogbycity/:_id',controller.getmAllBlogByCity)

router.get('/m/getbloglistbymiceid/:_id',controller.getmBlogListByMICEId)

router.delete('/:_id', controller.deleteBlogList)

router.post('/insert', jsonParser,controller.insertBlogList)

router.post('/m/getallblogbysearch', jsonParser,controller.getmAllBlogBySearch)

router.post('/update/:_id', jsonParser,controller.updateBlogList)
module.exports = router