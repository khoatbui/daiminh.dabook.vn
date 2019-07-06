/*=======GET TRAVEL STYLE LIST======
+ Duong dan hinh anh
+ Link
+ Title
+ Noi dung
==================================*/
var express = require('express')
var controller=require('../controllers/upload.controller')
var bodyParser = require('body-parser')
const multer = require('multer');
require('dotenv').config();
var moment =require('moment');
moment().format();

var router = express.Router()


// SUPPLIER IMAGE
var supplierUpload = multer.diskStorage({
  destination: `./uploads/hotel/supplier`,
  filename: function (req, file, cb) {
      cb(null,moment().format("YYYYMMDDHHMMSS") + file.originalname)
}
})
const uploadSupplier = multer({storage:supplierUpload});


// HOTEL IMAGE
var hotelUpload = multer.diskStorage({
  destination: `./uploads/hotel/hotel`,
  filename: function (req, file, cb) {
      cb(null,moment().format("YYYYMMDDHHMMSS") + file.originalname)
}
})
const uploadHotel = multer({storage:hotelUpload});


// ROOMTYPE IMAGE
var roomTypeUpload = multer.diskStorage({
    destination: `./uploads/hotel/roomtype`,
    filename: function (req, file, cb) {
        cb(null,moment().format("YYYYMMDDHHMMSS") + file.originalname)
  }
})
const uploadRoomType = multer({storage:roomTypeUpload});


//CAR SUPPLIER IMAGE
var carsupplierUpload = multer.diskStorage({
  destination: `./uploads/car/supplier`,
  filename: function (req, file, cb) {
      cb(null,moment().format("YYYYMMDDHHMMSS") + file.originalname)
}
})
const uploadCarSupplier = multer({storage:carsupplierUpload});

//CAR TYPE IMAGE
var cartypeUpload = multer.diskStorage({
  destination: `./uploads/car/cartype`,
  filename: function (req, file, cb) {
      cb(null,moment().format("YYYYMMDDHHMMSS") + file.originalname)
}
})
const uploadCarType = multer({storage:cartypeUpload});

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/hotel/supplier',uploadSupplier.array('photos', 12),controller.uploadSupplierImg)
router.post('/hotel/hotel',uploadHotel.array('photos', 12),controller.uploadHotelImg)
router.post('/hotel/roomtype', uploadRoomType.array('photos', 12), controller.uploadRoomTypeImg)

router.post('/car/supplier',uploadCarSupplier.array('photos', 12),controller.uploadCarSupplierImg)
router.post('/car/cartype',uploadCarType.array('photos', 12),controller.uploadCarTypeImg)

module.exports = router