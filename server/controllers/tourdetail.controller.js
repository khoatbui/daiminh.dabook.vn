var TourDetail = require('../models/tourdetail.model')
var Supplier=require('../models/supplier.model')
var mongoose = require('mongoose');
var UploadController=require('../controllers/upload.controller')

module.exports.index =function(req,res){
    TourDetail.find().populate('tourId').then(function(tourdetail){
        res.send(tourdetail)
    })
};

module.exports.getmTourDetailById=(req,res,next) => {
    TourDetail.find({"tourId":req.params._id}).populate('tourId').then(function(tourdetail){
        res.send(tourdetail)
    })
};

module.exports.deleteTourDetail= function (req, res) {
    TourDetail.deleteOne({ _id: req.params._id }, function(err) {
        if (!err) {
            res.send('SUCCESS')
        }
        else {
            res.send('ERROR')
        }
    });
};

module.exports.insertTourDetail= function (req, res) {
    console.log('in')
    req.body.createDate=new Date();
    delete req.body.modifyBy;
        TourDetail.create(req.body, function (err, tourdetail) {
        if (err){
            console.log(err);
        } 
        else{
            res.send(tourdetail)
        }
        })
};

module.exports.updateTourDetail=function (req, res) {
    req.body.modifyDate=new Date();
    delete req.body.createBy;
    UploadController.removeImage(req.body.removeImage);
        TourDetail.updateOne({ _id: req.params._id },{$set:req.body},(err, tourdetail) =>{
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(tourdetail);
                 res.status(200).send(tourdetail);
        }
     });
};

module.exports.getTourDetailBySupplier=(req,res,next) => {
    TourDetail.find({supplierId:req.params.index}).then(function(tourdetail){
        console.log(tourdetail);
        res.send(tourdetail)
    })
};

module.exports.getTourDetailBySupplierCode=(req,res,next) => {
    Supplier.findOne({supplierCode:req.params.index}).then(function(supp){
        TourDetail.find({supplierId:supp._id}).then(function(tourdetail){
            res.send(tourdetail)
        })
    })
};

