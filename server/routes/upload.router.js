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

//CAR TRIP IMAGE
var cartripUpload = multer.diskStorage({
  destination: `./uploads/car/trip`,
  filename: function (req, file, cb) {
      cb(null,moment().format("YYYYMMDDHHMMSS") + file.originalname)
}
})
const uploadCarTrip = multer({storage:cartripUpload});

//CITY IMAGE
var cityUpload = multer.diskStorage({
  destination: `./uploads/tour/city`,
  filename: function (req, file, cb) {
      cb(null,moment().format("YYYYMMDDHHMMSS") + file.originalname)
}
})
const uploadCity = multer({storage:cityUpload});

//AREA IMAGE
var areaUpload = multer.diskStorage({
  destination: `./uploads/tour/area`,
  filename: function (req, file, cb) {
      cb(null,moment().format("YYYYMMDDHHMMSS") + file.originalname)
}
})
const uploadArea = multer({storage:areaUpload});

//AREA COUNTRY IMAGE
var areaCountryUpload = multer.diskStorage({
  destination: `./uploads/tour/areacountry`,
  filename: function (req, file, cb) {
      cb(null,moment().format("YYYYMMDDHHMMSS") + file.originalname)
}
})
const uploadAreaCountry = multer({storage:areaCountryUpload});

//COUNTRY IMAGE
var countryUpload = multer.diskStorage({
  destination: `./uploads/tour/country`,
  filename: function (req, file, cb) {
      cb(null,moment().format("YYYYMMDDHHMMSS") + file.originalname)
}
})
const uploadCountry = multer({storage:countryUpload});

//DESTINATION IMAGE
var destinationUpload = multer.diskStorage({
  destination: `./uploads/tour/country`,
  filename: function (req, file, cb) {
      cb(null,moment().format("YYYYMMDDHHMMSS") + file.originalname)
}
})
const uploadDestination = multer({storage:destinationUpload});

//TRAVEL STYLE IMAGE
var travelStyleUpload = multer.diskStorage({
  destination: `./uploads/tour/travelstyle`,
  filename: function (req, file, cb) {
      cb(null,moment().format("YYYYMMDDHHMMSS") + file.originalname)
}
})
const uploadTravelStyle = multer({storage:travelStyleUpload});

//MICE IMAGE
var miceUpload = multer.diskStorage({
  destination: `./uploads/tour/mice`,
  filename: function (req, file, cb) {
      cb(null,moment().format("YYYYMMDDHHMMSS") + file.originalname)
}
})
const uploadMICE = multer({storage:miceUpload});

//ABOUT US IMAGE
var aboutUsUpload = multer.diskStorage({
  destination: `./uploads/page/aboutus`,
  filename: function (req, file, cb) {
      cb(null,moment().format("YYYYMMDDHHMMSS") + file.originalname)
}
})
const uploadAboutUs = multer({storage:aboutUsUpload});

//TRAVEL SERVICE IMAGE
var travelServiceUpload = multer.diskStorage({
  destination: `./uploads/tour/travelservice`,
  filename: function (req, file, cb) {
      cb(null,moment().format("YYYYMMDDHHMMSS") + file.originalname)
}
})
const uploadTravelService = multer({storage:travelServiceUpload});

//FIT IMAGE
var fitUpload = multer.diskStorage({
  destination: `./uploads/tour/travelservice`,
  filename: function (req, file, cb) {
      cb(null,moment().format("YYYYMMDDHHMMSS") + file.originalname)
}
})
const uploadFIT = multer({storage:fitUpload});

//PAYMENT IMAGE
var paymentUpload = multer.diskStorage({
  destination: `./uploads/page/payment`,
  filename: function (req, file, cb) {
      cb(null,moment().format("YYYYMMDDHHMMSS") + file.originalname)
}
})
const uploadPayment = multer({storage:paymentUpload});

//TOUR LIST IMAGE
var tourListUpload = multer.diskStorage({
  destination: `./uploads/tour/tourlist`,
  filename: function (req, file, cb) {
      cb(null,moment().format("YYYYMMDDHHMMSS") + file.originalname)
}
})
const uploadTourList = multer({storage:tourListUpload});


//TOUR DETAIL IMAGE
var tourDetailUpload = multer.diskStorage({
  destination: `./uploads/tour/tourdetail`,
  filename: function (req, file, cb) {
      cb(null,moment().format("YYYYMMDDHHMMSS") + file.originalname)
}
})
const uploadTourDetail = multer({storage:tourDetailUpload});

//TOUR DETAIL ADS
var adsUpload = multer.diskStorage({
  destination: `./uploads/ads`,
  filename: function (req, file, cb) {
      cb(null,moment().format("YYYYMMDDHHMMSS") + file.originalname)
}
})
const uploadAds = multer({storage:adsUpload});

// ADS TYPE
var adsTypeUpload = multer.diskStorage({
  destination: `./uploads/ads/adstype`,
  filename: function (req, file, cb) {
      cb(null,moment().format("YYYYMMDDHHMMSS") + file.originalname)
}
})
const uploadAdsType = multer({storage:adsTypeUpload});

// ADS LIST
var adsListUpload = multer.diskStorage({
  destination: `./uploads/ads/adslist`,
  filename: function (req, file, cb) {
      cb(null,moment().format("YYYYMMDDHHMMSS") + file.originalname)
}
})
const uploadAdsList = multer({storage:adsListUpload});

// ADS DETAIL
var adsDetailUpload = multer.diskStorage({
  destination: `./uploads/ads/adslist`,
  filename: function (req, file, cb) {
      cb(null,moment().format("YYYYMMDDHHMMSS") + file.originalname)
}
})
const uploadAdsDetail = multer({storage:adsDetailUpload});

//TOUR SUPPLIER IMAGE
var tourSupplierUpload = multer.diskStorage({
  destination: `./uploads/tour/supplier`,
  filename: function (req, file, cb) {
      cb(null,moment().format("YYYYMMDDHHMMSS") + file.originalname)
}
})
const uploadTourSupplier = multer({storage:tourSupplierUpload});

//PRODUCT SUPPLIER IMAGE
var productSupplierUpload = multer.diskStorage({
  destination: `./uploads/product/supplier`,
  filename: function (req, file, cb) {
      cb(null,moment().format("YYYYMMDDHHMMSS") + file.originalname)
}
})
const uploadProductSupplier = multer({storage:productSupplierUpload});

//PRODUCT CATEGORY IMAGE
var productCategoryUpload = multer.diskStorage({
  destination: `./uploads/product/category`,
  filename: function (req, file, cb) {
      cb(null,moment().format("YYYYMMDDHHMMSS") + file.originalname)
}
})
const uploadProductCategory = multer({storage:productCategoryUpload});
//TOUR SUPPLIER IMAGE
var blogListUpload = multer.diskStorage({
  destination: `./uploads/blog/bloglist`,
  filename: function (req, file, cb) {
      cb(null,moment().format("YYYYMMDDHHMMSS") + file.originalname)
}
})
const uploadBlogList = multer({storage:blogListUpload});



//TOUR DOCUMENT
var tourDocumentUpload = multer.diskStorage({
  destination: `./uploads/tour/supplier`,
  filename: function (req, file, cb) {
      cb(null,moment().format("YYYYMMDDHHMMSS") + file.originalname)
}
})
const uploadTourDocument = multer({storage:tourDocumentUpload});


//CAR TYPE INTRO IMAGE
var carTypeIntroUpload = multer.diskStorage({
  destination: `./uploads/car/cartype/cartypeintro`,
  filename: function (req, file, cb) {
      cb(null,moment().format("YYYYMMDDHHMMSS") + file.originalname)
}
})
const uploadCarTypeIntro = multer({storage:carTypeIntroUpload});

//CAR TRANS TYPE INTRO IMAGE
var carTransTypeIntroUpload = multer.diskStorage({
  destination: `./uploads/car/trans/cartranstypeintro`,
  filename: function (req, file, cb) {
      cb(null,moment().format("YYYYMMDDHHMMSS") + file.originalname)
}
})
const uploadCarTransTypeIntro = multer({storage:carTransTypeIntroUpload});

//CAR TRIP TYPE INTRO IMAGE
var carTripIntroUpload = multer.diskStorage({
  destination: `./uploads/car/trip/tripintro`,
  filename: function (req, file, cb) {
      cb(null,moment().format("YYYYMMDDHHMMSS") + file.originalname)
}
})
const uploadTripIntro = multer({storage:carTripIntroUpload});

//HOTEL INTRO IMAGE
var hotelIntroUpload = multer.diskStorage({
  destination: `./uploads/hotel/hotel/hotelintro`,
  filename: function (req, file, cb) {
      cb(null,moment().format("YYYYMMDDHHMMSS") + file.originalname)
}
})
const uploadHotelIntro = multer({storage:hotelIntroUpload});

//ROOM TYPE INTRO IMAGE
var roomTypeIntroUpload = multer.diskStorage({
  destination: `./uploads/hotel/roomtype/roomtypeintro`,
  filename: function (req, file, cb) {
      cb(null,moment().format("YYYYMMDDHHMMSS") + file.originalname)
}
})
const uploadRoomTypeIntro = multer({storage:roomTypeIntroUpload});

//PACKAGE INTRO IMAGE
var packageIntroUpload = multer.diskStorage({
  destination: `./uploads/hotel/roomtype/roomtypeintro`,
  filename: function (req, file, cb) {
      cb(null,moment().format("YYYYMMDDHHMMSS") + file.originalname)
}
})
const uploadPackageIntro = multer({storage:packageIntroUpload});

//FIT INTRO IMAGE
var fitIntroUpload = multer.diskStorage({
  destination: `./uploads/hotel/roomtype/roomtypeintro`,
  filename: function (req, file, cb) {
      cb(null,moment().format("YYYYMMDDHHMMSS") + file.originalname)
}
})
const uploadFITIntro = multer({storage:fitIntroUpload});

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//BLOG DETAIL INTRO IMAGE
var blogDetailIntroUpload = multer.diskStorage({
  destination: `./uploads/blog/blogdetail/blogdetailintro`,
  filename: function (req, file, cb) {
      cb(null,moment().format("YYYYMMDDHHMMSS") + file.originalname)
}
})
const uploadBlogDetailIntro = multer({storage:blogDetailIntroUpload});

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/hotel/supplier',uploadSupplier.array('photos', 12),controller.uploadSupplierImg)
router.post('/hotel/supplier/webmp',uploadSupplier.array('photos', 12),controller.webpuploadSupplierImg)
router.post('/hotel/hotel',uploadHotel.array('photos', 12),controller.uploadHotelImg)
router.post('/hotel/hotel/webmp',uploadHotel.array('photos', 12),controller.webpuploadHotelImg)
router.post('/hotel/roomtype', uploadRoomType.array('photos', 12), controller.uploadRoomTypeImg)
router.post('/hotel/roomtype/webmp', uploadRoomType.array('photos', 12), controller.webpuploadRoomTypeImg)

router.post('/car/supplier',uploadCarSupplier.array('photos', 12),controller.uploadCarSupplierImg)
router.post('/car/supplier/webmp',uploadCarSupplier.array('photos', 12),controller.webpuploadCarSupplierImg)
router.post('/car/cartype',uploadCarType.array('photos', 12),controller.uploadCarTypeImg)
router.post('/car/cartype/webmp',uploadCarType.array('photos', 12),controller.webpuploadCarTypeImg)
router.post('/car/trip',uploadCarTrip.array('photos', 12),controller.uploadCarTripImg)
router.post('/car/trip/webmp',uploadCarTrip.array('photos', 12),controller.webpuploadCarTripImg)

router.post('/tour/city',uploadCity.array('photos', 12),controller.uploadCityImg)
router.post('/tour/city/webmp',uploadCity.array('photos', 12),controller.webpuploadCityImg)
router.post('/tour/area',uploadArea.array('photos', 12),controller.uploadAreaImg)
router.post('/tour/area/webmp',uploadArea.array('photos', 12),controller.webpuploadAreaImg)
router.post('/tour/areacountry',uploadAreaCountry.array('photos', 12),controller.uploadAreaCountryImg)
router.post('/tour/areacountry/webmp',uploadAreaCountry.array('photos', 12),controller.webpuploadAreaCountryImg)
router.post('/tour/country',uploadCountry.array('photos', 12),controller.uploadCountryImg)
router.post('/tour/country/webmp',uploadCountry.array('photos', 12),controller.webpuploadCountryImg)
router.post('/tour/destination',uploadDestination.array('photos', 12),controller.uploadDestinationImg)
router.post('/tour/destination/webmp',uploadDestination.array('photos', 12),controller.webpuploadDestinationImg)
router.post('/tour/supplier',uploadTourSupplier.array('photos', 12),controller.uploadTourSupplierImg)
router.post('/tour/supplier/webmp',uploadTourSupplier.array('photos', 12),controller.webpuploadTourSupplierImg)
router.post('/tour/tourlist',uploadTourList.array('photos', 12),controller.uploadTourListImg)
router.post('/tour/tourlist/webmp',uploadTourList.array('photos', 12),controller.webpuploadTourListImg)
router.post('/tour/document',uploadTourDocument.array('documents', 12),controller.uploadTourDocumentImg)

router.post('/ads',uploadAds.array('photos', 12),controller.uploadAdsImg)
router.post('/tour/travelstyle',uploadTravelStyle.array('photos', 12),controller.uploadTravelStyleImg)
router.post('/tour/travelservice',uploadTravelService.array('photos', 12),controller.uploadTravelServiceImg)
router.post('/tour/mice',uploadMICE.array('photos', 12),controller.uploadMICEImg)
router.post('/tour/fit',uploadFIT.array('photos', 12),controller.uploadFITImg)
router.post('/page/aboutus',uploadAboutUs.array('photos', 12),controller.uploadAboutUsImg)
router.post('/page/payment',uploadPayment.array('photos', 12),controller.uploadPaymentImg)

router.post('/blog/bloglist',uploadBlogList.array('photos', 12),controller.uploadBlogListImg)

router.post('/ads/adstype',uploadAdsType.array('photos', 12),controller.uploadAdsTypeImg)
router.post('/ads/adslist',uploadAdsList.array('photos', 12),controller.uploadAdsListImg)
router.post('/ads/adsdetail',uploadAdsDetail.array('photos', 12),controller.uploadAdsDetailImg)


router.post('/tour/tourdetail',uploadTourDetail.single('image'),controller.uploadTourDetailImg)
router.post('/car/cartype/cartypeintro',uploadCarTypeIntro.single('image'),controller.uploadCarTypeIntroImg)
router.post('/car/trans/cartranstypeintro',uploadCarTransTypeIntro.single('image'),controller.uploadCarTransTypeIntroImg)
router.post('/car/trip/tripintro',uploadTripIntro.single('image'),controller.uploadCarTripIntroImg)
router.post('/hotel/hotel/hotelintro',uploadHotelIntro.single('image'),controller.uploadHotelIntroImg)
router.post('/hotel/roomtype/roomtypeintro',uploadRoomTypeIntro.single('image'),controller.uploadRoomTypeIntroImg)
router.post('/hotel/package/packageintro',uploadPackageIntro.single('image'),controller.uploadPackageIntroImg)
router.post('/tour/fit/fitintro',uploadFITIntro.single('image'),controller.uploadFITIntroImg)
router.post('/blog/blogdetail/blogdetailintro',uploadBlogDetailIntro.single('image'),controller.uploadBlogDetailIntroImg)

router.post('/product/supplier',uploadProductSupplier.array('photos', 12),controller.uploadProductSupplierImg)
router.post('/product/category',uploadProductCategory.array('photos', 12),controller.uploadProductCategoryImg)


module.exports = router