var FIT = require('../models/fit.model')
var Supplier=require('../models/supplier.model')
var mongoose = require('mongoose');
var UploadController=require('../controllers/upload.controller')

module.exports.index =function(req,res){
    FIT.find().then(function(fit){
        res.send(fit)
    })
};

module.exports.getUsed =function(req,res){
    FIT.find({"isUsed":true}).sort('order').then(function(fit){
        res.send(fit)
    })
};

module.exports.getmFITById=(req,res,next) => {
    FIT.findOne({"_id":req.params._id}).then(function(fit){
        res.send(fit)
    })
};

module.exports.deleteFIT= function (req, res) {
    FIT.deleteOne({ _id: req.params._id }, function(err) {
        if (!err) {
            res.send('SUCCESS')
        }
        else {
            res.send('ERROR')
        }
    });
};

module.exports.insertFIT= function (req, res) {
    req.body.createDate=new Date();
    delete req.body.modifyBy;
        FIT.create(req.body, function (err, fit) {
        if (err){
            console.log(err);
        } 
        else{
            res.send(fit)
        }
        })
};

module.exports.updateFIT=function (req, res) {
    req.body.modifyDate=new Date();
    delete req.body.createBy;
    UploadController.removeImage(req.body.removeImage);
        FIT.updateOne({ _id: req.params._id },{$set:req.body},(err, fit) =>{
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(fit);
                 res.status(200).send(fit);
        }
     });
};

module.exports.getFITBySupplier=(req,res,next) => {
    FIT.find({supplierId:req.params.index}).then(function(fit){
        console.log(fit);
        res.send(fit)
    })
};

module.exports.getFITBySupplierCode=(req,res,next) => {
    Supplier.findOne({supplierCode:req.params.index}).then(function(supp){
        FIT.find({supplierId:supp._id}).then(function(fit){
            res.send(fit)
        })
    })
};

