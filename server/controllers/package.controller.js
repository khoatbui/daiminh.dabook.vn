var Package = require('../models/package.model')
var mongoose = require('mongoose');
var moment =require('moment');
moment().format();

module.exports.index = function (req, res) {
    Package.find().populate('supplierId').then(function (package) {
        res.send(package)
    })
};
module.exports.getUsed = function (req, res) {
    Package.find({'isUsed':true}).populate('supplierId').then(function (package) {
        res.send(package)
    })
};
module.exports.getPackage = (req, res, next) => {
    Package.find().then(function (package) {
        res.send(package)
    })
};

module.exports.deletePackage = function (req, res) {
    console.log(req.params._id);
    Package.deleteOne({ _id: req.params._id }, function (err) {
        if (!err) {
            res.send('SUCCESS')
        }
        else {
            res.send('ERROR')
        }
    });
};

module.exports.insertPackage = function (req, res) {
    req.body.createDate=new Date();
    delete req.body.modifyBy;

    Package.create(req.body, function (err, package) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(package)
        }
    })
};

module.exports.updatePackage = function (req, res) {
    req.body.modifyDate=new Date();
    delete req.body.createBy;
    Package.updateOne({ _id: req.params._id }, { $set: req.body }, (err, package) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(package);

            res.status(200).send(package);
        }
    });
};

module.exports.getPackageBySupplier=(req,res,next) => {
    Package.find({supplierId:req.params._id}).then(function(packages){
        console.log(packages);
        res.send(packages)
    })
};
module.exports.getPackageBySupplierWithDefault=(req,res,next) => {
    Package.find({$or:[{supplierId:req.params._id},{supplierId:'5d5a64789dd3c51ee06f54bd'}]}).then(function(packages){
        console.log(packages);
        res.send(packages)
    })
};