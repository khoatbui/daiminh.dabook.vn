/*=======GET TRAVEL STYLE LIST======
+ Duong dan hinh anh
+ Link
+ Title
+ Noi dung
==================================*/
var express = require('express')
var controller=require('../controllers/adslist.controller')
var authMiddleware=require('../middleware/auth.middleware')
var bodyParser = require('body-parser')

var router = express.Router()
// create application/json parser
var jsonParser = bodyParser.json({limit: '50mb', extended: true})

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({limit: '50mb', extended: true})


router.get('/',controller.index)

router.get('/getused',controller.getUsed)

router.get('/getusedads',controller.getUsedAds)

router.get('/m/getadslistbyid/:_id',controller.getmAdsListById)

router.get('/m/getadsbytype/:_id',controller.getmAdsByType)

router.get('/m/getalladspromotion',controller.getmAllAdsPromotion)

router.get('/m/gettop10adspromotion',controller.getmTop10AllAdsPromotion)

router.get('/m/getallads',controller.getmAllAds)

router.get('/m/getalladsbycity/:_id',controller.getmAllAdsByCity)

router.get('/m/getadslistbymiceid/:_id',controller.getmAdsListByMICEId)

router.delete('/:_id', controller.deleteAdsList)

router.post('/insert', jsonParser,controller.insertAdsList)

router.post('/m/getalladsbysearch', jsonParser,controller.getmAllAdsBySearch)

router.post('/update/:_id', jsonParser,controller.updateAdsList)
module.exports = router