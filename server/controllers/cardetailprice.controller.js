var CarDetailPrice = require("../models/cardetailprice.model");
var UploadController=require('../controllers/upload.controller')
var mongoose = require("mongoose");
var moment = require("moment");
moment().format();

module.exports.index = function(req, res) {
  CarDetailPrice.find()
  .populate('supplierId')
  .populate('carTransTypeId')
    .then(function(carDetailPrice) {
      res.send(carDetailPrice);
    });
};

module.exports.getCarDetailPrice = (req, res, next) => {
  CarDetailPrice.find().then(function(carDetailPrice) {
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
  console.log(req.body);
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
  CarDetailPrice.find({ hotelId: req.params.index }).then(function(carDetailPrice) {
    res.send(carDetailPrice);
  });
};

module.exports.getCarDetailPriceByHotelCode = (req, res, next) => {
  CarDetailPrice.find({ hotelId: req.params.index }).then(function(carDetailPrice) {
    res.send(carDetailPrice);
  });
};
