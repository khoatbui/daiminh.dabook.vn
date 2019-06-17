var PackageHotelREL = require('../models/packagehotelrel.model')
var mongoose = require('mongoose');
var moment =require('moment');
moment().format();

module.exports.index = function (req, res) {
    PackageHotelREL.find().populate('supplierId').populate('hotelId').populate('roomTypeId').populate('packageId').then(function (package) {
        res.send(package)
    })
};

module.exports.getPackageHotelREL = (req, res, next) => {
    PackageHotelREL.find().then(function (package) {
        res.send(package)
    })
};

module.exports.deletePackageHotelREL = function (req, res) {
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
    console.log('create');
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
    console.log('update');
    req.body.modifyDate=new Date();
    delete req.body.createBy;
    PackageHotelREL.updateOne({ _id: req.params._id }, { $set: req.body }, (err, package) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).send(package);
        }
    });
};

module.exports.getPackageByHotelRoomType = (req, res, next) => {
    PackageHotelREL.find({"hotelId":req.params.hotelId,"roomTypeId":req.params.roomTypeId}).populate('packageId').populate('hotelId').populate('roomTypeId').then(function (pac) {
        res.send(pac)
    })
};
module.exports.getPackageBySingleHotelRoomType=(req, res, next) => {
    PackageHotelREL.find({"hotelId":req.body.hotelId._id,"roomTypeId":req.body.roomTypeId._id}).populate('packageId').populate('hotelId').populate('roomTypeId').then(function (pac) {
        console.log(pac);
        res.send(pac)
    })
};
module.exports.getPackageByMultiHotelRoomType=(req, res, next) => {
    var tempArray=[];
    req.body.roomTypeId.forEach(element => {
        tempArray.push(element.roomType._id);
        tempArray.push(element.roomType._id);
    });
    PackageHotelREL.find({"hotelId":req.body.hotelId,"roomTypeId": { $in: tempArray }}).populate('packageId').populate('hotelId').populate('roomTypeId').then(function (pac) {
        console.log(pac);
        res.send(pac)
    })
};
module.exports.getPriceByService=(req, res, next) => {
    PackageHotelREL.find({"hotelId":req.params.hotelId,"roomTypeId":req.params.roomTypeId}).populate('packageId').then(function (pac) {
        res.send(pac)
    })
};

