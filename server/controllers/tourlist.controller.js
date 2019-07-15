var TourList = require('../models/tourlist.model')
var Supplier=require('../models/supplier.model')
var mongoose = require('mongoose');
var UploadController=require('../controllers/upload.controller')

module.exports.index =function(req,res){
    TourList.find().then(function(tourlist){
        res.send(tourlist)
    })
};

module.exports.getmTourListById=(req,res,next) => {
    TourList.findOne({"_id":req.params._id}).then(function(tourlist){
        res.send(tourlist)
    })
};

module.exports.deleteTourList= function (req, res) {
    TourList.deleteOne({ _id: req.params._id }, function(err) {
        if (!err) {
            res.send('SUCCESS')
        }
        else {
            res.send('ERROR')
        }
    });
};

module.exports.insertTourList= function (req, res) {
    req.body.createDate=new Date();
    delete req.body.modifyBy;
        TourList.create(req.body, function (err, tourlist) {
        if (err){
            console.log(err);
        } 
        else{
            res.send(tourlist)
        }
        })
};

module.exports.updateTourList=function (req, res) {
    req.body.modifyDate=new Date();
    delete req.body.createBy;
    UploadController.removeImage(req.body.removeImage);
        TourList.updateOne({ _id: req.params._id },{$set:req.body},(err, tourlist) =>{
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(tourlist);
                 res.status(200).send(tourlist);
        }
     });
};

module.exports.getTourListBySupplier=(req,res,next) => {
    TourList.find({supplierId:req.params.index}).then(function(tourlist){
        console.log(tourlist);
        res.send(tourlist)
    })
};

module.exports.getTourListBySupplierCode=(req,res,next) => {
    Supplier.findOne({supplierCode:req.params.index}).then(function(supp){
        TourList.find({supplierId:supp._id}).then(function(tourlist){
            res.send(tourlist)
        })
    })
};

