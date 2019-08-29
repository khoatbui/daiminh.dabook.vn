/*=======GET TRAVEL STYLE LIST======
+ Duong dan hinh anh
+ Link
+ Title
+ Noi dung
==================================*/
var express = require('express')
var bodyParser = require('body-parser')
var controller=require('../controllers/packagehotelrel.controller')

var router = express.Router()
// create application/json parser
var jsonParser = bodyParser.json({limit: '50mb', extended: true})

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({limit: '50mb', extended: true})


router.get('/',controller.index)

router.get('/getused',controller.getUsed)

router.delete('/:_id',controller.deletePackageHotelREL)

router.post('/insert', jsonParser, controller.insertPackageHotelREL)

router.post('/update/:_id', jsonParser, controller.updatePackageHotelREL)

router.get('/combobox/packagebyhotelroomtype/hotel/:hotelId/roomType/:roomTypeId',controller.getPackageByHotelRoomType)
router.get('/price/hotel/:hotelId/roomType/:roomTypeId/package/:packageId',(req,res,next) => {
    
})
router.post('/price', jsonParser,(req,res,next) => {
   
})

router.post('/combobox/packagebymultihotelroomtype',jsonParser,controller.getPackageByMultiHotelRoomType)

router.post('/combobox/packagebysinglehotelroomtype',jsonParser,controller.getPackageBySingleHotelRoomType)


// MOBILE

router.get('/m/getallpackage',controller.getmAllPackage)

router.get('/m/getallpromotionpackage',controller.getmAllPromotionPackage)

router.get('/m/gettop10promotionpackage',controller.getmAllPromotionPackage)

router.get('/m/getpackagedetail/:_id', controller.getmPackageDetail)

router.get('/m/getpackagebyhotel/:_id', controller.getPackageByHotel)

router.get('/m/getpackagebyhotelroomtype/:hotelid&:roomtypeid', controller.getPackageByHotelRoomType)

router.get('/m/getallpromotepackagebysupplier/:_id',controller.getmAllPromotePackageBySupplier)

router.get('/m/getallpackagebysupplier/:_id',controller.getmAllPackageBySupplier)

router.get('/m/getallpackagebycity/:_id',controller.getmAllPromotePackageByCity)

router.get('/m/getallpackagebydestination/:_id',controller.getmAllPackageByDestination)

router.post('/m/postpackagebysearch', jsonParser,controller.getmAllPackageBySearch)

router.post('/m/postpromotionpackagebysearch', jsonParser,controller.getmAllPromotionPackageBySearch)

module.exports = router