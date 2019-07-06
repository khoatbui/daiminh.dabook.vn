var CarType = require("../models/cartype.model");
var UploadController=require('../controllers/upload.controller')
var mongoose = require("mongoose");
var moment = require("moment");
moment().format();

module.exports.index = function(req, res) {
  CarType.find()
    .populate("supplierId")
    .then(function(roomtype) {
      res.send(roomtype);
    });
};

module.exports.getCarType = (req, res, next) => {
  CarType.find().then(function(roomtype) {
    res.send(roomtype);
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

  CarType.create(req.body, function(err, roomtype) {
    if (err) {
      console.log(err);
    } else {
      res.send(roomtype);
    }
  });
};

module.exports.updateCarType = function(req, res) {
  console.log(req.body);
  req.body.modifyDate = new Date();
  delete req.body.createBy;
  UploadController.removeImage(req.body.removeImage);
  CarType.updateOne(
    { _id: req.params._id },
    { $set: req.body },
    (err, roomtype) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        console.log(roomtype);

        res.status(200).send(roomtype);
      }
    }
  );
};

module.exports.getCarTypeBySupplier = (req, res, next) => {
  CarType.find({ supplierId: req.params.index }).then(function(roomtype) {
    res.send(roomtype);
  });
};

module.exports.getCarTypeBySupplierCode = (req, res, next) => {
  CarType.find({ supplierId: req.params.index }).then(function(roomtype) {
    res.send(roomtype);
  });
};
