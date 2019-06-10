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
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.get('/',controller.index)

router.delete('/:_id',controller.deletePackageHotelREL)

router.post('/insert', jsonParser, controller.insertPackageHotelREL)

router.post('/update/:_id', jsonParser, controller.updatePackageHotelREL)

router.get('/combobox/packagebyhotelroomtype/hotel/:hotelId/roomType/:roomTypeId',controller.getPackageByHotelRoomType)
router.get('/price/hotel/:hotelId/roomType/:roomTypeId/package/:packageId',(req,res,next) => {
    console.log(req.params);
    res.send(db.get('packageHotelREL')
    .filter({ hotelId: req.params.hotelId })
    .filter({ roomTypeId: req.params.roomTypeId })
    .filter({ packageId: req.params.packageId }).value());
})
router.post('/price', jsonParser,(req,res,next) => {
    console.log(req.body);
    res.send(db.get('packageHotelREL')
    .filter({ hotelId: req.body.hotelId })
    .filter({ roomTypeId: req.body.roomTypeId })
    .filter({ packageId: req.body.packageId }).value());
})
module.exports = router