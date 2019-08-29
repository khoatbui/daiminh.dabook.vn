var CarDetailPrice = require("../models/cardetailprice.model");
var UploadController = require("../controllers/upload.controller");
var _ = require('lodash');
var mongoose = require("mongoose");
var moment = require("moment");
moment().format();

module.exports.index = function(req, res) {
  CarDetailPrice.find()
    .populate("supplierId")
    .populate("carTransTypeId")
    .populate("cityId")
    .then(function(carDetailPrice) {
      res.send(carDetailPrice);
    });
};

module.exports.getUsed = function(req, res) {
  CarDetailPrice.find({"isUsed":true})
    .populate("supplierId")
    .populate("carTransTypeId")
    .populate("cityId")
    .then(function(carDetailPrice) {
      res.send(carDetailPrice);
    });
};
module.exports.getCarDetailPriceById = function(req, res) {
  CarDetailPrice.findOne({"isUsed":true,"_id":req.params._id})
    .populate("supplierId")
    .populate("carTransTypeId")
    .populate("cityId")
    .then(function(carDetailPrice) {
      res.send(carDetailPrice);
    });
};
module.exports.getCarDetailPrice = (req, res, next) => {
  CarDetailPrice.find()
    .populate("supplierId")
    .populate("carTransTypeId")
    .populate("cityId")
    .then(function(carDetailPrice) {
      res.send(carDetailPrice);
    });
};

module.exports.deleteCarDetailPrice = function(req, res) {
  console.log(req.params._id);
  CarDetailPrice.deleteOne({ _id: req.params._id }, function(err) {
    if (!err) {
      res.send("SUCCESS");
    } else {
      res.send("ERROR");
    }
  });
};

module.exports.insertCarDetailPrice = function(req, res) {
  req.body.createDate = new Date();
  delete req.body.modifyBy;

  CarDetailPrice.create(req.body, function(err, carDetailPrice) {
    if (err) {
      console.log(err);
    } else {
      res.send(carDetailPrice);
    }
  });
};

module.exports.updateCarDetailPrice = function(req, res) {
  console.log(req.body.priceByCarType);
  req.body.modifyDate = new Date();
  delete req.body.createBy;
  UploadController.removeImage(req.body.removeImage);
  CarDetailPrice.updateOne(
    { _id: req.params._id },
    { $set: req.body },
    (err, carDetailPrice) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        console.log(carDetailPrice);

        res.status(200).send(carDetailPrice);
      }
    }
  );
};

module.exports.getCarDetailPriceByHotel = (req, res, next) => {
  CarDetailPrice.find({ hotelId: req.params.index }).then(function(
    carDetailPrice
  ) {
    res.send(carDetailPrice);
  });
};

module.exports.getCarDetailPriceByHotelCode = (req, res, next) => {
  CarDetailPrice.find({ hotelId: req.params.index }).then(function(
    carDetailPrice
  ) {
    res.send(carDetailPrice);
  });
};

// MOBILE
module.exports.getmAllPromotionCarDetailPrice = (req, res, next) => {
  console.log('in')
  try {
    CarDetailPrice.find({ isUsed: true })
      .populate("supplierId")
      .populate("carTransTypeId")
      .populate("cityId")
      .then(function(pac) {
        var result = [];
        var temp = {};
        pac.forEach(element => {
          if (element.isPromotion !== true) {
            element.priceByCarType.forEach((item, index) => {
              if (item.isPromotion === true) {
                temp = element;
                temp.priceByCarType = item;
                result.push(_.cloneDeep(temp));
              }
            });
          } else {
            element.priceByCarType.forEach((item, index) => {
              temp = element;
              temp.priceByCarType = item;
              result.push(_.cloneDeep(temp));
            });
          }
        });
        console.log(result);
        res.send(result);
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getmAllCarDetailPrice = (req, res, next) => {
  CarDetailPrice.find({ isUsed: true })
    .populate("supplierId")
    .populate("carTransTypeId")
    .populate("cityId")
    .then(function(pac) {
      var result = [];
        var temp = {};
        pac.forEach(element => {
            element.priceByCarType.forEach((item, index) => {
              temp = element;
              temp.priceByCarType = item;
              result.push(_.cloneDeep(temp));
            });
        });
        console.log(result);
        res.send(result);
    });
};
module.exports.getmAllCarDetailPriceBySearch = (req, res, next) => {
  CarDetailPrice.find({ isUsed: true })
    .populate("supplierId")
    .populate("carTransTypeId")
    .populate("cityId")
    .then(function(pac) {
      var result = [];
        var temp = {};
        pac.forEach(element => {
            element.priceByCarType.forEach((item, index) => {
              temp = element;
              temp.priceByCarType = item;
              result.push(_.cloneDeep(temp));
            });
        });
        var returnData=result.filter(item =>{ 
          return xoa_dau(item.tripCode).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
          xoa_dau(item.tripName).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
          xoa_dau(item.fromLocation).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
          xoa_dau(item.carTransTypeId.carTransTypeName).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
          xoa_dau(item.carTransTypeId.carTransTypeIntro).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1 ||
          xoa_dau(item.toLocation).toLowerCase().indexOf(xoa_dau(req.body.keyword).toLowerCase())> -1
  })
        console.log(result);
        res.send(returnData);
    });
};
module.exports.getmAllCarDetailPriceBySupplier = (req, res, next) => {
  CarDetailPrice.find({ isUsed: true, supplierId: req.params._id })
    .populate("supplierId")
    .populate("carTransTypeId")
    .populate("cityId")
    .then(function(pac) {
      res.send(pac);
    });
};
module.exports.getmAllCarDetailPriceByCarTransType = (req, res, next) => {
  CarDetailPrice.find({ isUsed: true, carTransTypeId: req.params._id })
    .populate("supplierId")
    .populate("carTransTypeId")
    .populate("cityId")
    .then(function(pac) {
      res.send(pac);
    });
};
module.exports.getmAllCarDetailPriceByCity = (req, res, next) => {
  CarDetailPrice.find({ isUsed: true,'cityId':req.params._id})
    .populate("supplierId")
    .populate("carTransTypeId")
    .populate("cityId")
    .then(function(pac) {
      res.send(pac);
    });
};
module.exports.getmAllCarDetailPriceByCarType = (req, res, next) => {
  CarDetailPrice.find({ isUsed: true, "priceByCarType.carTypeId": _id })
    .populate("supplierId")
    .populate("carTransTypeId")
    .populate("cityId")
    .then(function(pac) {
      res.send(pac);
    });
};
function xoa_dau(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  return str;
}