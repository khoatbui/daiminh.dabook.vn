var TourType = require('../models/tourtype.model')
var UploadController=require('../controllers/upload.controller')
var mongoose = require('mongoose');
var moment =require('moment');
moment().format();
module.exports.index = function (req, res) {
    TourType.find().then(function (tourtype) {
        res.send(tourtype)
    })
};

module.exports.getPromoteTourType = (req, res, next) => {
    TourType.find({"isPromote":true}).then(function (tourtype) {
        res.send(tourtype)
    })
};

module.exports.deleteTourType = function (req, res) {
    console.log(req.params._id);
    TourType.deleteOne({ _id: req.params._id }, function (err) {
        if (!err) {
            res.send('SUCCESS')
        }
        else {
            res.send('ERROR')
        }
    });
};

module.exports.insertTourType = function (req, res) {
    req.body.createDate=new Date();
    delete req.body.modifyBy;

    TourType.create(req.body, function (err, tourtype) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(tourtype)
        }
    })
};

module.exports.updateTourType = function (req, res) {
    console.log(req.body);
    req.body.modifyDate=new Date();
    delete req.body.createBy;
    TourType.updateOne({ _id: req.params._id }, { $set: req.body }, (err, tourtype) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(tourtype);
            res.status(200).send(tourtype);
        }
    });
};

