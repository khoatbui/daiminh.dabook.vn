var TravelService = require('../models/travelservice.model')
var Supplier=require('../models/supplier.model')
var mongoose = require('mongoose');
var UploadController=require('../controllers/upload.controller')

module.exports.index =function(req,res){
    TravelService.find().then(function(travelservice){
        res.send(travelservice)
    })
};

module.exports.getUsed =function(req,res){
    TravelService.find({"isUsed":true}).then(function(travelservice){
        res.send(travelservice)
    })
};


module.exports.getmTravelServiceById=(req,res,next) => {
    TravelService.findOne({"_id":req.params._id}).then(function(travelservice){
        res.send(travelservice)
    })
};

module.exports.getmTravelServiceByCode=(req,res,next) => {
    TravelService.findOne({"travelServiceCode":req.params._id}).then(function(travelservice){
        res.send(travelservice)
    })
};

module.exports.deleteTravelService= function (req, res) {
    TravelService.deleteOne({ _id: req.params._id }, function(err) {
        if (!err) {
            res.send('SUCCESS')
        }
        else {
            res.send('ERROR')
        }
    });
};

module.exports.insertTravelService= function (req, res) {
    req.body.createDate=new Date();
    delete req.body.modifyBy;
        TravelService.create(req.body, function (err, travelservice) {
        if (err){
            console.log(err);
        } 
        else{
            res.send(travelservice)
        }
        })
};

module.exports.updateTravelService=function (req, res) {
    req.body.modifyDate=new Date();
    delete req.body.createBy;
        TravelService.updateOne({ _id: req.params._id },{$set:req.body},(err, travelservice) =>{
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(travelservice);
                 res.status(200).send(travelservice);
        }
     });
     UploadController.removeImage(req.body.removeImage);
     UploadController.removeImageWebp(req.body.removeImageWebp);
};

module.exports.getTravelServiceBySupplier=(req,res,next) => {
    TravelService.find({supplierId:req.params.index}).then(function(travelservice){
        console.log(travelservice);
        res.send(travelservice)
    })
};

module.exports.getTravelServiceBySupplierCode=(req,res,next) => {
    Supplier.findOne({supplierCode:req.params.index}).then(function(supp){
        TravelService.find({supplierId:supp._id}).then(function(travelservice){
            res.send(travelservice)
        })
    })
};

