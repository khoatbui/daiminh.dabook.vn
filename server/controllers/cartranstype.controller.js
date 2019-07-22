var CarTransType = require("../models/cartranstype.model");
var UploadController=require('../controllers/upload.controller')
var mongoose = require("mongoose");
var moment = require("moment");
moment().format();

module.exports.index = function(req, res) {
  CarTransType.find()
    .then(function(roomtype) {
      res.send(roomtype);
    });
};

module.exports.getCarTransType = (req, res, next) => {
  CarTransType.find().then(function(roomtype) {
    res.send(roomtype);
  });
};

module.exports.deleteCarTransType = function(req, res) {
  console.log(req.params._id);
  CarTransType.deleteOne({ _id: req.params._id }, function(err) {
    if (!err) {
      res.send("SUCCESS");
    } else {
      res.send("ERROR");
    }
  });
};

module.exports.insertCarTransType = function(req, res) {
  req.body.createDate = new Date();
  delete req.body.modifyBy;

  CarTransType.create(req.body, function(err, roomtype) {
    if (err) {
      console.log(err);
    } else {
      res.send(roomtype);
    }
  });
};

module.exports.updateCarTransType = function(req, res) {
  console.log(req.body);
  req.body.modifyDate = new Date();
  delete req.body.createBy;
  UploadController.removeImage(req.body.removeImage);
  CarTransType.updateOne(
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

module.exports.getCarTransTypeByHotel = (req, res, next) => {
  CarTransType.find({ hotelId: req.params.index }).then(function(roomtype) {
    res.send(roomtype);
  });
};

module.exports.getCarTransTypeByHotelCode = (req, res, next) => {
  CarTransType.find({ hotelId: req.params.index }).then(function(roomtype) {
    res.send(roomtype);
  });
};
