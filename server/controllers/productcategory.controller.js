var ProductCategory = require('../models/productcategory.model')
var UploadController=require('../controllers/upload.controller')
var mongoose = require('mongoose');
var moment =require('moment');
moment().format();
module.exports.index = function (req, res) {
    ProductCategory.find().then(function (productCategory) {
        res.send(productCategory)
    })
};
module.exports.getUsed = function (req, res) {
    ProductCategory.find({"isUsed":true}).then(function (productCategory) {
        res.send(productCategory)
    })
};
module.exports.getPromoteProductCategory = (req, res, next) => {
    ProductCategory.find({"isPromote":true}).then(function (productCategory) {
        res.send(productCategory)
    })
};

module.exports.deleteProductCategory = function (req, res) {
    console.log(req.params._id);
    ProductCategory.deleteOne({ _id: req.params._id }, function (err) {
        if (!err) {
            res.send('SUCCESS')
        }
        else {
            res.send('ERROR')
        }
    });
};

module.exports.insertProductCategory = function (req, res) {
    req.body.createDate=new Date();
    delete req.body.modifyBy;

    ProductCategory.create(req.body, function (err, productCategory) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(productCategory)
        }
    })
};

module.exports.updateProductCategory = function (req, res) {
    console.log(req.body);
    req.body.modifyDate=new Date();
    delete req.body.createBy;
    ProductCategory.updateOne({ _id: req.params._id }, { $set: req.body }, (err, productCategory) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(productCategory);
            res.status(200).send(productCategory);
        }
    });
    UploadController.removeImage(req.body.removeImage);
    UploadController.removeImageWebp(req.body.removeImageWebp);
};

