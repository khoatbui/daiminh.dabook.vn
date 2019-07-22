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
    .then(function(carDetailPrice) {
      res.send(carDetailPrice);
    });
};

module.exports.getCarDetailPrice = (req, res, next) => {
  CarDetailPrice.find()
    .populate("supplierId")
    .populate("carTransTypeId")
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

module.exports.getmAllCarDetailPriceBySupplier = (req, res, next) => {
  CarDetailPrice.find({ isUsed: true, supplierId: req.params._id })
    .populate("supplierId")
    .populate("carTransTypeId")
    .then(function(pac) {
      res.send(pac);
    });
};
module.exports.getmAllCarDetailPriceByCarTransType = (req, res, next) => {
  CarDetailPrice.find({ isUsed: true, carTransTypeId: req.params._id })
    .populate("supplierId")
    .populate("carTransTypeId")
    .then(function(pac) {
      res.send(pac);
    });
};
module.exports.getmAllCarDetailPriceByCarType = (req, res, next) => {
  CarDetailPrice.find({ isUsed: true, "priceByCarType.carTypeId": _id })
    .populate("supplierId")
    .populate("carTransTypeId")
    .then(function(pac) {
      res.send(pac);
    });
};
