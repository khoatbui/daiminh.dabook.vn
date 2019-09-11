var ProductSupplier = require('../models/productsupplier.model')
var UploadController=require('../controllers/upload.controller')
var mongoose = require('mongoose');
var moment =require('moment');
moment().format();
module.exports.index = function (req, res) {
    ProductSupplier.find().then(function (productSupplier) {
        res.send(productSupplier)
    })
};
module.exports.getUsed = function (req, res) {
    ProductSupplier.find({"isUsed":true}).then(function (productSupplier) {
        res.send(productSupplier)
    })
};
module.exports.getPromoteProductSupplier = (req, res, next) => {
    ProductSupplier.find({"isPromote":true}).then(function (productSupplier) {
        res.send(productSupplier)
    })
};

module.exports.deleteProductSupplier = function (req, res) {
    console.log(req.params._id);
    ProductSupplier.deleteOne({ _id: req.params._id }, function (err) {
        if (!err) {
            res.send('SUCCESS')
        }
        else {
            res.send('ERROR')
        }
    });
};

module.exports.insertProductSupplier = function (req, res) {
    req.body.createDate=new Date();
    delete req.body.modifyBy;

    ProductSupplier.create(req.body, function (err, productSupplier) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(productSupplier)
        }
    })
};

module.exports.updateProductSupplier = function (req, res) {
    console.log(req.body);
    req.body.modifyDate=new Date();
    delete req.body.createBy;
    ProductSupplier.updateOne({ _id: req.params._id }, { $set: req.body }, (err, productSupplier) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(productSupplier);
            res.status(200).send(productSupplier);
        }
    });
    UploadController.removeImage(req.body.removeImage);
    UploadController.removeImageWebp(req.body.removeImageWebp);
};

