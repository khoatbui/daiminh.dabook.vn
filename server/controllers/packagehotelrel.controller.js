var db = require('../db')
var PackageHotelREL = require('../models/packagehotelrel.model')
var mongoose = require('mongoose');
var moment =require('moment');
moment().format();

module.exports.index = function (req, res) {
    PackageHotelREL.find().then(function (package) {
        res.send(package)
    })
};

module.exports.getPackageHotelREL = (req, res, next) => {
    PackageHotelREL.find().then(function (package) {
        res.send(package)
    })
};

module.exports.deletePackageHotelREL = function (req, res) {
    console.log(req.params._id);
    PackageHotelREL.deleteOne({ _id: req.params._id }, function (err) {
        if (!err) {
            res.send('SUCCESS')
        }
        else {
            res.send('ERROR')
        }
    });
};

module.exports.insertPackageHotelREL = function (req, res) {
    req.body.createDate=new Date();
    delete req.body.modifyBy;

    PackageHotelREL.create(req.body, function (err, package) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(package)
        }
    })
};

module.exports.updatePackageHotelREL = function (req, res) {
    req.body.modifyDate=new Date();
    delete req.body.createBy;
    PackageHotelREL.updateOne({ _id: req.params._id }, { $set: req.body }, (err, package) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(package);

            res.status(200).send(package);
        }
    });
};

