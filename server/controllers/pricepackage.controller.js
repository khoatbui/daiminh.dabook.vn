var PricePackage = require('../models/pricepackage.model')
var UploadController=require('./upload.controller')
var mongoose = require('mongoose');
var moment =require('moment');
moment().format();
module.exports.index = function (req, res) {
    PricePackage.find().then(function (supplier) {
        res.send(supplier)
    })
};

module.exports.getUsed = function (req, res) {
    PricePackage.find({"isUsed":true}).then(function (supplier) {
        res.send(supplier)
    })
};

module.exports.getPromotePricePackage = (req, res, next) => {
    PricePackage.find({"isPromote":true}).then(function (supplier) {
        res.send(supplier)
    })
};

module.exports.deletePricePackage = function (req, res) {
    console.log(req.params._id);
    PricePackage.deleteOne({ _id: req.params._id }, function (err) {
        if (!err) {
            res.send('SUCCESS')
        }
        else {
            res.send('ERROR')
        }
    });
};

module.exports.insertPricePackage = function (req, res) {
    req.body.createDate=new Date();
    delete req.body.modifyBy;

    PricePackage.create(req.body, function (err, supplier) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(supplier)
        }
    })
};

module.exports.updatePricePackage = function (req, res) {
    console.log(req.body);
    req.body.modifyDate=new Date();
    delete req.body.createBy;
    PricePackage.updateOne({ _id: req.params._id }, { $set: req.body }, (err, supplier) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(supplier);
            res.status(200).send(supplier);
        }
    });
    UploadController.removeImage(req.body.removeImage);
    UploadController.removeImageWebp(req.body.removeImageWebp);
};

