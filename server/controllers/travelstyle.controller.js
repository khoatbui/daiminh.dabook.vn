var TravelStyle = require('../models/travelstyle.model')
var Supplier=require('../models/supplier.model')
var mongoose = require('mongoose');
var UploadController=require('../controllers/upload.controller')

module.exports.index =function(req,res){
    TravelStyle.find().then(function(travelstyle){
        res.send(travelstyle)
    })
};

module.exports.getUsed =function(req,res){
    TravelStyle.find({"isUsed":true}).then(function(travelstyle){
        res.send(travelstyle)
    })
};

module.exports.getmTravelStyleById=(req,res,next) => {
    TravelStyle.findOne({"_id":req.params._id}).then(function(travelstyle){
        res.send(travelstyle)
    })
};

module.exports.deleteTravelStyle= function (req, res) {
    TravelStyle.deleteOne({ _id: req.params._id }, function(err) {
        if (!err) {
            res.send('SUCCESS')
        }
        else {
            res.send('ERROR')
        }
    });
};

module.exports.insertTravelStyle= function (req, res) {
    req.body.createDate=new Date();
    delete req.body.modifyBy;
        TravelStyle.create(req.body, function (err, travelstyle) {
        if (err){
            console.log(err);
        } 
        else{
            res.send(travelstyle)
        }
        })
};

module.exports.updateTravelStyle=function (req, res) {
    req.body.modifyDate=new Date();
    delete req.body.createBy;
        TravelStyle.updateOne({ _id: req.params._id },{$set:req.body},(err, travelstyle) =>{
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(travelstyle);
                 res.status(200).send(travelstyle);
        }
     });
     UploadController.removeImage(req.body.removeImage);
     UploadController.removeImageWebp(req.body.removeImageWebp);
};

module.exports.getTravelStyleBySupplier=(req,res,next) => {
    TravelStyle.find({supplierId:req.params.index}).then(function(travelstyle){
        console.log(travelstyle);
        res.send(travelstyle)
    })
};

module.exports.getTravelStyleBySupplierCode=(req,res,next) => {
    Supplier.findOne({supplierCode:req.params.index}).then(function(supp){
        TravelStyle.find({supplierId:supp._id}).then(function(travelstyle){
            res.send(travelstyle)
        })
    })
};

