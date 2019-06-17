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


// ROOMTYPE IMAGE
var roomTypeStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.env.ROOMTYPE_IMG_PATH)
    },
    filename: function (req, file, cb) {
        cb(null,moment().format("YYYYMMDDHHMM") + file.originalname)
  }
})
const uploadRoomTypeImg = multer({ storage: roomTypeStorage });


// HOTEL IMAGE
var hotelStorage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './uploads')
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname)
}
})
const uploadHotelImg = multer({ storage: hotelStorage })


// ROOMTYPE IMAGE
var roomTypeUpload = multer.diskStorage({
    destination: `./uploads`,
    filename: function (req, file, cb) {
        cb(null,moment().format("YYYYMMDDHHMM") + file.originalname)
  }
})
const upload = multer({storage:roomTypeUpload});

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/hotel-image',uploadHotelImg.single('file'),controller.uploadHotelImage)

router.post('/room-type-image', upload.array('photos', 12), controller.uploadRoomTypeImg)

module.exports = router