var PriceType = require('../models/pricetype.model')
var Supplier=require('../models/supplier.model')
var mongoose = require('mongoose');
var UploadController=require('../controllers/upload.controller')

module.exports.index =function(req,res){
    PriceType.find().then(function(priceType){
        res.send(priceType)
    })
};
module.exports.getUsed =function(req,res){
    PriceType.find({"isUsed":true}).then(function(priceType){
        res.send(priceType)
    })
};
module.exports.getmPriceTypeById=(req,res,next) => {
    PriceType.findOne({"_id":req.params._id}).then(function(priceType){
        res.send(priceType)
    })
};

module.exports.deletePriceType= function (req, res) {
    PriceType.deleteOne({ _id: req.params._id }, function(err) {
        if (!err) {
            res.send('SUCCESS')
        }
        else {
            res.send('ERROR')
        }
    });
};

module.exports.insertPriceType= function (req, res) {
    req.body.createDate=new Date();
    delete req.body.modifyBy;
        PriceType.create(req.body, function (err, priceType) {
        if (err){
            console.log(err);
        } 
        else{
            res.send(priceType)
        }
        })
};

module.exports.updatePriceType=function (req, res) {
    req.body.modifyDate=new Date();
    delete req.body.createBy;
        PriceType.updateOne({ _id: req.params._id },{$set:req.body},(err, priceType) =>{
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log(priceType);
                 res.status(200).send(priceType);
        }
     });
     UploadController.removeImage(req.body.removeImage);
     UploadController.removeImageWebp(req.body.removeImageWebp);
};

module.exports.getPriceTypeBySupplier=(req,res,next) => {
    PriceType.find({supplierId:req.params.index}).then(function(priceType){
        console.log(priceType);
        res.send(priceType)
    })
};

module.exports.getPriceTypeBySupplierCode=(req,res,next) => {
    Supplier.findOne({supplierCode:req.params.index}).then(function(supp){
        PriceType.find({supplierId:supp._id}).then(function(priceType){
            res.send(priceType)
        })
    })
};

