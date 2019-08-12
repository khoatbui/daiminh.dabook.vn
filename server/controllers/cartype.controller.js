var CarType = require("../models/cartype.model");
var UploadController=require('../controllers/upload.controller')
var mongoose = require("mongoose");
var moment = require("moment");
moment().format();

module.exports.index = function(req, res) {
  CarType.find()
    .populate("supplierId")
    .then(function(cartype) {
      res.send(cartype);
    });
};

module.exports.getCarType = (req, res, next) => {
  CarType.find().then(function(cartype) {
    res.send(cartype);
  });
};

module.exports.deleteCarType = function(req, res) {
  console.log(req.params._id);
  CarType.deleteOne({ _id: req.params._id }, function(err) {
    if (!err) {
      res.send("SUCCESS");
    } else {
      res.send("ERROR");
    }
  });
};

module.exports.insertCarType = function(req, res) {
  req.body.createDate = new Date();
  delete req.body.modifyBy;

  CarType.create(req.body, function(err, cartype) {
    if (err) {
      console.log(err);
    } else {
      res.send(cartype);
    }
  });
};

module.exports.updateCarType = function(req, res) {
  console.log(req.body);
  req.body.modifyDate = new Date();
  delete req.body.createBy;
  CarType.updateOne(
    { _id: req.params._id },
    { $set: req.body },
    (err, cartype) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        console.log(cartype);

        res.status(200).send(cartype);
      }
    }
  );
  UploadController.removeImage(req.body.removeImage);
  UploadController.removeImageWebp(req.body.removeImageWebp);
};

module.exports.getCarTypeBySupplier = (req, res, next) => {
  CarType.find({ supplierId: req.params.index }).then(function(cartype) {
    res.send(cartype);
  });
};

module.exports.getCarTypeBySupplierCode = (req, res, next) => {
  CarType.find({ supplierId: req.params.index }).then(function(cartype) {
    res.send(cartype);
  });
};

module.exports.getCarTypeById = (req, res, next) => {
  CarType.findOne({ _id: req.params._id }).then(function(cartype) {
    res.send(cartype);
  });
};